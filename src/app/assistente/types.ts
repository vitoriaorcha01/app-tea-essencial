// Tipos para o Assistente de Rotina Inteligente

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  notes?: string;
}

export interface Therapy {
  id: string;
  type: string;
  therapist: string;
  schedule: {
    day: string;
    time: string;
  }[];
  location: string;
  notes?: string;
}

export interface ChildPattern {
  id: string;
  category: 'sleep' | 'irritability' | 'energy' | 'focus' | 'other';
  description: string;
  timeOfDay?: string;
  triggers?: string[];
}

export interface RecurrentBehavior {
  id: string;
  behavior: string;
  frequency: 'daily' | 'weekly' | 'occasional';
  triggers?: string[];
  strategies?: string[];
}

export interface SensoryTrigger {
  id: string;
  type: 'sound' | 'light' | 'touch' | 'smell' | 'taste' | 'visual' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high';
  avoidanceStrategies?: string[];
}

export interface FoodPreference {
  id: string;
  food: string;
  type: 'preferred' | 'tolerated' | 'avoided';
  texture?: string;
  notes?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'class' | 'activity' | 'event' | 'holiday';
  notes?: string;
}

export interface Appointment {
  id: string;
  type: string;
  professional: string;
  date: string;
  time: string;
  location: string;
  itemsToTake?: string[];
  notes?: string;
}

export interface Alert {
  id: string;
  type: 'medication' | 'therapy' | 'crisis' | 'routine' | 'appointment';
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  actionable?: boolean;
}

export interface CrisisEvent {
  id: string;
  timestamp: Date;
  duration: number; // em minutos
  triggers: string[];
  intensity: 'low' | 'medium' | 'high';
  strategiesUsed: string[];
  effectiveness: 'worked' | 'partial' | 'didnt-work';
  notes?: string;
}

export interface SensoryProfile {
  childName: string;
  triggers: SensoryTrigger[];
  safeEnvironments: string[];
  calmingStrategies: string[];
  lastUpdated: Date;
}

export interface SchoolCommunication {
  id: string;
  date: string;
  from: 'school' | 'parent';
  mood?: 'happy' | 'neutral' | 'upset' | 'anxious';
  triggers?: string[];
  meals?: string[];
  activities?: string[];
  notes: string;
}

export interface RoutineData {
  medications: Medication[];
  therapies: Therapy[];
  patterns: ChildPattern[];
  behaviors: RecurrentBehavior[];
  sensoryTriggers: SensoryTrigger[];
  foodPreferences: FoodPreference[];
  schoolEvents: SchoolEvent[];
  appointments: Appointment[];
}
