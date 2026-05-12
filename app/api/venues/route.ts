import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Returns venues with live status and active specials.
// Optionally filter by lat/lng/radius (meters, default 5km).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') ?? '49.8951');
  const lng = parseFloat(searchParams.get('lng') ?? '-97.1384');
  const radius = parseInt(searchParams.get('radius') ?? '5000');

  const db = supabaseAdmin();

  // Use PostGIS RPC for proximity search
  const { data: venues, error: venuesError } = await db.rpc('venues_near', {
    lat, lng, radius_m: radius,
  });

  if (venuesError) {
    // Fallback: return all venues without geo-filtering (useful before PostGIS is set up)
    const { data: allVenues, error: allError } = await db
      .from('venues')
      .select(`*, venue_status(*), specials(*)`)
      .eq('specials.is_active', true);

    if (allError) return NextResponse.json({ error: allError.message }, { status: 500 });
    return NextResponse.json(normalize(allVenues ?? []));
  }

  return NextResponse.json(normalize(venues ?? []));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(rows: any[]) {
  return rows.map((v) => ({
    id: v.id,
    name: v.name,
    type: v.type,
    address: v.address,
    lat: v.lat ?? v.location_lat,
    lng: v.lng ?? v.location_lng,
    logo: v.logo ?? null,
    website: v.website ?? null,
    instagram: v.instagram ?? null,
    phone: v.phone ?? null,
    status: v.venue_status ?? null,
    specials: v.specials ?? [],
    distance_m: v.distance_m ?? null,
  }));
}
