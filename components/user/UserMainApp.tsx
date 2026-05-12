'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Search, X, ChevronUp, Music, Clock, Navigation, ExternalLink, Globe } from 'lucide-react';
import type { Venue, EnergyLevel } from '@/lib/types';

// Map must be client-only (mapbox-gl doesn't SSR)
const MapView = dynamic(() => import('./MapView'), { ssr: false, loading: () => (
  <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center">
    <p className="text-stone-400 font-light text-sm">Loading map…</p>
  </div>
) });

const ENERGY_CONFIG: Record<EnergyLevel, { label: string; color: string; text: string; dot: string; pulse: boolean }> = {
  packed:   { label: 'Packed',   color: 'bg-rose-500',  text: 'text-rose-600',  dot: 'bg-rose-500',  pulse: true },
  lively:   { label: 'Lively',   color: 'bg-amber-500', text: 'text-amber-600', dot: 'bg-amber-500', pulse: true },
  building: { label: 'Building', color: 'bg-sky-400',   text: 'text-sky-600',   dot: 'bg-sky-400',   pulse: false },
  quiet:    { label: 'Quiet',    color: 'bg-stone-300', text: 'text-stone-500', dot: 'bg-stone-300', pulse: false },
};

const FILTERS = ['All', 'Bar', 'Lounge', 'Club', 'Rooftop', 'Live Music', 'No Cover'];

function EnergyDot({ energy, size = 'md' }: { energy: EnergyLevel; size?: string }) {
  const cfg = ENERGY_CONFIG[energy];
  const sz = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';
  return (
    <span className="relative flex items-center justify-center" style={{ width: size === 'sm' ? 8 : 10, height: size === 'sm' ? 8 : 10 }}>
      {cfg.pulse && <span className={`animate-ping absolute inline-flex ${sz} rounded-full ${cfg.color} opacity-60`} />}
      <span className={`relative inline-flex rounded-full ${sz} ${cfg.dot}`} />
    </span>
  );
}

function distanceLabel(m?: number | null) {
  if (!m) return '';
  if (m < 1000) return `${Math.round(m)}m`;
  return `${(m / 1000).toFixed(1)}km`;
}

function VenueCard({ venue, onClick }: { venue: Venue; onClick: () => void }) {
  const energy = venue.status?.energy_level ?? 'quiet';
  const cfg = ENERGY_CONFIG[energy];
  const activeSpecials = venue.specials.filter(s => s.is_active);
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white/80 backdrop-blur border border-stone-200/60 rounded-3xl p-5 shadow-sm hover:shadow hover:border-stone-300 transition-all flex gap-4 items-start"
    >
      <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center opacity-20 ${cfg.color}`}>
        <EnergyDot energy={energy} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-stone-800 text-[15px] leading-snug">{venue.name}</h3>
          {venue.distance_m != null && <span className="text-xs text-stone-400 font-light flex-shrink-0 mt-0.5">{distanceLabel(venue.distance_m)}</span>}
        </div>
        <p className="text-xs text-stone-500 font-light mb-2">{venue.type}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 text-xs font-light ${cfg.text}`}>
            <EnergyDot energy={energy} size="sm" />
            {cfg.label}
          </span>
          {venue.status?.dj_active && <span className="text-xs text-stone-500 font-light flex items-center gap-1"><Music className="w-3 h-3" /> DJ</span>}
          {venue.status?.live_band_active && <span className="text-xs text-stone-500 font-light flex items-center gap-1"><Music className="w-3 h-3" /> Live</span>}
          {venue.status?.cover_charge === 0
            ? <span className="text-xs text-emerald-600 font-light">No cover</span>
            : venue.status?.cover_charge ? <span className="text-xs text-stone-500 font-light">${venue.status.cover_charge} cover</span> : null
          }
        </div>
        {activeSpecials.length > 0 && (
          <p className="text-xs text-amber-700 font-light mt-2 truncate">✦ {activeSpecials[0].title}</p>
        )}
      </div>
    </button>
  );
}

