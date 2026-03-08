-- ============================================================
-- Relax Aircon — Employee Management Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension (already on by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE employees (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Mandatory fields
  full_name        TEXT        NOT NULL CHECK (char_length(full_name) >= 2),
  mobile           TEXT        NOT NULL UNIQUE CHECK (mobile ~ '^\d{10}$'),
  address          TEXT        NOT NULL CHECK (char_length(address) >= 5),

  -- Optional fields
  email            TEXT        UNIQUE CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  role             TEXT        CHECK (role IN (
                                 'technician','senior_technician','supervisor',
                                 'manager','admin_staff','receptionist','other'
                               )),
  experience_years INTEGER     CHECK (experience_years >= 0 AND experience_years <= 50),
  expected_salary  INTEGER     CHECK (expected_salary >= 0),   -- stored in INR/month
  profile_photo    TEXT,       -- Supabase Storage public URL

  -- Aadhaar: AES-256-GCM encrypted. Format stored: iv:authTag:ciphertext (all hex)
  -- Never store plaintext Aadhaar. Application layer encrypts before INSERT.
  aadhaar_encrypted TEXT       CHECK (
    aadhaar_encrypted IS NULL OR
    aadhaar_encrypted ~ '^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$'
  ),
  -- Last 4 digits of Aadhaar stored in plain for display/search (non-sensitive)
  aadhaar_last4    CHAR(4)     CHECK (aadhaar_last4 IS NULL OR aadhaar_last4 ~ '^\d{4}$'),

  -- Status & audit
  status           TEXT        NOT NULL DEFAULT 'active'
                               CHECK (status IN ('active','inactive','terminated')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes for common query patterns
CREATE INDEX idx_employees_mobile   ON employees(mobile);
CREATE INDEX idx_employees_role     ON employees(role);
CREATE INDEX idx_employees_status   ON employees(status);
CREATE INDEX idx_employees_name_trgm ON employees USING gin(to_tsvector('english', full_name));

-- Row Level Security: only authenticated users can read/write
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Policy: service_role (used by server-side API) has full access
CREATE POLICY "service_role_all" ON employees
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: authenticated users can read active employees
CREATE POLICY "authenticated_read" ON employees
  FOR SELECT USING (auth.role() = 'authenticated' AND status = 'active');
