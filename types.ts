export enum UserRole {
  CREATOR = 'CREATOR',
  EXPERT = 'EXPERT',
  ADMIN = 'ADMIN'
}

export enum ProjectStatus {
  AI_GENERATED = 'AI_GENERATED',
  CONSULTATION = 'CONSULTATION',
  DEMO_RECEIVED = 'DEMO_RECEIVED',
  PRODUCTION = 'PRODUCTION',
  COMPLETED = 'COMPLETED'
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  price: number;
  coverUrl: string;
  audioUrl: string; // Placeholder for demo
  tags: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'AI_ASSISTED' | 'EXPERT_CUSTOM' | 'PURCHASE';
  status: ProjectStatus;
  lastUpdated: string;
  expertName?: string;
  aiData?: {
    lyrics: string;
    melodyDescription: string;
    style: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  attachment?: {
    name: string;
    type: 'audio' | 'image' | 'file';
    url: string;
  };
}

export interface AIResponse {
  lyrics: string;
  melodySuggestion: string;
  vocalGuideDescription: string;
}