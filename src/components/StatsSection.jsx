import { Trophy, Users, CalendarCheck, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      title: 'Active Facilities',
      value: '500+',
      icon: Trophy,
    },
    {
      title: 'Happy Athletes',
      value: '10k+',
      icon: Users,
    },
    {
      title: 'Available Slots',
      value: '24/7',
      icon: CalendarCheck,
    },
  ];

  const features = [
    {
      title: 'Trusted Platform',
      desc: 'Thousands of athletes trust us for seamless booking experience.',
    },
    {
      title: 'Instant Booking',
      desc: 'Book your preferred sports facility within seconds.',
    },
    {
      title: 'Secure Payments',
      desc: 'Safe and encrypted payment system for every transaction.',
    },
  ];

  return (
    <section className="py-24 bg-[#030712] text-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black">
            Why Choose <span className="text-emerald-400">SportNest</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We provide a modern sports facility booking system designed for
            athletes, teams, and organizers to make booking fast, easy, and
            reliable.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-emerald-400/40 transition group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <stat.icon className="w-6 h-6 text-emerald-400" />
                </div>

                <p className="text-gray-400 font-medium">{stat.title}</p>
              </div>

              <h3 className="text-5xl font-black text-white group-hover:text-emerald-400 transition">
                {stat.value}
              </h3>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-emerald-500/40 transition"
            >
              <h3 className="text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
