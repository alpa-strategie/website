"use client";

import React from 'react';
import { Target, Globe, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from '../components/LanguageProvider';
import { translations } from './translations';

const HomeContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
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

      {/* Overview Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
};

export default HomePage;
