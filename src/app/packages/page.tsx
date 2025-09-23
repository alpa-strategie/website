"use client";

import React from 'react';
import Layout from '../../components/Layout';
import { useLanguage } from '../../components/LanguageProvider';
import { translations } from '../translations';

const PackagesContent = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    </>
  );
};

const PackagesPage = () => {
  return (
    <Layout>
      <PackagesContent />
    </Layout>
  );
};

export default PackagesPage;
