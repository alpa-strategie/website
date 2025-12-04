'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage, LanguageProvider } from '@/components/LanguageProvider';
import translations from '@/app/translations';
import { VisitorProfile, VisitorRole, VisitorIndustry, VisitorInterest, ROLE_KEY_MAP, RoleKey } from '@/types/visitor';
import { setVisitorProfile, getVisitorProfile } from '@/lib/aia-storage';
import SingleSelect from '@/components/aia/SingleSelect';
import MultiSelect from '@/components/aia/MultiSelect';
import Header from '@/components/Header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  suggestedQuestions?: string[];
}

const AiaPageContent = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].aia;
  const tOnboarding = translations[language].onboarding;
  
  const [profile, setProfile] = useState<Partial<VisitorProfile>>({
    role: undefined,
    industry: undefined,
    interests: []
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isContextCollapsed, setIsContextCollapsed] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedProfile = getVisitorProfile();
    if (savedProfile) {
      setProfile(savedProfile);
      setIsContextCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const roles: VisitorRole[] = ['recruiter-headhunter', 'potential-client', 'consulting-partner', 'investor-advisor', 'curious', 'other'];
  const industries: VisitorIndustry[] = ['technology-saas', 'finance-banking', 'insurance', 'manufacturing', 'healthcare-medical', 'events-conference', 'education-edtech', 'environmental-agritech', 'aviation-aerospace', 'ngo-social', 'hospitality-etourism', 'ecommerce-retail', 'government-public', 'other'];
  const interests: VisitorInterest[] = ['it-strategy', 'cto-cpto-advisory', 'pmo', 'digital-factory', 'saas-development', 'software-architecture', 'offshoring-outsourcing', 'business-intelligence', 'ux-ui-product', 'interim-roles', 'digital-transformation', 'other'];

  const handleRoleChange = (visitorRole: VisitorRole) => {
    const roleKey = ROLE_KEY_MAP[visitorRole];
    const roleLabel = tOnboarding.roles[visitorRole];
    const newProfile = { 
      ...profile, 
      visitorRole,
      roleKey,
      role: roleLabel
    };
    setProfile(newProfile);
    if (visitorRole && profile.industry) {
      setVisitorProfile({
        ...newProfile,
        industry: profile.industry,
        interests: profile.interests || [],
        timestamp: Date.now()
      } as VisitorProfile);
    }
  };

  const handleIndustryChange = (industry: VisitorIndustry) => {
    const newProfile = { ...profile, industry };
    setProfile(newProfile);
    if (profile.visitorRole && industry) {
      setVisitorProfile({
        ...newProfile,
        roleKey: profile.roleKey!,
        role: profile.role!,
        visitorRole: profile.visitorRole,
        industry,
        interests: profile.interests || [],
        timestamp: Date.now()
      } as VisitorProfile);
    }
  };

  const getSuggestedQuestions = (): string[] => {
    if (!profile.roleKey) return t.suggestedQuestions.other;
    const questions = t.suggestedQuestions[profile.roleKey as keyof typeof t.suggestedQuestions];
    return questions || t.suggestedQuestions.other;
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    if (!isChatActive) {
      setIsChatActive(true);
      setIsContextCollapsed(true);
    }

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/aia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: textToSend }],
          locale: language,
          visitorProfile: profile.role && profile.industry ? profile : null
        })
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      let cleanedAnswer = data.answer;
      let shouldOpenScheduler = false;
      
      if (cleanedAnswer.includes('[[ACTION:OPEN_SCHEDULER]]')) {
        cleanedAnswer = cleanedAnswer.replace('[[ACTION:OPEN_SCHEDULER]]', '').trim();
        shouldOpenScheduler = true;
      }
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: cleanedAnswer,
        suggestedQuestions: data.suggestedQuestions || []
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (shouldOpenScheduler) {
        setTimeout(() => {
          router.push('/book');
        }, 1500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: 'assistant', content: t.error };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const getContextSummary = () => {
    const parts = [];
    if (profile.visitorRole) parts.push(tOnboarding.roles[profile.visitorRole]);
    if (profile.industry) parts.push(tOnboarding.industries[profile.industry]);
    if (profile.interests && profile.interests.length > 0) {
      parts.push(profile.interests.map(i => tOnboarding.interests[i]).join(', '));
    }
    return parts.join(' • ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-20">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {tOnboarding.title}
          </h1>
          <p className="text-sm text-gray-600">
            {tOnboarding.description}
          </p>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
          style={{ 
            paddingBottom: '120px',
            marginTop: '0',
            height: 'calc(100vh - 80px - 120px)'
          }}
        >
          <div className={`transition-all duration-300 ${isContextCollapsed ? 'mb-4' : 'mb-6'}`}>
            {isContextCollapsed ? (
              <button
                onClick={() => setIsContextCollapsed(false)}
                className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-700 font-medium">
                  {tOnboarding.yourContext || 'Your context'}: {getContextSummary()}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
            ) : (
              <div className="space-y-4 bg-white p-4 md:p-6 rounded-lg border border-gray-200 shadow-sm">
                {isChatActive && (
                  <button
                    onClick={() => setIsContextCollapsed(true)}
                    className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 mb-2"
                  >
                    <span className="font-medium">{tOnboarding.contextPrompt}</span>
                    <ChevronUp className="w-5 h-5" />
                  </button>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tOnboarding.roleLabel}
                    </label>
                    <SingleSelect
                      options={roles.map(role => ({
                        value: role,
                        label: tOnboarding.roles[role]
                      }))}
                      value={profile.visitorRole}
                      onChange={(value) => handleRoleChange(value as VisitorRole)}
                      placeholder={tOnboarding.rolePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tOnboarding.industryLabel}
                    </label>
                    <SingleSelect
                      options={industries.map(industry => ({
                        value: industry,
                        label: tOnboarding.industries[industry]
                      }))}
                      value={profile.industry}
                      onChange={(value) => handleIndustryChange(value as VisitorIndustry)}
                      placeholder={tOnboarding.industryPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tOnboarding.interestsLabel}
                    </label>
                    <MultiSelect
                      options={interests.map(interest => ({
                        value: interest,
                        label: tOnboarding.interests[interest]
                      }))}
                      value={profile.interests || []}
                      onChange={(newInterests) => {
                        const typedInterests = newInterests as VisitorInterest[];
                        const newProfile = { ...profile, interests: typedInterests };
                        setProfile(newProfile);
                        if (profile.role && profile.industry) {
                          setVisitorProfile(newProfile as VisitorProfile);
                        }
                      }}
                      placeholder={tOnboarding.interestsPlaceholder}
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center pt-2">
                  {tOnboarding.privacyNote || 'Selections are used only for context. No data is stored.'}
                </p>
              </div>
            )}
          </div>

          {!isChatActive && (
            <div className="space-y-3">
              {getSuggestedQuestions().map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left text-sm text-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {isChatActive && messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`${
                      message.role === 'user'
                        ? 'bg-[#0f3460] text-white ml-8'
                        : 'bg-white text-gray-800 mr-8 border border-gray-200'
                    } p-4 rounded-lg shadow-sm`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.role === 'assistant' && message.suggestedQuestions && message.suggestedQuestions.length > 0 && index === messages.length - 1 && !isLoading && (
                    <div className="mr-8 mt-3 space-y-2">
                      <p className="text-xs text-gray-500 font-medium mb-2">Continue exploring:</p>
                      {message.suggestedQuestions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-left text-xs text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white text-gray-800 mr-8 p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent text-base"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-3 bg-[#0f3460] text-white font-medium rounded-lg hover:bg-[#0a2540] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {tOnboarding.askAia || 'Ask Aïa'}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              {tOnboarding.poweredBy || 'Powered by Aïa'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AiaPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AiaPageContent />
      </div>
    </LanguageProvider>
  );
}
