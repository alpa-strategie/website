"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Target, Zap, Globe, Database, Users, Cloud } from 'lucide-react';
import Layout from '../../components/Layout';
import { useLanguage } from '../../components/LanguageProvider';
import { translations } from '../translations';

const ServicesContent = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      {service.id === 'pmo' && <Target className="w-6 h-6" />}
                      {service.id === 'saas' && <Zap className="w-6 h-6" />}
                      {service.id === 'global-delivery' && <Globe className="w-6 h-6" />}
                      {service.id === 'offshoring' && <Globe className="w-6 h-6" />}
                      {service.id === 'innovation' && <TrendingUp className="w-6 h-6" />}
                      {service.id === 'bi' && <Database className="w-6 h-6" />}
                      {service.id === 'crm' && <Users className="w-6 h-6" />}
                      {service.id === 'cloud' && <Cloud className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
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
    </>
  );
};

const ServicesPage = () => {
  return (
    <Layout>
      <ServicesContent />
    </Layout>
  );
};

export default ServicesPage;
