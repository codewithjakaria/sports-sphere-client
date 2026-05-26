import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Tahmid Hasan',
      role: 'Regular Striker',
      quote:
        'Absolutely love using SportNest. Booking a slot for our weekend futsal match takes less than a minute now.',
      date: 'May 20, 2026',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    {
      name: 'Arif Rahman',
      role: 'Cricket Club Captain',
      quote:
        'The real-time facility availability tracker is incredibly accurate. No overlapping issues anymore.',
      date: 'May 18, 2026',
      image: 'https://i.pravatar.cc/150?img=32',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Badminton Enthusiast',
      quote:
        'Super clean interface and fast booking system. Managing reservations is now effortless.',
      date: 'May 14, 2026',
      image: 'https://i.pravatar.cc/150?img=47',
    },
  ];

  return (
    <section className="py-24 bg-[#030712] text-white relative overflow-hidden">
      {/* glow background */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black">
            What Players Say About{' '}
            <span className="text-emerald-400">SportNest</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real feedback from athletes who use our platform daily to book
            sports facilities effortlessly.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-emerald-400/40 transition group"
            >
              {/* stars */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              {/* quote */}
              <p className="text-gray-300 italic leading-relaxed mb-6">
                “{t.quote}”
              </p>

              {/* user */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />

                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* date */}
              <p className="text-xs text-gray-500 mt-5">{t.date}</p>

              {/* hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
