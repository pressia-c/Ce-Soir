'use client';
import React, { useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Venue, EnergyLevel } from '@/lib/types';

const WINNIPEG = { longitude: -97.1384, latitude: 49.8951, zoom: 13.5 };

const ENERGY_COLOR: Record<EnergyLevel, string> = {
  packed:   '#f43f5e',  // rose-500
  lively:   '#f59e0b',  // amber-500
  building: '#38bdf8',  // sky-400
  quiet:    '#a8a29e',  // stone-400
};

interface Props {
  venues: Venue[];
  selectedId: string | null;
  onSelect: (venue: Venue) => void;
}

export default function MapView({ venues, selectedId, onSelect }: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

  const handleMarkerClick = useCallback((venue: Venue) => {
    onSelect(venue);
  }, [onSelect]);

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={WINNIPEG}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      reuseMaps
    >
      <NavigationControl position="top-right" showCompass={false} />

      {venues.map(venue => {
        const energy = venue.status?.energy_level ?? 'quiet';
        const color = ENERGY_COLOR[energy];
        const isSelected = venue.id === selectedId;

        return (
          <Marker
            key={venue.id}
            longitude={venue.lng}
            latitude={venue.lat}
            anchor="bottom"
            onClick={e => { e.originalEvent.stopPropagation(); handleMarkerClick(venue); }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md border-2 cursor-pointer transition-all select-none"
              style={{
                background: isSelected ? '#292524' : 'white',
                borderColor: isSelected ? '#292524' : color,
                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              <span
                className="relative flex"
                style={{ width: 8, height: 8 }}
              >
                {(energy === 'packed' || energy === 'lively') && (
                  <span
                    className="absolute inline-flex rounded-full opacity-60 animate-ping"
                    style={{ background: color, width: 8, height: 8 }}
                  />
                )}
                <span
                  className="relative inline-flex rounded-full"
                  style={{ background: color, width: 8, height: 8 }}
                />
              </span>
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: isSelected ? 'white' : '#292524',
                }}
              >
                {venue.name}
              </span>
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}
