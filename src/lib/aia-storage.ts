import { VisitorProfile } from '@/types/visitor';
import { AiaStorageData } from '@/types/aia';

const AIA_STORAGE_KEY = 'aia_data';

export function getAiaData(): AiaStorageData {
  if (typeof window === 'undefined') {
    return {
      seen: false,
      profile: null,
      lastInteraction: 0,
    };
  }

  try {
    const stored = localStorage.getItem(AIA_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading Aïa storage:', error);
  }

  return {
    seen: false,
    profile: null,
    lastInteraction: 0,
  };
}

export function setAiaData(data: Partial<AiaStorageData>) {
  if (typeof window === 'undefined') return;

  try {
    const current = getAiaData();
    const updated = {
      ...current,
      ...data,
      lastInteraction: Date.now(),
    };
    localStorage.setItem(AIA_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving Aïa storage:', error);
  }
}

export function getAiaSeen(): boolean {
  return getAiaData().seen;
}

export function setAiaSeen(seen: boolean) {
  setAiaData({ seen });
}

export function getVisitorProfile(): VisitorProfile | null {
  return getAiaData().profile;
}

export function setVisitorProfile(profile: VisitorProfile | null) {
  setAiaData({ profile });
}

export function clearAiaData() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AIA_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing Aïa storage:', error);
  }
}
