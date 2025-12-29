export interface Routine {
  id: string;
  name: string;
  time: string;
  description: string;
  activities: Activity[];
  createdAt: Date;
}

export interface Activity {
  id: string;
  name: string;
  duration: number;
  icon: string;
}

export interface Behavior {
  id: string;
  name: string;
  description: string;
  causes: string[];
  prevention: string[];
  strategies: string[];
}

export interface DiaryEntry {
  id: string;
  date: Date;
  mood: 'happy' | 'neutral' | 'sad' | 'angry';
  food: string[];
  crisis: boolean;
  crisisDetails?: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
