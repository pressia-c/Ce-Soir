'use client';
import React, { useState, useRef } from 'react';
import { Phone, ArrowRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Step = 'welcome' | 'phone' | 'verify' | 'profile' | 'location';

export default function UserAuthFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('welcome');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setStep('verify');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setLoading(true);
    const token = code.join('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, token }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      // Set session in browser
      if (json.session) {
        await supabase.auth.setSession(json.session);
      }
      setStep('profile');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeInput = (i: number, val: string) => {
    if (val.length > 1) {
      // Handle paste of full code
      const digits = val.replace(/\D/g, '').slice(0, 6).split('');
      const next = [...code];
      digits.forEach((d, idx) => { if (idx < 6) next[idx] = d; });
      setCode(next);
      inputRefs.current[5]?.focus();
      return;
    }
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const goToMap = () => router.push('/map');

  // ── WELCOME ──────────────────────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20 flex flex-col justify-center min-h-screen">
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100/80 to-rose-100/80 flex items-center justify-center shadow-sm border border-stone-200/30">
                <span className="text-3xl">✨</span>
              </div>
            </div>
            <h1 className="text-6xl mb-3 text-stone-800 tracking-tight italic" style={{ fontFamily: 'Georgia, serif' }}>
              Ce Soir
            </h1>
            <p className="text-lg text-stone-500 font-light tracking-wide">Tonight's energy</p>
          </div>

          <div className="space-y-4 mb-16">
            {[
              { icon: '🗺️', title: 'Live city map', desc: 'See where energy flows tonight in Winnipeg' },
              { icon: '🔒', title: 'Fully anonymous', desc: 'No profiles, no tracking — just the vibe' },
              { icon: '⚡', title: 'Real-time updates', desc: 'Specials, music, crowds as they happen' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/60 backdrop-blur rounded-3xl p-5 border border-stone-200/40 shadow-sm flex gap-4 items-start">
                <span className="text-xl mt-0.5">{icon}</span>
                <div>
                  <h3 className="font-serif text-stone-800 mb-0.5 text-[15px]">{title}</h3>
                  <p className="text-sm text-stone-500 font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('phone')}
            className="w-full py-4 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            <span>Begin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToMap}
            className="w-full py-3 text-stone-400 hover:text-stone-600 text-sm font-light transition-colors mt-1"
          >
            Skip — just explore the map
          </button>
          <p className="text-xs text-stone-400 text-center mt-2 font-light">By continuing, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    );
  }

  // ── PHONE ────────────────────────────────────────────────────────────────
  if (step === 'phone') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20 flex flex-col justify-center min-h-screen">
          <div className="mb-12 animate-fadeIn">
            <button onClick={() => setStep('welcome')} className="text-stone-400 hover:text-stone-600 mb-8 text-sm font-light">← Back</button>
            <h2 className="text-4xl text-stone-800 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Your phone</h2>
            <p className="text-stone-500 font-light">We'll text you a code to verify</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="tel"
                placeholder="+1 (204) 000-0000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && phone && handleSendOtp()}
                className="w-full pl-14 pr-5 py-4 bg-white/80 border border-stone-200/60 rounded-full focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
              />
            </div>

            {error && (
              <div className="space-y-3">
                <p className="text-rose-500 text-sm font-light text-center">{error}</p>
                {error.toLowerCase().includes('provider') && (
                  <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 text-xs text-amber-800 font-light leading-relaxed">
                    SMS requires Twilio in Supabase. To set it up: <strong>Supabase → Authentication → Providers → Phone</strong>. Until then, use the bypass below.
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleSendOtp}
              disabled={!phone || loading}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full font-serif text-white shadow-sm transition-all disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send code'}
            </button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 font-light">or</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <button
              onClick={goToMap}
              className="w-full py-4 bg-white/80 border border-stone-200/60 hover:border-stone-300 hover:bg-white rounded-full font-serif text-stone-600 transition-all"
            >
              Explore the map →
            </button>
          </div>

          <p className="text-xs text-stone-400 text-center mt-8 font-light">Your number is private and never shared</p>
        </div>
      </div>
    );
  }

  // ── VERIFY ───────────────────────────────────────────────────────────────
  if (step === 'verify') {
    const codeComplete = code.every(d => d !== '');
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20 flex flex-col justify-center min-h-screen">
          <div className="mb-12 animate-fadeIn">
            <button onClick={() => { setStep('phone'); setCode(['','','','','','']); setError(''); }} className="text-stone-400 hover:text-stone-600 mb-8 text-sm font-light">← Back</button>
            <h2 className="text-4xl text-stone-800 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Enter code</h2>
            <p className="text-stone-500 font-light">Sent to {phone}</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-3 justify-center">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={e => handleCodeInput(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors text-stone-800"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
              ))}
            </div>

            {error && <p className="text-rose-500 text-sm font-light text-center">{error}</p>}

            <button
              onClick={handleVerifyOtp}
              disabled={!codeComplete || loading}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full font-serif text-white shadow-sm transition-all disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying…' : 'Verify'}
            </button>

            <button
              onClick={handleSendOtp}
              className="w-full text-sm text-stone-500 hover:text-stone-700 font-light"
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PROFILE ──────────────────────────────────────────────────────────────
  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20 flex flex-col justify-center min-h-screen">
          <div className="mb-12 animate-fadeIn">
            <h2 className="text-4xl text-stone-800 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>A few details</h2>
            <p className="text-stone-500 font-light">Helps us personalize your experience</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-serif text-stone-600 mb-3">Your age</label>
              <input
                type="number"
                placeholder="21"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-full focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-stone-600 mb-3">Gender <span className="text-stone-400 font-light text-xs">(optional)</span></label>
              <div className="grid grid-cols-3 gap-3">
                {['Man', 'Woman', 'Other'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setGender(opt)}
                    className={`py-3 rounded-full font-light text-sm transition-all ${
                      gender === opt ? 'bg-stone-800 text-white' : 'bg-white/80 border border-stone-200/60 text-stone-600 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={() => setGender('')} className="w-full mt-3 text-sm text-stone-400 hover:text-stone-600 font-light">Prefer not to say</button>
            </div>

            <button
              onClick={() => setStep('location')}
              disabled={!age}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full font-serif text-white shadow-sm transition-all disabled:cursor-not-allowed mt-8"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── LOCATION ─────────────────────────────────────────────────────────────
  if (step === 'location') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20 flex flex-col justify-center min-h-screen">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-50 to-rose-50 rounded-full flex items-center justify-center border border-stone-200/40 shadow-sm">
              <MapPin className="w-10 h-10 text-stone-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl text-stone-800 mb-3 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Enable location</h2>
            <p className="text-stone-500 font-light leading-relaxed max-w-sm mx-auto">To show you nearby venues and live energy in Winnipeg</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(() => goToMap(), () => goToMap());
              }}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white shadow-sm hover:shadow transition-all"
            >
              Enable location
            </button>
            <button onClick={goToMap} className="w-full py-4 bg-white/80 border border-stone-200/60 hover:border-stone-300 hover:bg-white rounded-full font-serif text-stone-700 transition-all">
              Skip for now
            </button>
          </div>

          <div className="mt-8 p-5 bg-white/40 backdrop-blur rounded-3xl border border-stone-200/40">
            <p className="text-xs text-stone-500 leading-relaxed font-light text-center">
              Your location is only used to show nearby venues. It is never shared.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
