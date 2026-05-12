'use client';
import React, { useState } from 'react';
import { Music, Zap, Clock, TrendingUp, Eye, Users, Plus, X, Check, ChevronRight, AlertCircle } from 'lucide-react';

const MUSIC_GENRES = ['Deep House', 'Hip-Hop', 'R&B / Soul', 'Techno', 'Indie', 'Jazz', 'Classic Rock', 'Pop', 'Afrobeats', 'Latin', 'Electronic', 'Other'];

const ENERGY_OPTIONS = [
  { value: 'quiet',    label: 'Quiet',    desc: 'Few people, calm atmosphere',   color: 'border-stone-200 text-stone-500', active: 'border-stone-500 bg-stone-50 text-stone-700' },
  { value: 'building', label: 'Building', desc: 'Filling up, energy rising',      color: 'border-stone-200 text-stone-500', active: 'border-sky-400 bg-sky-50 text-sky-700' },
  { value: 'lively',   label: 'Lively',   desc: 'Good crowd, great vibe',         color: 'border-stone-200 text-stone-500', active: 'border-amber-400 bg-amber-50 text-amber-700' },
  { value: 'packed',   label: 'Packed',   desc: 'At capacity, very busy',         color: 'border-stone-200 text-stone-500', active: 'border-rose-400 bg-rose-50 text-rose-700' },
];

const LINE_OPTIONS = ['No wait', '5 min', '10 min', '15–20 min', '30+ min'];

const MOCK_ANALYTICS = {
  views: { today: 284, change: +18 },
  checkins: { today: 47, change: +6 },
  directions: { today: 31, change: -3 },
  peakHour: '11pm',
};

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${enabled ? 'bg-stone-800' : 'bg-stone-200'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  );
}

function StatCard({ label, value, change, icon: Icon }: { label: string; value: number; change: number; icon: React.FC<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }> }) {
  const positive = change >= 0;
  return (
    <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-stone-200/40 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-xl bg-stone-100/80 flex items-center justify-center">
          <Icon className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
        </div>
        <span className={`text-xs font-light ${positive ? 'text-emerald-600' : 'text-rose-500'}`}>
          {positive ? '+' : ''}{change}
        </span>
      </div>
      <p className="text-2xl font-serif text-stone-800 mb-0.5">{value}</p>
      <p className="text-xs text-stone-500 font-light">{label}</p>
    </div>
  );
}

