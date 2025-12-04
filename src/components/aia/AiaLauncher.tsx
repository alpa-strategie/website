'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import translations from '@/app/translations';
import { getAiaSeen } from '@/lib/aia-storage';
import AiaModal from './AiaModal';

export default function AiaLauncher() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].aia;
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const hasSeenAia = getAiaSeen();
    
    if (!hasSeenAia) {
      const timer = setTimeout(() => {
        if (isMobile) {
          router.push('/aia');
        } else {
          setIsModalOpen(true);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowLauncher(true);
    }
  }, [isMobile, router]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowLauncher(true);
  };

  const handleLauncherClick = () => {
    if (isMobile) {
      router.push('/aia');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {showLauncher && !isModalOpen && (
        <button
          onClick={handleLauncherClick}
          className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group animate-fade-in"
          aria-label={t.buttonLabel}
          title={t.closeTooltip}
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
        </button>
      )}

      {isModalOpen && <AiaModal onClose={handleModalClose} />}
    </>
  );
}
