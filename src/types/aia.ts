import { VisitorProfile } from './visitor';

export interface AiaState {
  isOpen: boolean;
  hasSeenOnboarding: boolean;
  visitorProfile: VisitorProfile | null;
  chatActive: boolean;
}

export interface AiaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AiaStorageData {
  seen: boolean;
  profile: VisitorProfile | null;
  lastInteraction: number;
}
