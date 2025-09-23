"use client";

import React from 'react';
import { TrendingUp, Users, Database } from 'lucide-react';
import Layout from '../../components/Layout';
import { useLanguage } from '../../components/LanguageProvider';
import { translations } from '../translations';

const AboutContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.about.title}</h3>
            <p className="text-xl text-blue-600 font-semibold mb-6">{t.about.subtitle}</p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">{t.about.intro}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{t.about.backgroundTitle}</h4>
              <p className="text-gray-600 leading-relaxed">{t.about.backgroundText}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{t.about.approachTitle}</h4>
              <p className="text-gray-600 leading-relaxed">{t.about.approachText}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">{t.about.expertiseTitle}</h4>
            <div className="grid md:grid-cols-1 gap-4">
              {t.about.expertiseItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">{t.about.credentialsTitle}</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {t.about.credentialsItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16">
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
      </div>
    </>
  );
};

const AboutPage = () => {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  );
};

export default AboutPage;