type Special = { title: string; description: string; startTime: string; endTime: string; active: boolean };
function AddSpecialForm({ onSave, onCancel }: { onSave: (s: Special) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-5 space-y-4">
      <h4 className="font-serif text-stone-800 text-sm">New special</h4>
      <input
        type="text"
        placeholder="e.g. 2-for-1 cocktails"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full px-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 text-sm font-light text-stone-800 placeholder:text-stone-300"
      />
      <input
        type="text"
        placeholder="Details (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full px-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 text-sm font-light text-stone-800 placeholder:text-stone-300"
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-stone-500 font-light mb-1">Start time</label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 text-sm font-light text-stone-800"
          />
        </div>
        <div>
          <label className="block text-xs text-stone-500 font-light mb-1">End time</label>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 text-sm font-light text-stone-800"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => title && onSave({ title, description, startTime, endTime, active: true })}
          disabled={!title}
          className="flex-1 py-2.5 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full text-sm font-serif text-white transition-all disabled:cursor-not-allowed"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2.5 bg-white border border-stone-200 hover:border-stone-300 rounded-full text-sm font-light text-stone-700 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function BusinessDashboard() {
  const [tab, setTab] = useState('live'); // live, specials, analytics
  const [isOpen, setIsOpen] = useState(true);
  const [energy, setEnergy] = useState('lively');
  const [djActive, setDjActive] = useState(true);
  const [liveBandActive, setLiveBandActive] = useState(false);
  const [music, setMusic] = useState('Deep House');
  const [coverCharge, setCoverCharge] = useState(20);
  const [lineEstimate, setLineEstimate] = useState('15–20 min');
  const [saved, setSaved] = useState(false);
  const [showAddSpecial, setShowAddSpecial] = useState(false);
  const [specials, setSpecials] = useState([
    { id: 1, title: '2-for-1 cocktails', description: 'Until 10pm', startTime: '20:00', endTime: '22:00', active: true },
    { id: 2, title: '$8 house wines', description: 'All night', startTime: '18:00', endTime: '02:00', active: true },
    { id: 3, title: 'Free champagne for groups of 4+', description: '', startTime: '21:00', endTime: '23:00', active: false },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddSpecial = (special: Special) => {
    setSpecials(prev => [...prev, { ...special, id: Date.now() }]);
    setShowAddSpecial(false);
  };

  const toggleSpecial = (id: number) => {
    setSpecials(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const removeSpecial = (id: number) => {
    setSpecials(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 tracking-tight mb-1">The Velvet Room</h1>
            <p className="text-sm text-stone-500 font-light">Live Dashboard · Tonight</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Open/Closed Toggle */}
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors ${
              isOpen ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-stone-400'}`} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`text-sm font-light ${isOpen ? 'text-emerald-700' : 'text-stone-500'}`}
              >
                {isOpen ? 'Open' : 'Closed'}
              </button>
            </div>
          </div>
        </div>

        {/* Save Banner */}
        {saved && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 mb-6 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" strokeWidth={2} />
            <p className="text-sm text-emerald-700 font-light">Live status updated — visible to users now</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-7">
          {[
            { id: 'live', label: 'Live Status' },
            { id: 'specials', label: 'Specials' },
            { id: 'analytics', label: 'Analytics' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-light transition-all ${
                tab === t.id
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white/60 border border-stone-200/40 text-stone-600 hover:bg-white hover:border-stone-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* LIVE STATUS TAB */}
        {tab === 'live' && (
          <div className="space-y-5">
            {/* Energy Level */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <h2 className="font-serif text-stone-800 text-lg mb-4">Energy level</h2>
              <div className="grid grid-cols-2 gap-3">
                {ENERGY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setEnergy(opt.value)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      energy === opt.value ? opt.active : `${opt.color} hover:border-stone-300`
                    }`}
                  >
                    <p className="font-serif text-sm mb-0.5">{opt.label}</p>
                    <p className="text-xs font-light opacity-70">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Music & Entertainment */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <h2 className="font-serif text-stone-800 text-lg mb-5">Music & entertainment</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-serif text-stone-500 mb-2">Genre / vibe</label>
                  <div className="flex flex-wrap gap-2">
                    {MUSIC_GENRES.map(g => (
                      <button
                        key={g}
                        onClick={() => setMusic(g)}
                        className={`px-3 py-1.5 rounded-full text-xs font-light transition-all ${
                          music === g
                            ? 'bg-stone-800 text-white'
                            : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-stone-800 text-sm">DJ tonight</p>
                      <p className="text-xs text-stone-500 font-light">Live DJ performing</p>
                    </div>
                    <Toggle enabled={djActive} onChange={setDjActive} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-stone-800 text-sm">Live band</p>
                      <p className="text-xs text-stone-500 font-light">Live music performance</p>
                    </div>
                    <Toggle enabled={liveBandActive} onChange={setLiveBandActive} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover & Line */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <h2 className="font-serif text-stone-800 text-lg mb-5">Door & entry</h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-serif text-stone-500 mb-2">Cover charge</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-light text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={coverCharge}
                      onChange={e => setCoverCharge(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 font-light text-stone-800 text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setCoverCharge(0)}
                    className="text-xs text-stone-400 hover:text-stone-600 font-light mt-1.5"
                  >
                    Set to free
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-serif text-stone-500 mb-2">Line estimate</label>
                  <select
                    value={lineEstimate}
                    onChange={e => setLineEstimate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-stone-200/60 rounded-xl focus:outline-none focus:border-stone-400 font-light text-stone-800 text-sm"
                  >
                    {LINE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white shadow-sm hover:shadow transition-all text-lg"
            >
              Update live status
            </button>

            {/* Preview */}
            <div className="bg-white/40 backdrop-blur rounded-2xl p-4 border border-stone-200/40">
              <p className="text-xs text-stone-400 font-light mb-3 font-serif">User preview</p>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  energy === 'packed' ? 'bg-rose-100' : energy === 'lively' ? 'bg-amber-100' : energy === 'building' ? 'bg-sky-100' : 'bg-stone-100'
                }`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    energy === 'packed' ? 'bg-rose-500' : energy === 'lively' ? 'bg-amber-500' : energy === 'building' ? 'bg-sky-400' : 'bg-stone-300'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-serif text-stone-800">The Velvet Room</p>
                  <p className="text-xs text-stone-500 font-light">
                    {ENERGY_OPTIONS.find(e => e.value === energy)?.label} · {music}
                    {djActive ? ' · DJ' : ''}{liveBandActive ? ' · Live band' : ''}
                  </p>
                  <p className="text-xs text-stone-400 font-light mt-0.5">
                    {coverCharge > 0 ? `$${coverCharge} cover` : 'No cover'} · {lineEstimate} wait
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIALS TAB */}
        {tab === 'specials' && (
          <div className="space-y-5">
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-stone-800 text-lg">Tonight's specials</h2>
                <button
                  onClick={() => setShowAddSpecial(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-900 rounded-full text-white text-xs font-light transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add special
                </button>
              </div>

              {showAddSpecial && (
                <div className="mb-5">
                  <AddSpecialForm
                    onSave={handleAddSpecial}
                    onCancel={() => setShowAddSpecial(false)}
                  />
                </div>
              )}

              <div className="space-y-3">
                {specials.map(s => (
                  <div
                    key={s.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                      s.active ? 'bg-amber-50/40 border-amber-200/60' : 'bg-stone-50/40 border-stone-200/40 opacity-60'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`font-serif text-sm ${s.active ? 'text-stone-800' : 'text-stone-500'}`}>{s.title}</p>
                      {s.description && (
                        <p className="text-xs text-stone-500 font-light mt-0.5">{s.description}</p>
                      )}
                      {(s.startTime || s.endTime) && (
                        <p className="text-xs text-stone-400 font-light mt-1">
                          {s.startTime && s.endTime ? `${s.startTime} – ${s.endTime}` : s.startTime || s.endTime}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                      <Toggle enabled={s.active} onChange={() => toggleSpecial(s.id)} />
                      <button
                        onClick={() => removeSpecial(s.id)}
                        className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-stone-500" />
                      </button>
                    </div>
                  </div>
                ))}
                {specials.length === 0 && !showAddSpecial && (
                  <div className="text-center py-10">
                    <p className="text-stone-400 font-light text-sm mb-3">No specials yet</p>
                    <button
                      onClick={() => setShowAddSpecial(true)}
                      className="text-stone-600 hover:text-stone-800 text-sm underline font-light"
                    >
                      Add your first special
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-amber-50/60 border border-amber-200/40 rounded-2xl px-5 py-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-xs text-amber-700 font-light leading-relaxed">
                Active specials appear prominently on your venue card and in the feed. Toggle off to hide without deleting.
              </p>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Profile views" value={MOCK_ANALYTICS.views.today} change={MOCK_ANALYTICS.views.change} icon={Eye} />
              <StatCard label="Check-ins" value={MOCK_ANALYTICS.checkins.today} change={MOCK_ANALYTICS.checkins.change} icon={Users} />
              <StatCard label="Directions" value={MOCK_ANALYTICS.directions.today} change={MOCK_ANALYTICS.directions.change} icon={TrendingUp} />
              <div className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-stone-200/40 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-stone-100/80 flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-serif text-stone-800 mb-0.5">{MOCK_ANALYTICS.peakHour}</p>
                <p className="text-xs text-stone-500 font-light">Peak hour tonight</p>
              </div>
            </div>

            {/* Traffic by hour */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <h2 className="font-serif text-stone-800 text-lg mb-5">Traffic today</h2>
              <div className="flex items-end gap-1.5 h-28">
                {[
                  { hour: '6pm', v: 0.15 },
                  { hour: '7pm', v: 0.25 },
                  { hour: '8pm', v: 0.40 },
                  { hour: '9pm', v: 0.60 },
                  { hour: '10pm', v: 0.75 },
                  { hour: '11pm', v: 1.00 },
                  { hour: '12am', v: 0.90 },
                  { hour: '1am', v: 0.70 },
                  { hour: '2am', v: 0.45 },
                ].map(({ hour, v }) => (
                  <div key={hour} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-lg transition-all ${v >= 0.8 ? 'bg-rose-400' : v >= 0.5 ? 'bg-amber-400' : v >= 0.3 ? 'bg-sky-300' : 'bg-stone-200'}`}
                      style={{ height: `${v * 100}%` }}
                    />
                    <span className="text-[9px] text-stone-400 font-light">{hour}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crowd composition */}
            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-stone-200/40 shadow-sm">
              <h2 className="font-serif text-stone-800 text-lg mb-5">Crowd tonight</h2>
              <div className="space-y-3">
                {[
                  { label: 'Solo', pct: 18 },
                  { label: 'Couples', pct: 31 },
                  { label: 'Groups of 3–5', pct: 37 },
                  { label: 'Large groups', pct: 14 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-600 font-light">{label}</span>
                      <span className="text-stone-500 font-light">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-stone-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-400 font-light mt-4">Based on anonymous check-in data</p>
            </div>

            {/* Promotion CTA */}
            <div className="bg-gradient-to-br from-amber-50/80 to-rose-50/40 border border-amber-200/40 rounded-3xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-stone-800 text-base mb-1">Boost your visibility</h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed max-w-xs">
                    Feature your venue at the top of the map for nearby users tonight.
                  </p>
                </div>
                <Zap className="w-8 h-8 text-amber-500 flex-shrink-0" strokeWidth={1.5} />
              </div>
              <button className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-900 rounded-full text-white text-sm font-light transition-all">
                View boost options
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessDashboard;
