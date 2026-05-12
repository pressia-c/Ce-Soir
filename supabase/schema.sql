-- ============================================================
-- Ce Soir — Supabase schema
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- ── Tables ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone       TEXT UNIQUE NOT NULL,
  age         INTEGER,
  gender      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  last_seen   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS venues (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  type       TEXT NOT NULL,
  address    TEXT NOT NULL,
  -- Store as plain columns so the API can read without PostGIS client
  lat        DOUBLE PRECISION NOT NULL,
  lng        DOUBLE PRECISION NOT NULL,
  -- Also keep geography column for spatial queries
  location   GEOGRAPHY(POINT) GENERATED ALWAYS AS (ST_MakePoint(lng, lat)::geography) STORED,
  logo       TEXT,
  website    TEXT,
  instagram  TEXT,
  phone      TEXT,
  email      TEXT,
  owner_id   UUID REFERENCES users(id),
  is_verified BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS venues_location_idx ON venues USING GIST(location);

CREATE TABLE IF NOT EXISTS venue_status (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id         UUID UNIQUE REFERENCES venues(id) ON DELETE CASCADE,
  energy_level     TEXT NOT NULL DEFAULT 'quiet',  -- quiet | building | lively | packed
  is_open          BOOLEAN DEFAULT true,
  current_music    TEXT,
  dj_active        BOOLEAN DEFAULT false,
  live_band_active BOOLEAN DEFAULT false,
  cover_charge     DECIMAL(10,2) DEFAULT 0,
  line_estimate    TEXT,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS specials (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id     UUID REFERENCES venues(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  start_time   TIME NOT NULL,
  end_time     TIME NOT NULL,
  is_recurring BOOLEAN DEFAULT true,
  days_active  INTEGER[],  -- 0=Mon … 6=Sun
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS check_ins (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  venue_id      UUID REFERENCES venues(id) ON DELETE CASCADE,
  group_type    TEXT,
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  checked_out_at TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id              UUID UNIQUE REFERENCES venues(id) ON DELETE CASCADE,
  tier                  TEXT NOT NULL DEFAULT 'pro',
  stripe_subscription_id TEXT,
  stripe_customer_id    TEXT,
  current_period_start  TIMESTAMPTZ,
  current_period_end    TIMESTAMPTZ,
  status                TEXT DEFAULT 'active',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── Proximity RPC ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION venues_near(lat DOUBLE PRECISION, lng DOUBLE PRECISION, radius_m INTEGER DEFAULT 5000)
RETURNS TABLE (
  id TEXT, name TEXT, type TEXT, address TEXT,
  lat DOUBLE PRECISION, lng DOUBLE PRECISION,
  logo TEXT, website TEXT, instagram TEXT, phone TEXT,
  venue_status JSONB, specials JSONB,
  distance_m DOUBLE PRECISION
) LANGUAGE sql STABLE AS $$
  SELECT
    v.id::text,
    v.name,
    v.type,
    v.address,
    v.lat,
    v.lng,
    v.logo,
    v.website,
    v.instagram,
    v.phone,
    to_jsonb(vs.*) AS venue_status,
    COALESCE(
      (SELECT jsonb_agg(to_jsonb(s.*))
       FROM specials s WHERE s.venue_id = v.id AND s.is_active = true),
      '[]'::jsonb
    ) AS specials,
    ST_Distance(v.location, ST_MakePoint(lng, lat)::geography) AS distance_m
  FROM venues v
  LEFT JOIN venue_status vs ON vs.venue_id = v.id
  WHERE ST_DWithin(v.location, ST_MakePoint(lng, lat)::geography, radius_m)
  ORDER BY distance_m;
$$;

-- ── Row Level Security ────────────────────────────────────────

ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating (safe to re-run)
DROP POLICY IF EXISTS "Public read venues"    ON venues;
DROP POLICY IF EXISTS "Public read status"    ON venue_status;
DROP POLICY IF EXISTS "Public read specials"  ON specials;
DROP POLICY IF EXISTS "Owner update venue"    ON venues;
DROP POLICY IF EXISTS "Owner manage status"   ON venue_status;
DROP POLICY IF EXISTS "Owner manage specials" ON specials;

-- Public can read venues, status, specials
CREATE POLICY "Public read venues"    ON venues        FOR SELECT USING (true);
CREATE POLICY "Public read status"    ON venue_status  FOR SELECT USING (true);
CREATE POLICY "Public read specials"  ON specials      FOR SELECT USING (true);

-- Owners can update their venues
CREATE POLICY "Owner update venue"    ON venues        FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owner manage status"   ON venue_status  FOR ALL
  USING (EXISTS (SELECT 1 FROM venues WHERE id = venue_status.venue_id AND owner_id = auth.uid()));
CREATE POLICY "Owner manage specials" ON specials      FOR ALL
  USING (EXISTS (SELECT 1 FROM venues WHERE id = specials.venue_id AND owner_id = auth.uid()));
