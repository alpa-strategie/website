"use client";

import React from 'react';
import { LanguageProvider } from './LanguageProvider';
import Header from './Header';
import Footer from './Footer';
import AiaLauncher from './aia/AiaLauncher';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="min-h-screen radial-gradient-bg relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full floating-animation"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full floating-animation" style={{ animationDelay: '4s' }}></div>
        
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
        <AiaLauncher />
      </div>
    </LanguageProvider>
  );
};

export default Layout;
