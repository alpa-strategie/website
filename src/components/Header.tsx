"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Languages } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { translations } from '../app/translations';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
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

  const navigation = [
    // { href: '/', label: t.nav.overview },
    { href: '/about', label: t.nav.about },
    { href: '/services', label: t.nav.services },
    { href: '/packages', label: t.nav.packages }
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/">
                <h1 className="text-2xl font-bold text-gray-900 cursor-pointer">{t.header.title}</h1>
                <p className="text-blue-600 font-medium">{t.header.subtitle}</p>
              </Link>
            </div>
            {/* Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        pathname === item.href
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
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
    </>
  );
};

export default Header;
