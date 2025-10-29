"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Linkedin, Languages, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { translations } from '../app/translations';

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const t = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
      <header className="glass-nav sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="hover-glow rounded-lg p-2 transition-all duration-300">
                <div className="relative w-[200px] h-[60px]">
                  <Image
                    src="/Logo - Alpa Strategie - 200x60 px.png"
                    alt="Alpa Stratégie"
                    title="Alpa Stratégie"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover-lift ${
                    pathname === item.href
                      ? 'bg-white/20 text-blue-600 backdrop-blur-sm'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle />
              <a href="mailto:bonjour@alpa-strategie.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                <span className="hidden lg:inline">{t.header.contact}</span>
              </a>
              <a href="https://linkedin.com/in/baptiste-leroux-550662a" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="hidden lg:inline">{t.header.linkedin}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-white/10 transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-white/5 backdrop-blur-sm">
              <nav className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-white/20 text-blue-600 backdrop-blur-sm'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Contact Links */}
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <a 
                    href="mailto:bonjour@alpa-strategie.com" 
                    className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{t.header.contact}</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/baptiste-leroux-550662a" 
                    className="flex items-center px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-white/10 rounded-lg transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 mr-3" />
                    <span>{t.header.linkedin}</span>
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
