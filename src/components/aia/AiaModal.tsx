'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/app/translations';
import { VisitorProfile, VisitorRole, VisitorIndustry, VisitorInterest, ROLE_KEY_MAP } from '@/types/visitor';
import { setAiaSeen, setVisitorProfile, getVisitorProfile } from '@/lib/aia-storage';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

interface AiaModalProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiaApiResponse {
  answer: string;
  suggestedQuestions?: string[];
}

const SCHEDULER_TOKEN = '[[ACTION:OPEN_SCHEDULER]]';

export default function AiaModal({ onClose }: AiaModalProps) {
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
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const handleClose = useCallback(() => {
    setAiaSeen(true);
    onClose();
  }, [onClose]);

  const handleExploreWebsite = useCallback(() => {
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    const savedProfile = getVisitorProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAiaSeen(true);
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage.role === 'assistant' && lastMessage.content.includes(SCHEDULER_TOKEN)) {
      setCurrentSuggestions([]);
      handleClose();
      
      setTimeout(() => {
        router.push('/book#scheduler');
      }, 300);
    }
  }, [messages, router, handleClose]);

  const getCleanedContent = (content: string) => {
    const tokenRegex = /\[\[ACTION:OPEN_SCHEDULER\]\]/gi;
    return content.replace(tokenRegex, '').trim();
  };

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

  const getDisplayedSuggestions = (): string[] => {
    if (isChatActive && currentSuggestions.length > 0) {
      return currentSuggestions;
    }
    
    const roleKey = profile.roleKey ?? 'default';
    const questions = t.suggestedQuestions[roleKey as keyof typeof t.suggestedQuestions];
    return questions || t.suggestedQuestions.default;
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

      const data: AiaApiResponse = await response.json();
      const { answer, suggestedQuestions = [] } = data;
      
      const assistantMessage: Message = { role: 'assistant', content: answer };
      setMessages(prev => [...prev, assistantMessage]);
      
      setCurrentSuggestions(suggestedQuestions);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: 'assistant', content: t.error };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentSuggestions([]);
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
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: '#0a1628' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full" style={{ maxHeight: '90vh' }}>
          <div className="bg-[#0a1628] text-white p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-[180px] h-[54px]">
                <Image
                  src="/Logo - Alpa Strategie - 200x60 px.png"
                  alt="Alpa Stratégie"
                  fill
                  sizes="180px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExploreWebsite}
                className="px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {tOnboarding.exploreWebsite || 'Explore the website'}
              </button>
              <button
                onClick={handleClose}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label={t.close}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {tOnboarding.title}
                </h1>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {tOnboarding.description}
                </p>
              </div>

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
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
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

              <div className="space-y-3">
                {getDisplayedSuggestions().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg text-left text-sm text-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {isChatActive && messages.length > 0 && (
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`${
                          message.role === 'user'
                            ? 'bg-[#0f3460] text-white ml-8'
                            : 'bg-white text-gray-800 mr-8'
                        } p-3 rounded-lg shadow-sm`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {getCleanedContent(message.content)}
                        </p>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="bg-white text-gray-800 mr-8 p-3 rounded-lg shadow-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
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
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f3460] focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-3 bg-[#0f3460] text-white font-medium rounded-lg hover:bg-[#0a2540] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {tOnboarding.askAia || 'Ask Aïa'}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                {tOnboarding.poweredBy || 'Powered by Aïa • Alpa Intelligent Agent • Based on verified content from Notion'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
