"use client";

import React from 'react';
import { Mail, Phone, Linkedin, Languages } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { translations } from '../app/translations';

const Footer = () => {
  const { language, setLanguage } = useLanguage();
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
    <>
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">{t.cta.title}</h3>
          <p className="text-xl text-blue-100 mb-8">{t.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a target="_blank" rel="noopener noreferrer" 
              href="https://cal.com/alpa-strategie/45-min-meeting" 
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
    </>
  );
};

export default Footer;
