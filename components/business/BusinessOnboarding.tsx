'use client';
import React, { useState } from 'react';
import { Building, Mail, Phone, ArrowRight, Check, CreditCard, MapPin, Upload, X, Edit2, Settings as SettingsIcon, Bell, Lock, HelpCircle } from 'lucide-react';

function BusinessApp() {
  const [view, setView] = useState('welcome'); // welcome, signup, venue, subscription, dashboard, settings
  const [settingsTab, setSettingsTab] = useState('subscription'); // subscription, payment, notifications, account
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    venueName: '',
    venueType: '',
    address: '',
    website: '',
    instagram: ''
  });

  // WELCOME SCREEN
  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-4xl mx-auto px-8 py-20">
          <div className="text-center mb-20 animate-fadeIn">
            <div className="inline-block mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100/80 to-rose-100/80 flex items-center justify-center shadow-sm border border-stone-200/30">
                <Building className="w-10 h-10 text-stone-700" strokeWidth={1.5} />
              </div>
            </div>
            
            <h1 className="text-6xl font-serif mb-3 text-stone-800 tracking-tight italic" style={{fontFamily: 'Georgia, serif'}}>
              Ce Soir
            </h1>
            <p className="text-xl text-stone-500 font-light tracking-wide mb-2">
              for Business
            </p>
            <p className="text-stone-400 font-light max-w-md mx-auto leading-relaxed">
              Manage your live presence in the city
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center mb-5 border border-amber-200/30">
                <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Real-time control</h3>
              <p className="text-stone-500 font-light leading-relaxed text-[15px]">
                Update your energy, music, specials instantly—visible to thousands
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/50 flex items-center justify-center mb-5 border border-rose-200/30">
                <svg className="w-6 h-6 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Drive traffic</h3>
              <p className="text-stone-500 font-light leading-relaxed text-[15px]">
                Promote happy hours, events, specials to nearby users
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/50 flex items-center justify-center mb-5 border border-sky-200/30">
                <svg className="w-6 h-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Understand patterns</h3>
              <p className="text-stone-500 font-light leading-relaxed text-[15px]">
                Analytics on traffic, peak hours, crowd composition
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 flex items-center justify-center mb-5 border border-emerald-200/30">
                <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">Simple pricing</h3>
              <p className="text-stone-500 font-light leading-relaxed text-[15px]">
                $49/month for everything. Optional boosts when you need visibility
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setView('signup')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white shadow-sm hover:shadow transition-all"
            >
              <span>Begin</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-stone-400 mt-6 font-light">
              Already have an account? <button onClick={() => setView('settings')} className="text-stone-600 hover:text-stone-800 underline">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // SIGNUP FORM
  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-md mx-auto px-8 py-20">
          <div className="mb-12 animate-fadeIn">
            <button
              onClick={() => setView('welcome')}
              className="text-stone-400 hover:text-stone-600 mb-8 text-sm font-light"
            >
              ← Back
            </button>
            
            <h2 className="text-4xl font-serif text-stone-800 mb-3 tracking-tight">
              Create account
            </h2>
            <p className="text-stone-500 font-light leading-relaxed">
              Let's get your venue on the map
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-serif text-stone-600 mb-2">
                Your name
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-stone-600 mb-2">
                Business email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="email"
                  placeholder="jane@venue.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-serif text-stone-600 mb-2">
                Phone number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-12 pr-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>
            </div>

            <button
              onClick={() => setView('venue')}
              disabled={!formData.ownerName || !formData.email || !formData.phone}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full font-serif text-white shadow-sm hover:shadow transition-all disabled:cursor-not-allowed mt-6"
            >
              Continue
            </button>
          </div>

          <p className="text-xs text-stone-400 text-center mt-8 font-light leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    );
  }

  // VENUE SETUP
  if (view === 'venue') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-2xl mx-auto px-8 py-20">
          <div className="mb-12 animate-fadeIn">
            <button
              onClick={() => setView('signup')}
              className="text-stone-400 hover:text-stone-600 mb-8 text-sm font-light"
            >
              ← Back
            </button>
            
            <h2 className="text-4xl font-serif text-stone-800 mb-3 tracking-tight">
              Your venue
            </h2>
            <p className="text-stone-500 font-light leading-relaxed">
              This appears on your public profile
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-serif text-stone-600 mb-2">
                  Venue name
                </label>
                <input
                  type="text"
                  placeholder="The Velvet Room"
                  value={formData.venueName}
                  onChange={(e) => setFormData({...formData, venueName: e.target.value})}
                  className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>

              <div>
                <label className="block text-sm font-serif text-stone-600 mb-2">
                  Type
                </label>
                <select
                  value={formData.venueType}
                  onChange={(e) => setFormData({...formData, venueType: e.target.value})}
                  className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800"
                >
                  <option value="">Select</option>
                  <option value="bar">Bar</option>
                  <option value="nightclub">Nightclub</option>
                  <option value="cocktail_lounge">Cocktail Lounge</option>
                  <option value="rooftop">Rooftop</option>
                  <option value="pub">Pub</option>
                  <option value="sports_bar">Sports Bar</option>
                  <option value="restaurant_lounge">Restaurant Lounge</option>
                  <option value="live_music">Live Music Venue</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-serif text-stone-600 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="123 Main Street, City, State"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full pl-12 pr-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-serif text-stone-600 mb-2">
                  Website <span className="text-stone-400 font-light text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="venue.com"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>

              <div>
                <label className="block text-sm font-serif text-stone-600 mb-2">
                  Instagram <span className="text-stone-400 font-light text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="@venue"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-serif text-stone-600 mb-2">
                Logo
              </label>
              <div className="border-2 border-dashed border-stone-200/60 rounded-2xl p-10 text-center hover:border-stone-300 transition-colors cursor-pointer bg-white/40">
                <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-sm text-stone-600 font-light mb-1">
                  Upload logo
                </p>
                <p className="text-xs text-stone-400 font-light">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            <button
              onClick={() => setView('subscription')}
              disabled={!formData.venueName || !formData.venueType || !formData.address}
              className="w-full py-4 bg-stone-800 hover:bg-stone-900 disabled:bg-stone-200 disabled:text-stone-400 rounded-full font-serif text-white shadow-sm hover:shadow transition-all disabled:cursor-not-allowed mt-6"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUBSCRIPTION SETUP
  if (view === 'subscription') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-3xl mx-auto px-8 py-20">
          <div className="mb-12 animate-fadeIn">
            <button
              onClick={() => setView('venue')}
              className="text-stone-400 hover:text-stone-600 mb-8 text-sm font-light"
            >
              ← Back
            </button>
            
            <h2 className="text-4xl font-serif text-stone-800 mb-3 tracking-tight">
              Start subscription
            </h2>
            <p className="text-stone-500 font-light leading-relaxed">
              One simple plan. Everything included.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border-2 border-stone-300/60 shadow-sm mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-block px-4 py-1 bg-stone-100/80 rounded-full text-xs font-serif text-stone-700 mb-3">
                  Standard Subscription
                </div>
                <h3 className="text-3xl font-serif text-stone-800 mb-2">
                  Manage your live presence
                </h3>
                <p className="text-stone-500 font-light text-[15px]">
                  Operational + discovery + demand-generation
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-serif text-stone-800 mb-1">$49</div>
                <div className="text-stone-500 font-light text-sm">per month</div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <p className="text-sm font-serif text-stone-600 mb-4">Everything included:</p>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2.5">
                {[
                  'Full venue profile',
                  'Logo & images',
                  'Menu upload',
                  'Links & reservations',
                  'Happy hour management',
                  'Recurring specials',
                  'Event scheduling',
                  'Live music & DJ status',
                  'Cover charge control',
                  'Hours management',
                  'Analytics dashboard',
                  'Promotion access',
                  'Live map presence'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-stone-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm text-stone-600 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
            <h3 className="font-serif text-xl text-stone-800 mb-6">Payment details</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-serif text-stone-600 mb-2">
                  Card number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-serif text-stone-600 mb-2">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-serif text-stone-600 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-5 py-4 bg-white/80 border border-stone-200/60 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors font-light text-stone-800 placeholder:text-stone-300"
                  />
                </div>
              </div>

              <button
                onClick={() => setView('settings')}
                className="w-full py-4 bg-stone-800 hover:bg-stone-900 rounded-full font-serif text-white shadow-sm hover:shadow transition-all mt-6"
              >
                Start subscription
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-400 text-center mt-6 font-light leading-relaxed">
            Cancel anytime. No contracts or commitments.
          </p>
        </div>
      </div>
    );
  }

  // SETTINGS DASHBOARD
  if (view === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20">
        <div className="max-w-5xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100/80 to-rose-100/80 flex items-center justify-center border border-stone-200/30">
                <Building className="w-6 h-6 text-stone-700" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl font-serif text-stone-800 tracking-tight">Ce Soir Business</h1>
                <p className="text-sm text-stone-500 font-light">Settings & Management</p>
              </div>
            </div>

            {/* Settings Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'subscription', label: 'Subscription', icon: CreditCard },
                { id: 'payment', label: 'Payment', icon: CreditCard },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'account', label: 'Account', icon: SettingsIcon }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-light transition-all whitespace-nowrap ${
                    settingsTab === tab.id
                      ? 'bg-stone-800 text-white'
                      : 'bg-white/60 text-stone-600 hover:bg-white border border-stone-200/40'
                  }`}
                >
                  <tab.icon className="w-4 h-4" strokeWidth={1.5} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SUBSCRIPTION TAB */}
          {settingsTab === 'subscription' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-2">Current Plan</h3>
                    <p className="text-stone-500 font-light text-[15px]">
                      Standard Subscription
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-serif text-stone-800 mb-1">$49</div>
                    <div className="text-stone-500 font-light text-sm">per month</div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-6 mb-6">
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-2.5">
                    {[
                      'Full venue profile',
                      'Analytics dashboard',
                      'Recurring specials',
                      'Promotion access',
                      'Live status control',
                      'Unlimited updates'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                        <span className="text-sm text-stone-600 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl border border-stone-200/40">
                  <div>
                    <p className="text-sm font-serif text-stone-700 mb-0.5">Next billing date</p>
                    <p className="text-sm text-stone-500 font-light">June 15, 2026</p>
                  </div>
                  <button className="px-5 py-2.5 bg-white border border-stone-200 hover:border-stone-300 rounded-full text-sm font-light text-stone-700 transition-all">
                    View invoice
                  </button>
                </div>
              </div>

              {/* Cancel Subscription */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <h3 className="text-xl font-serif text-stone-800 mb-3">Cancel subscription</h3>
                <p className="text-stone-500 font-light text-sm mb-6 leading-relaxed">
                  You can cancel anytime. Your account will remain active until the end of your billing period.
                </p>
                <button className="px-6 py-2.5 bg-white border border-stone-300 hover:border-stone-400 rounded-full text-sm font-light text-stone-700 transition-all">
                  Cancel subscription
                </button>
              </div>
            </div>
          )}

          {/* PAYMENT TAB */}
          {settingsTab === 'payment' && (
            <div className="space-y-6">
              {/* Payment Method */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-stone-800">Payment method</h3>
                  <button className="text-sm text-stone-600 hover:text-stone-800 font-light underline">
                    Edit
                  </button>
                </div>

                <div className="flex items-center gap-5 p-5 bg-stone-50/50 border border-stone-200/40 rounded-2xl">
                  <div className="w-14 h-10 bg-gradient-to-br from-stone-700 to-stone-900 rounded-lg flex items-center justify-center font-bold text-white text-xs">
                    VISA
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-stone-800 mb-0.5">•••• •••• •••• 4242</p>
                    <p className="text-sm text-stone-500 font-light">Expires 12/2027</p>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <h3 className="text-2xl font-serif text-stone-800 mb-6">Billing history</h3>
                <div className="space-y-3">
                  {[
                    { date: 'May 15, 2026', amount: 49, status: 'Paid' },
                    { date: 'Apr 15, 2026', amount: 49, status: 'Paid' },
                    { date: 'Mar 15, 2026', amount: 49, status: 'Paid' }
                  ].map((invoice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-stone-50/50 rounded-2xl border border-stone-200/40">
                      <div>
                        <p className="font-serif text-stone-800 text-sm">{invoice.date}</p>
                        <p className="text-xs text-stone-500 font-light">{invoice.status}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-stone-800">${invoice.amount}</span>
                        <button className="text-xs text-stone-600 hover:text-stone-800 underline font-light">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {settingsTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <h3 className="text-2xl font-serif text-stone-800 mb-6">Notification preferences</h3>
                
                <div className="space-y-5">
                  {[
                    { label: 'Email notifications', description: 'Receive updates via email' },
                    { label: 'SMS notifications', description: 'Get text alerts for important events' },
                    { label: 'Weekly reports', description: 'Analytics summary every Monday' },
                    { label: 'Promotion reminders', description: 'When your promotions are about to expire' }
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 bg-stone-50/50 rounded-2xl border border-stone-200/40">
                      <div className="flex-1">
                        <p className="font-serif text-stone-800 text-[15px] mb-0.5">{setting.label}</p>
                        <p className="text-xs text-stone-500 font-light">{setting.description}</p>
                      </div>
                      <button className="w-12 h-6 bg-stone-800 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNT TAB */}
          {settingsTab === 'account' && (
            <div className="space-y-6">
              {/* Account Info */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-stone-800">Account information</h3>
                  <button className="text-sm text-stone-600 hover:text-stone-800 font-light underline">
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Owner name</label>
                    <p className="text-stone-800 font-light">{formData.ownerName || 'Jane Smith'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Email</label>
                    <p className="text-stone-800 font-light">{formData.email || 'jane@venue.com'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Phone</label>
                    <p className="text-stone-800 font-light">{formData.phone || '+1 (555) 000-0000'}</p>
                  </div>
                </div>
              </div>

              {/* Venue Info */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-stone-800">Venue information</h3>
                  <button className="text-sm text-stone-600 hover:text-stone-800 font-light underline">
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Venue name</label>
                    <p className="text-stone-800 font-light">{formData.venueName || 'The Velvet Room'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Type</label>
                    <p className="text-stone-800 font-light capitalize">{formData.venueType || 'Cocktail Lounge'}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-stone-500 mb-1">Address</label>
                    <p className="text-stone-800 font-light">{formData.address || '123 Main Street, City, State'}</p>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white/60 backdrop-blur rounded-3xl p-8 border border-stone-200/40 shadow-sm">
                <h3 className="text-2xl font-serif text-stone-800 mb-6">Security</h3>
                <button className="px-6 py-2.5 bg-white border border-stone-200 hover:border-stone-300 rounded-full text-sm font-light text-stone-700 transition-all flex items-center gap-2">
                  <Lock className="w-4 h-4" strokeWidth={1.5} />
                  Change password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default BusinessApp;