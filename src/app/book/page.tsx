'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/app/translations';
import Layout from '@/components/Layout';

const BookContent = () => {
  const { language } = useLanguage();
  const t = translations[language].book;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#3b82f6" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t.whatToExpectTitle}
          </h2>
          <ul className="space-y-3">
            {t.whatToExpect.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="scheduler" className="bg-white rounded-xl shadow-lg p-6 mb-8 scroll-mt-20">
          <Cal
            calLink="alpa-strategie/45-min-meeting"
            style={{ width: "100%", height: "600px" }}
            config={{ layout: "month_view" }}
          />
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {t.aiaPrompt}
          </p>
        </div>
      </div>
    </div>
  );
};

const BookPage = () => {
  return (
    <Layout>
      <BookContent />
    </Layout>
  );
};

export default BookPage;
