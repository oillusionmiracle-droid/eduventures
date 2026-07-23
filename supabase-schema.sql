-- =============================================
-- EduVentures Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Table 1: Outing/Game Suggestions
CREATE TABLE IF NOT EXISTS suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_name TEXT,
  game_1 TEXT,
  game_2 TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table 2: Award Nominations
CREATE TABLE IF NOT EXISTS nominations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  nominated_person TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, nominated_person, ip_hash)
);

-- Table 3: Student Businesses
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  business_description TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table 4: Admin Settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_password_hash TEXT NOT NULL,
  session_token TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- Indexes for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_nominations_category ON nominations(category);
CREATE INDEX IF NOT EXISTS idx_nominations_person ON nominations(nominated_person);
CREATE INDEX IF NOT EXISTS idx_nominations_ip ON nominations(ip_hash);
CREATE INDEX IF NOT EXISTS idx_suggestions_department ON suggestions(department_name);
CREATE INDEX IF NOT EXISTS idx_suggestions_created ON suggestions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_businesses_created ON businesses(created_at DESC);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon users (for student submissions)
CREATE POLICY "Allow anonymous inserts on suggestions"
  ON suggestions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on nominations"
  ON nominations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on businesses"
  ON businesses FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only service role can read (backend uses service key)
CREATE POLICY "Service role full access on suggestions"
  ON suggestions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on nominations"
  ON nominations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on businesses"
  ON businesses FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on admin_settings"
  ON admin_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
