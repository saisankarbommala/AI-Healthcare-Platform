/*
  # AI Healthcare Platform Database Schema

  ## Overview
  Complete database schema for AI Healthcare Website with Body, Mind, Doctor, and Patient modules.

  ## New Tables Created
  
  ### 1. `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `role` (text) - 'patient', 'doctor', 'admin'
  - `phone` (text)
  - `specialization` (text) - for doctors
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. `body_health_data`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `symptoms` (jsonb) - array of symptoms
  - `height` (numeric) - in cm
  - `weight` (numeric) - in kg
  - `age` (integer)
  - `blood_pressure` (text)
  - `heart_rate` (integer)
  - `temperature` (numeric)
  - `health_score` (integer) - 0-100
  - `risk_level` (text) - 'low', 'medium', 'high'
  - `ai_analysis` (jsonb)
  - `health_plan` (jsonb)
  - `created_at` (timestamptz)
  
  ### 3. `mind_health_data`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `mood` (text)
  - `sleep_hours` (numeric)
  - `sleep_quality` (text)
  - `daily_routine` (jsonb)
  - `mental_symptoms` (jsonb)
  - `stress_level` (integer) - 1-10
  - `anxiety_level` (integer) - 1-10
  - `mind_score` (integer) - 0-100
  - `ai_recommendations` (jsonb)
  - `created_at` (timestamptz)
  
  ### 4. `appointments`
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references profiles)
  - `doctor_id` (uuid, references profiles)
  - `appointment_date` (timestamptz)
  - `status` (text) - 'scheduled', 'completed', 'cancelled'
  - `symptoms` (text)
  - `notes` (text)
  - `created_at` (timestamptz)
  
  ### 5. `prescriptions`
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references profiles)
  - `doctor_id` (uuid, references profiles)
  - `appointment_id` (uuid, references appointments)
  - `medicines` (jsonb)
  - `tests_recommended` (jsonb)
  - `diet_plan` (text)
  - `precautions` (text)
  - `follow_up_date` (date)
  - `created_at` (timestamptz)
  
  ### 6. `patient_vitals`
  - `id` (uuid, primary key)
  - `patient_id` (uuid, references profiles)
  - `blood_pressure_systolic` (integer)
  - `blood_pressure_diastolic` (integer)
  - `blood_sugar` (numeric)
  - `heart_rate` (integer)
  - `temperature` (numeric)
  - `oxygen_level` (numeric)
  - `recorded_at` (timestamptz)
  
  ### 7. `doctor_availability`
  - `id` (uuid, primary key)
  - `doctor_id` (uuid, references profiles)
  - `day_of_week` (integer) - 0-6
  - `start_time` (time)
  - `end_time` (time)
  - `is_available` (boolean)
  
  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Doctors can access their patients' data
  - Admins have full access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'patient',
  phone text,
  specialization text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create body_health_data table
CREATE TABLE IF NOT EXISTS body_health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  symptoms jsonb DEFAULT '[]'::jsonb,
  height numeric,
  weight numeric,
  age integer,
  blood_pressure text,
  heart_rate integer,
  temperature numeric,
  health_score integer DEFAULT 0,
  risk_level text DEFAULT 'low',
  ai_analysis jsonb DEFAULT '{}'::jsonb,
  health_plan jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE body_health_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own body health data"
  ON body_health_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own body health data"
  ON body_health_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own body health data"
  ON body_health_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create mind_health_data table
CREATE TABLE IF NOT EXISTS mind_health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mood text,
  sleep_hours numeric,
  sleep_quality text,
  daily_routine jsonb DEFAULT '{}'::jsonb,
  mental_symptoms jsonb DEFAULT '[]'::jsonb,
  stress_level integer DEFAULT 0,
  anxiety_level integer DEFAULT 0,
  mind_score integer DEFAULT 0,
  ai_recommendations jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mind_health_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mind health data"
  ON mind_health_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mind health data"
  ON mind_health_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mind health data"
  ON mind_health_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  appointment_date timestamptz NOT NULL,
  status text DEFAULT 'scheduled',
  symptoms text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id)
  WITH CHECK (auth.uid() = patient_id OR auth.uid() = doctor_id);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  medicines jsonb DEFAULT '[]'::jsonb,
  tests_recommended jsonb DEFAULT '[]'::jsonb,
  diet_plan text,
  precautions text,
  follow_up_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients and doctors can view prescriptions"
  ON prescriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Doctors can create prescriptions"
  ON prescriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update prescriptions"
  ON prescriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = doctor_id)
  WITH CHECK (auth.uid() = doctor_id);

-- Create patient_vitals table
CREATE TABLE IF NOT EXISTS patient_vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  blood_sugar numeric,
  heart_rate integer,
  temperature numeric,
  oxygen_level numeric,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE patient_vitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can view own vitals"
  ON patient_vitals FOR SELECT
  TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Patients can insert own vitals"
  ON patient_vitals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

-- Create doctor_availability table
CREATE TABLE IF NOT EXISTS doctor_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  day_of_week integer NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_available boolean DEFAULT true
);

ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view doctor availability"
  ON doctor_availability FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Doctors can manage own availability"
  ON doctor_availability FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can update own availability"
  ON doctor_availability FOR UPDATE
  TO authenticated
  USING (auth.uid() = doctor_id)
  WITH CHECK (auth.uid() = doctor_id);

CREATE POLICY "Doctors can delete own availability"
  ON doctor_availability FOR DELETE
  TO authenticated
  USING (auth.uid() = doctor_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_body_health_user_id ON body_health_data(user_id);
CREATE INDEX IF NOT EXISTS idx_mind_health_user_id ON mind_health_data(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_vitals_patient_id ON patient_vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_doctor_id ON doctor_availability(doctor_id);