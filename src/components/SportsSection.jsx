const SportsSection = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-white/5 text-white">
      <div className="container mx-auto px-6">
        {/* Popular Sports Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Popular{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Sports
            </span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Find facilities for every sport you love
          </p>
        </div>

        {/* Categories Grid Only */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">⚽</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Football
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">🏸</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Badminton
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">🎾</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Tennis
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">🏊</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Swimming
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">🏀</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Basketball
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-500/10 hover:border-green-500/30">
            <span className="text-4xl mb-3 filter drop-shadow-md">🏏</span>
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Cricket
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsSection;
