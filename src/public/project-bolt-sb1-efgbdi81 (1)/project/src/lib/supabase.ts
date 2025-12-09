import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'patient' | 'doctor' | 'admin';
  phone?: string;
  specialization?: string;
  created_at: string;
  updated_at: string;
}

export interface BodyHealthData {
  id: string;
  user_id: string;
  symptoms: string[];
  height?: number;
  weight?: number;
  age?: number;
  blood_pressure?: string;
  heart_rate?: number;
  temperature?: number;
  health_score: number;
  risk_level: 'low' | 'medium' | 'high';
  ai_analysis: Record<string, unknown>;
  health_plan: Record<string, unknown>;
  created_at: string;
}

export interface MindHealthData {
  id: string;
  user_id: string;
  mood?: string;
  sleep_hours?: number;
  sleep_quality?: string;
  daily_routine: Record<string, unknown>;
  mental_symptoms: string[];
  stress_level: number;
  anxiety_level: number;
  mind_score: number;
  ai_recommendations: Record<string, unknown>;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  symptoms?: string;
  notes?: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;
  medicines: Array<{ name: string; dosage: string; frequency: string }>;
  tests_recommended: string[];
  diet_plan?: string;
  precautions?: string;
  follow_up_date?: string;
  created_at: string;
}

export interface PatientVitals {
  id: string;
  patient_id: string;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  blood_sugar?: number;
  heart_rate?: number;
  temperature?: number;
  oxygen_level?: number;
  recorded_at: string;
}
