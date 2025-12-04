"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Target, Globe, Zap, Database, Users, Code, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from '../components/LanguageProvider';
import { translations } from './translations';

const HomeContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const highlightSection = () => {
      const hash = window.location.hash;
      if (hash === '#why-choose') {
        const element = document.getElementById('why-choose');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.classList.add('bg-yellow-100/60', 'ring-2', 'ring-yellow-300', 'rounded-lg', 'transition-all', 'duration-300');
          setTimeout(() => {
            element.classList.remove('bg-yellow-100/60', 'ring-2', 'ring-yellow-300');
          }, 2500);
        }
      }
    };

    highlightSection();
    window.addEventListener('hashchange', highlightSection);

    return () => {
      window.removeEventListener('hashchange', highlightSection);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="fade-in-up">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  International IT Leadership Consultant
                </span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-900">{t.hero.title.split(' ').slice(0, -2).join(' ')}</span>{' '}
                <span className="gradient-text">{t.hero.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="modern-card px-3 py-3 rounded-xl text-center hover-lift">
                  <Database className="w-6 h-6 text-blue-500 mx-auto mb-2" aria-label="Data expertise" />
                  <span className="gradient-text font-bold text-lg block">{t.hero.stat1}</span>
                </div>
                <div className="modern-card px-3 py-3 rounded-xl text-center hover-lift">
                  <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" aria-label="CRM expertise" />
                  <span className="gradient-text font-bold text-lg block">{t.hero.stat2}</span>
                </div>
                <div className="modern-card px-3 py-3 rounded-xl text-center hover-lift">
                  <Code className="w-6 h-6 text-blue-500 mx-auto mb-2" aria-label="Software development expertise" />
                  <span className="gradient-text font-bold text-lg block break-words">{t.hero.stat3}</span>
                </div>
                <div className="modern-card px-3 py-3 rounded-xl text-center hover-lift">
                  <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" aria-label="Business optimization expertise" />
                  <span className="gradient-text font-bold text-lg block">{t.hero.stat4}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:bonjour@alpa-strategie.com" 
                  className="btn-gradient text-white px-8 py-4 rounded-xl font-semibold text-center inline-block"
                >
                  {t.hero.cta}
                </a>
                <a 
                  href="#why-choose" 
                  className="btn-gradient-outline px-8 py-4 rounded-xl font-semibold text-center inline-block"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Visual Card Column */}
            <div className="scale-in lg:block hidden">
              <div className="glass-card p-8 rounded-2xl hover-lift">
                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src="/profile.jpg"
                      alt="Baptiste Leroux - Professional Photo"
                      fill
                      sizes="80px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.visualCard.name}</h3>
                  <p className="gradient-text-blue font-semibold">{t.visualCard.subtitle}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700 font-medium">{t.visualCard.customerSatisfaction}</span>
                    <span className="gradient-text font-bold">{t.visualCard.highestPriority}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700 font-medium">{t.visualCard.projectsDelivered}</span>
                    <span className="gradient-text font-bold">{t.visualCard.projectsCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700 font-medium">{t.visualCard.teamScale}</span>
                    <span className="gradient-text font-bold">{t.visualCard.teamScaleValue}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                    <span className="text-gray-700 font-medium">{t.visualCard.globalReach}</span>
                    <span className="gradient-text font-bold">{t.visualCard.globalReachValue}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/30">
                  <p className="text-sm text-gray-600 text-center italic">
                    &quot;{t.visualCard.quote}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <div id="why-choose" className="text-center fade-in-up">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">{t.overview.title}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="modern-card p-6 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 gradient-text-blue">{t.overview.card1Title}</h4>
                <p className="text-gray-600">{t.overview.card1Desc}</p>
              </div>
              <div className="modern-card p-6 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 gradient-text-blue">{t.overview.card2Title}</h4>
                <p className="text-gray-600">{t.overview.card2Desc}</p>
              </div>
              <div className="modern-card p-6 rounded-xl hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 gradient-text-blue">{t.overview.card3Title}</h4>
                <p className="text-gray-600">{t.overview.card3Desc}</p>
              </div>
            </div>
          </div>

          <div className="modern-card rounded-xl p-8 hover-lift scale-in">
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">{t.overview.expertiseTitle}</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold gradient-text-blue mb-3">{t.overview.saasTitle}</h4>
                <ul className="space-y-2 text-gray-600">
                  {t.overview.saasItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold gradient-text-blue mb-3">{t.overview.techTitle}</h4>
                <ul className="space-y-2 text-gray-600">
                  {t.overview.techItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
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
