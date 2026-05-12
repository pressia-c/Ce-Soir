import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-stone-50 to-amber-50/20 flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full animate-fadeIn">
        <div className="inline-block mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100/80 to-rose-100/80 flex items-center justify-center shadow-sm border border-stone-200/30 mx-auto">
            <span className="text-3xl">✨</span>
          </div>
        </div>
        <h1
          className="text-6xl mb-2 text-stone-800 tracking-tight italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Ce Soir
        </h1>
        <p className="text-stone-400 font-light mb-16 tracking-wide">Tonight's energy</p>

        <div className="space-y-3">
          <Link
            href="/onboard"
            className="block w-full py-4 bg-stone-800 hover:bg-stone-900 rounded-full text-white text-center shadow-sm hover:shadow transition-all"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            I'm going out tonight
          </Link>
          <Link
            href="/business"
            className="block w-full py-4 bg-white/80 border border-stone-200/60 hover:border-stone-300 hover:bg-white rounded-full text-stone-700 text-center transition-all"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            I manage a venue
          </Link>
        </div>

        <p className="text-xs text-stone-400 mt-10 font-light">
          New York · Available in select cities
        </p>
      </div>
    </div>
  );
}
