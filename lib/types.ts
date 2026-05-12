export type EnergyLevel = 'quiet' | 'building' | 'lively' | 'packed';

export interface VenueStatus {
  energy_level: EnergyLevel;
  is_open: boolean;
  current_music: string | null;
  dj_active: boolean;
  live_band_active: boolean;
  cover_charge: number;
  line_estimate: string | null;
  updated_at: string;
}

export interface Special {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  logo: string | null;
  website: string | null;
  instagram: string | null;
  phone: string | null;
  // joined from venue_status
  status: VenueStatus | null;
  // joined from specials
  specials: Special[];
  // computed
  distance_m?: number;
}
