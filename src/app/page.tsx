"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Mail, Phone, Linkedin, Globe, Users, TrendingUp, Database, Cloud, Zap, Target, Languages } from 'lucide-react';
import { translations, Language } from './translations';

const ConsultingWebsite = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState<Language>('en');

  // Get current language translations - SIMPLE!
  const t = translations[language];

  const LanguageToggle = () => (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors px-3 py-1 rounded-md border border-gray-200 hover:border-blue-300"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.header.title}</h1>
              <p className="text-blue-600 font-medium">{t.header.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <a href="mailto:bonjour@alpa-strategie.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{t.header.contact}</span>
              </a>
              <a href="https://linkedin.com/in/baptiste-leroux-550662a" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{t.header.linkedin}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {t.hero.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">{t.hero.stat1}</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">{t.hero.stat2}</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">{t.hero.stat3}</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">{t.hero.stat4}</span>
            </div>
          </div>
          <a href="mailto:bonjour@alpa-strategie.com" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            {t.hero.cta}
          </a>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: t.nav.overview },
              { id: 'services', label: t.nav.services },
              { id: 'packages', label: t.nav.packages },
              { id: 'experience', label: t.nav.experience }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.overview.title}</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{t.overview.card1Title}</h4>
                  <p className="text-gray-600">{t.overview.card1Desc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{t.overview.card2Title}</h4>
                  <p className="text-gray-600">{t.overview.card2Desc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">{t.overview.card3Title}</h4>
                  <p className="text-gray-600">{t.overview.card3Desc}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.overview.expertiseTitle}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">{t.overview.saasTitle}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.overview.saasItems.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">{t.overview.techTitle}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {t.overview.techItems.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.services.title}</h3>
            <div className="space-y-6">
              {t.services.items.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-blue-600">
                          {service.id === 'strategy' && <TrendingUp className="w-6 h-6" />}
                          {service.id === 'delivery' && <Globe className="w-6 h-6" />}
                          {service.id === 'data' && <Database className="w-6 h-6" />}
                          {service.id === 'crm' && <Users className="w-6 h-6" />}
                          {service.id === 'cloud' && <Cloud className="w-6 h-6" />}
                          {service.id === 'innovation' && <Zap className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-gray-600">{service.description}</p>
                          <span className="text-blue-600 font-semibold">{service.rate}</span>
                        </div>
                      </div>
                      {expandedService === service.id ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </div>
                  
                  {expandedService === service.id && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        <h5 className="font-semibold text-gray-900 mb-3">{t.services.servicesInclude}</h5>
                        <ul className="space-y-2 mb-4">
                          {service.details.map((detail, index) => (
                            <li key={index} className="text-gray-600">• {detail}</li>
                          ))}
                        </ul>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-2">{t.services.uniqueValue}</h6>
                          <p className="text-blue-800">{service.value}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.packages.title}</h3>
            <p className="text-center text-gray-600 mb-12">{t.packages.subtitle}</p>
            <div className="grid lg:grid-cols-3 gap-8">
              {t.packages.items.map((pkg, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h4>
                  <div className="text-blue-600 font-semibold mb-4">{pkg.duration}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-6">{pkg.price}</div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    {t.packages.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.experience.title}</h3>
            <div className="space-y-8">
              {t.experience.items.map((exp, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {index === 0 && <TrendingUp className="w-6 h-6 text-blue-600" />}
                      {index === 1 && <Users className="w-6 h-6 text-green-600" />}
                      {index === 2 && <Database className="w-6 h-6 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">{exp.role} - {exp.company}</h4>
                      <p className="text-blue-600 font-medium mb-2">{exp.period}</p>
                      <p className="text-gray-600 mb-4">{exp.description}</p>
                      <ul className="space-y-2 text-gray-600">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>• {achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">{t.cta.title}</h3>
          <p className="text-xl text-blue-100 mb-8">{t.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:bonjour@alpa-strategie.com" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t.cta.consultation}
            </a>
            <a 
              href="https://linkedin.com/in/baptiste-leroux-550662a" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {t.cta.connect}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-bold text-lg">{t.footer.title}</h4>
              <p className="text-gray-400">{t.footer.subtitle}</p>
              <div className="mt-2">
                <LanguageToggle />
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="mailto:bonjour@alpa-strategie.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+33778555980" className="text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/baptiste-leroux-550662a" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t.footer.location}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultingWebsite;