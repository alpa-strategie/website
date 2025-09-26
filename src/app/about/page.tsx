"use client";

import React from 'react';
import Image from 'next/image';
import { TrendingUp, Users, Database, Building2, BarChart3, Building, Server, GraduationCap, Award, Globe, Users2 } from 'lucide-react';
import Layout from '../../components/Layout';
import { useLanguage } from '../../components/LanguageProvider';
import { translations } from '../translations';

const AboutContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Function to get icon for each company
  const getCompanyIcon = (index: number) => {
    const icons = [
      { icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100' }, // StarTechUp
      { icon: BarChart3, color: 'text-green-600', bg: 'bg-green-100' }, // Electronic Arts
      { icon: Building, color: 'text-purple-600', bg: 'bg-purple-100' }, // Banque Cantonale Vaudoise
      { icon: Server, color: 'text-orange-600', bg: 'bg-orange-100' }, // ARES
      { icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100' }, // ESADE
      { icon: Database, color: 'text-red-600', bg: 'bg-red-100' }, // Oracle
    ];
    return icons[index] || { icon: Building2, color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Executive Bio Section */}
        <div className="mb-16">
          <div className="modern-card rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Photo Column */}
              <div className="lg:col-span-1 text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <Image
                    src="/profile.jpg"
                    alt="Baptiste Leroux - Professional Photo"
                    fill
                    className="rounded-full object-cover shadow-xl"
                    priority
                  />
                </div>
                
                {/* Credibility Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Award className="w-3 h-3 mr-1" />
                    IT Leadership
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Globe className="w-3 h-3 mr-1" />
                    Global Delivery
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Users2 className="w-3 h-3 mr-1" />
                    PMO Expert
                  </span>
                </div>
              </div>

              {/* Bio Content Column */}
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h1>
                <p className="text-xl text-blue-600 font-semibold mb-6">{t.about.subtitle}</p>
                
                <div className="prose prose-lg text-gray-600 mb-6">
                  <p className="leading-relaxed">
                    {language === 'en' 
                      ? "With over 20 years of international technology leadership experience, I've built my career on transforming complex technical challenges into measurable business outcomes. As the founder and CEO of StarTechUp Inc., I scaled operations from a 4-person startup to a 50-person international agency generating $5M+ in revenue."
                      : "Avec plus de 20 ans d'expérience en leadership technologique international, j'ai bâti ma carrière sur la transformation de défis techniques complexes en résultats commerciaux mesurables. En tant que fondateur et PDG de StarTechUp Inc., j'ai fait évoluer les opérations d'une startup de 4 personnes à une agence internationale de 50 personnes générant plus de 5M$ de revenus."
                    }
                  </p>
                  <p className="leading-relaxed">
                    {language === 'en'
                      ? "My unique expertise lies in bridging the gap between enterprise governance and startup agility. I specialize in global delivery strategies, offshore team management, and SaaS product scaling across diverse industries including finance, insurance, IoT, and B2C platforms."
                      : "Mon expertise unique réside dans le fait de faire le pont entre la gouvernance d'entreprise et l'agilité startup. Je me spécialise dans les stratégies de livraison globale, la gestion d'équipes offshore et la mise à l'échelle de produits SaaS dans diverses industries incluant la finance, l'assurance, l'IoT et les plateformes B2C."
                    }
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">20+</div>
                    <div className="text-sm text-gray-600">{language === 'en' ? 'Years Experience' : 'Années d\'Expérience'}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$5M+</div>
                    <div className="text-sm text-gray-600">{language === 'en' ? 'Revenue Generated' : 'Revenus Générés'}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-gray-600">{language === 'en' ? 'Team Members Led' : 'Membres d\'Équipe Dirigés'}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">10+</div>
                    <div className="text-sm text-gray-600">{language === 'en' ? 'Countries' : 'Pays'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{language === 'en' ? 'Professional Background & Expertise' : 'Parcours Professionnel & Expertise'}</h3>
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
            {t.experience.items.map((exp, index) => {
              const { icon: IconComponent, color, bg } = getCompanyIcon(index);
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${color}`} />
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
              );
            })}
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
