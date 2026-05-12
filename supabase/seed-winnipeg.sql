-- ============================================================
-- Ce Soir — Winnipeg seed data
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- Venues
INSERT INTO venues (name, type, address, lat, lng, website, instagram) VALUES
  ('The Exchange Club',    'Cocktail Lounge',    '82 Arthur St, Winnipeg',         49.8964, -97.1438, 'exchangeclub.ca',   '@exchangeclubwpg'),
  ('Prairie Rooftop',      'Rooftop Bar',         '333 Portage Ave, Winnipeg',       49.8955, -97.1385, 'prairierooftop.ca', '@prairierooftop'),
  ('The Forks Social',     'Bar',                 '1 Forks Market Rd, Winnipeg',    49.8880, -97.1297, 'theforks.com',      '@theforksmarket'),
  ('Craft & Theory',       'Craft Beer Bar',      '164 Princess St, Winnipeg',       49.8962, -97.1412, 'craftandtheory.ca', '@craftandtheorywpg'),
  ('Club Osborne',         'Nightclub',           '130 Osborne St, Winnipeg',        49.8757, -97.1391, null,                '@clubosbornewpg'),
  ('The Roslyn',           'Live Music Venue',    '268 Garry St, Winnipeg',          49.8905, -97.1435, 'theroslynwpg.ca',   '@theroslynwpg'),
  ('District Lounge',      'Cocktail Lounge',    '219 McDermot Ave, Winnipeg',     49.8960, -97.1455, 'districtlounge.ca', '@districtlounge'),
  ('Parlour',              'Bar',                 '500 Portage Ave, Winnipeg',       49.8947, -97.1419, 'parlourwpg.ca',     '@parlourwpg')
ON CONFLICT DO NOTHING;

-- Live status for each venue (tonight's snapshot)
INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'packed',   true, 'Deep House',    true,  false, 20,  '15–20 min' FROM venues WHERE name = 'The Exchange Club'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'lively',   true, 'R&B / Soul',    true,  false, 0,   '5 min'     FROM venues WHERE name = 'Prairie Rooftop'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'building', true, 'Indie / Folk',  false, false, 0,   null        FROM venues WHERE name = 'The Forks Social'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'lively',   true, 'Classic Rock',  false, false, 0,   null        FROM venues WHERE name = 'Craft & Theory'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'packed',   true, 'Techno',        true,  false, 25,  '30+ min'   FROM venues WHERE name = 'Club Osborne'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'lively',   true, 'Indie Rock',    false, true,  15,  null        FROM venues WHERE name = 'The Roslyn'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, live_band_active=EXCLUDED.live_band_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'building', true, 'Jazz',          false, true,  0,   null        FROM venues WHERE name = 'District Lounge'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, live_band_active=EXCLUDED.live_band_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

INSERT INTO venue_status (venue_id, energy_level, is_open, current_music, dj_active, live_band_active, cover_charge, line_estimate)
SELECT id, 'quiet',    true, 'Hip-Hop',       false, false, 0,   null        FROM venues WHERE name = 'Parlour'
ON CONFLICT (venue_id) DO UPDATE SET energy_level=EXCLUDED.energy_level, current_music=EXCLUDED.current_music, dj_active=EXCLUDED.dj_active, cover_charge=EXCLUDED.cover_charge, line_estimate=EXCLUDED.line_estimate;

-- Specials
INSERT INTO specials (venue_id, title, description, start_time, end_time, is_active)
SELECT id, '2-for-1 cocktails', 'Until 10pm', '20:00', '22:00', true FROM venues WHERE name = 'The Exchange Club';
INSERT INTO specials (venue_id, title, description, start_time, end_time, is_active)
SELECT id, '$8 house wines all night', null, '17:00', '02:00', true FROM venues WHERE name = 'Prairie Rooftop';
INSERT INTO specials (venue_id, title, description, start_time, end_time, is_active)
SELECT id, '$5 local craft drafts', 'During live set', '21:00', '23:00', true FROM venues WHERE name = 'The Roslyn';
INSERT INTO specials (venue_id, title, description, start_time, end_time, is_active)
SELECT id, '$6 pints all night', null, '18:00', '02:00', true FROM venues WHERE name = 'Craft & Theory';
INSERT INTO specials (venue_id, title, description, start_time, end_time, is_active)
SELECT id, 'Happy hour — $7 cocktails', '5–7pm', '17:00', '19:00', true FROM venues WHERE name = 'District Lounge';
