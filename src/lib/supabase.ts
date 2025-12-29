import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criar cliente apenas se as variáveis estiverem configuradas
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          child_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          child_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          child_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      diary_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: string;
          food: string[];
          crisis: boolean;
          crisis_details: string | null;
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mood: string;
          food?: string[];
          crisis?: boolean;
          crisis_details?: string | null;
          notes: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: string;
          food?: string[];
          crisis?: boolean;
          crisis_details?: string | null;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      behavior_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          behavior: string;
          notes: string;
          medical_report: string | null;
          doctor_name: string | null;
          consultation_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          behavior: string;
          notes: string;
          medical_report?: string | null;
          doctor_name?: string | null;
          consultation_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          behavior?: string;
          notes?: string;
          medical_report?: string | null;
          doctor_name?: string | null;
          consultation_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      routines: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          time: string;
          days: string[];
          category: string;
          notes: string | null;
          completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          time: string;
          days?: string[];
          category: string;
          notes?: string | null;
          completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          time?: string;
          days?: string[];
          category?: string;
          notes?: string | null;
          completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      assistant_messages: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          content: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: string;
          content: string;
          timestamp: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          content?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
      medications: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          dosage: string;
          times: string[];
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          dosage: string;
          times: string[];
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          dosage?: string;
          times?: string[][];
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      therapies: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          therapist_name: string;
          schedule: string;
          location: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          therapist_name: string;
          schedule: string;
          location?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          therapist_name?: string;
          schedule?: string;
          location?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      sensory_map: {
        Row: {
          id: string;
          user_id: string;
          trigger_type: string;
          description: string;
          intensity: number;
          strategies: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          trigger_type: string;
          description: string;
          intensity: number;
          strategies?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          trigger_type?: string;
          description?: string;
          intensity?: number;
          strategies?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      crisis_records: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          duration: number | null;
          triggers: string[];
          strategies_used: string[];
          effectiveness: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          duration?: number | null;
          triggers?: string[];
          strategies_used?: string[];
          effectiveness?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          duration?: number | null;
          triggers?: string[];
          strategies_used?: string[];
          effectiveness?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      school_communications: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: string;
          triggers: string[];
          food_intake: string | null;
          activities: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mood: string;
          triggers?: string[];
          food_intake?: string | null;
          activities?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: string;
          triggers?: string[];
          food_intake?: string | null;
          activities?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