function VenueDetail({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const energy = venue.status?.energy_level ?? 'quiet';
  const cfg = ENERGY_CONFIG[energy];
  const activeSpecials = venue.specials.filter(s => s.is_active);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-[2rem] shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        <div className="px-6 pb-10">
          <div className="flex items-start justify-between mb-6 pt-2">
            <div>
              <h2 className="text-3xl text-stone-800 tracking-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>{venue.name}</h2>
              <p className="text-stone-500 font-light text-sm">{venue.type}</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors flex-shrink-0 mt-1">
              <X className="w-4 h-4 text-stone-600" />
            </button>
          </div>

          {/* Energy Banner */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl mb-6"
            style={{
              background: energy === 'packed' ? 'rgb(255 241 242)' : energy === 'lively' ? 'rgb(255 251 235)' : energy === 'building' ? 'rgb(240 249 255)' : 'rgb(250 250 249)',
            }}
          >
            <EnergyDot energy={energy} />
            <div>
              <p className={`font-serif text-sm ${cfg.text}`}>{cfg.label} right now</p>
              <p className="text-xs text-stone-500 font-light">
                {venue.status?.current_music}
                {venue.status?.dj_active ? ' · DJ' : ''}
                {venue.status?.live_band_active ? ' · Live band' : ''}
              </p>
            </div>
            <div className="ml-auto text-right">
              {venue.status?.line_estimate && <p className="text-xs text-stone-600 font-light">{venue.status.line_estimate} wait</p>}
              {venue.status?.cover_charge != null && (
                venue.status.cover_charge === 0
                  ? <p className="text-xs text-emerald-600 font-light">No cover</p>
                  : <p className="text-xs text-stone-600 font-light">${venue.status.cover_charge} cover</p>
              )}
            </div>
          </div>

          {/* Specials */}
          {activeSpecials.length > 0 && (
            <div className="mb-6">
              <h3 className="font-serif text-stone-700 text-sm mb-3">Tonight's specials</h3>
              <div className="space-y-2">
                {activeSpecials.map(s => (
                  <div key={s.id} className="flex items-start gap-2.5 p-3 bg-amber-50/60 rounded-2xl border border-amber-100/60">
                    <span className="text-amber-600 text-sm mt-0.5">✦</span>
                    <div>
                      <p className="text-sm text-stone-700 font-light">{s.title}</p>
                      {s.description && <p className="text-xs text-stone-400 font-light mt-0.5">{s.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-center gap-2 text-sm text-stone-500 font-light mb-4">
            <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
            <span>{venue.address}</span>
            {venue.distance_m != null && <span className="text-stone-400">· {distanceLabel(venue.distance_m)}</span>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => window.open(`https://maps.apple.com/?daddr=${venue.lat},${venue.lng}`, '_blank')}
              className="flex-1 py-3 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" strokeWidth={1.5} />
              Directions
            </button>
            {venue.instagram && (
              <a href={`https://instagram.com/${venue.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
              </a>
            )}
            {venue.website && (
              <a href={`https://${venue.website.replace(/^https?:\/\//,'')}`} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserMainApp() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const fetchVenues = useCallback(async (lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const params = lat != null ? `?lat=${lat}&lng=${lng}` : '';
      const res = await fetch(`/api/venues${params}`);
      if (res.ok) setVenues(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchVenues(pos.coords.latitude, pos.coords.longitude),
        () => fetchVenues(), // default to Winnipeg
      );
    } else {
      fetchVenues();
    }
  }, [fetchVenues]);

  const filtered = venues.filter(v => {
    if (search) {
      const q = search.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q);
    }
    if (activeFilter === 'All') return true;
    if (activeFilter === 'No Cover') return v.status?.cover_charge === 0;
    if (activeFilter === 'Live Music') return v.status?.live_band_active;
    if (activeFilter === 'Lounge') return v.type.toLowerCase().includes('lounge');
    if (activeFilter === 'Club') return v.type.toLowerCase().includes('club');
    if (activeFilter === 'Rooftop') return v.type.toLowerCase().includes('rooftop');
    if (activeFilter === 'Bar') return v.type.toLowerCase().includes('bar') || v.type.toLowerCase().includes('pub');
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100 relative overflow-hidden">
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 px-4 pt-4 pb-2 pointer-events-none">
        <div className="max-w-lg mx-auto pointer-events-auto">
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex-1 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full border border-stone-200/60 shadow-sm px-4 py-3">
                <Search className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search venues…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none text-sm font-light text-stone-800 placeholder:text-stone-400"
                />
                <button onClick={() => { setSearchOpen(false); setSearch(''); }}>
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full border border-stone-200/60 shadow-sm px-5 py-3">
                  <h1 className="text-lg text-stone-800 tracking-tight italic" style={{ fontFamily: 'Georgia, serif' }}>Ce Soir</h1>
                  <span className="text-stone-300 text-sm font-light">·</span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-light">
                    <MapPin className="w-3 h-3" strokeWidth={1.5} />
                    Winnipeg
                  </div>
                </div>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-11 h-11 bg-white/95 backdrop-blur rounded-full border border-stone-200/60 shadow-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Search className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {!searchOpen && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-light transition-all ${
                    activeFilter === f
                      ? 'bg-stone-800 text-white shadow-sm'
                      : 'bg-white/90 backdrop-blur border border-stone-200/60 text-stone-600 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className={`fixed inset-0 transition-opacity duration-300 ${view === 'map' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <MapView
          venues={filtered}
          selectedId={selectedVenue?.id ?? null}
          onSelect={setSelectedVenue}
        />
      </div>

      {/* Bottom: count + horizontal scroll */}
      {view === 'map' && (
        <div className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto">
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setView('list')}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-stone-800/90 backdrop-blur rounded-full text-white text-xs font-light shadow-lg hover:bg-stone-900 transition-colors"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                {loading ? 'Loading…' : `${filtered.length} venues nearby`}
              </button>
            </div>

            <div className="px-4 pb-6 overflow-x-auto no-scrollbar flex gap-3">
              {filtered.map(v => {
                const energy = v.status?.energy_level ?? 'quiet';
                const cfg = ENERGY_CONFIG[energy];
                const activeSpecials = v.specials.filter(s => s.is_active);
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVenue(v)}
                    className={`flex-shrink-0 w-56 bg-white/95 backdrop-blur rounded-3xl p-4 border shadow-sm transition-all text-left ${
                      selectedVenue?.id === v.id ? 'border-stone-400 shadow' : 'border-stone-200/60 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <EnergyDot energy={energy} size="sm" />
                      <span className={`text-xs font-light ${cfg.text}`}>{cfg.label}</span>
                      {v.distance_m != null && <span className="ml-auto text-xs text-stone-400 font-light">{distanceLabel(v.distance_m)}</span>}
                    </div>
                    <h3 className="font-serif text-stone-800 text-sm mb-0.5 leading-snug">{v.name}</h3>
                    <p className="text-xs text-stone-400 font-light mb-2">{v.type}</p>
                    {activeSpecials.length > 0 && (
                      <p className="text-xs text-amber-700 font-light truncate">✦ {activeSpecials[0].title}</p>
                    )}
                  </button>
                );
              })}
              {!loading && filtered.length === 0 && (
                <p className="text-sm text-stone-400 font-light py-4 px-2">No venues found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="fixed inset-0 z-20 pt-28 overflow-y-auto bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
          <div className="max-w-lg mx-auto px-4 pb-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-stone-500 font-light">{filtered.length} venues in Winnipeg</p>
              <button onClick={() => setView('map')} className="flex items-center gap-1.5 text-xs text-stone-600 font-light underline">
                <MapPin className="w-3 h-3" strokeWidth={1.5} /> Map view
              </button>
            </div>
            <div className="space-y-3">
              {filtered.map(v => <VenueCard key={v.id} venue={v} onClick={() => setSelectedVenue(v)} />)}
              {!loading && filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-stone-400 font-serif text-lg mb-2">No venues found</p>
                  <button onClick={() => { setActiveFilter('All'); setSearch(''); }} className="text-sm text-stone-500 underline font-light">Clear filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Venue detail */}
      {selectedVenue && <VenueDetail venue={selectedVenue} onClose={() => setSelectedVenue(null)} />}
    </div>
  );
}
