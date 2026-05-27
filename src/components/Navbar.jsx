'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import { LogOut, Pencil, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <nav className="sticky top-0 z-50 w-full h-20 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20" />
    );
  }

  const isLoggedIn = !!session;

  const navLinks = [
    { name: 'Home', href: '/', private: false },
    { name: 'All Facilities', href: '/facilities', private: false },
    { name: 'My Bookings', href: '/my-bookings', private: true },
    { name: 'Add Facility', href: '/add-facility', private: true },
    { name: 'Manage My Facilities', href: '/manage-facilities', private: true },
  ];

  const visibleLinks = navLinks.filter(
    link => !link.private || (link.private && isLoggedIn),
  );

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = '/';
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 shadow-lg backdrop-blur-xl">
      <header className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="36"
            height="42"
            viewBox="260 72 160 190"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>
            <path
              d="M340,52 L420,90 L440,180 L340,268 L240,180 L260,90 Z"
              fill="url(#sg)"
            />
            <path
              d="M340,72 L408,105 L426,183 L340,252 L254,183 L272,105 Z"
              fill="url(#ig)"
            />
            <path
              d="M318,132 Q317,115 332,111 Q358,105 368,118 Q375,128 366,138 Q356,146 340,150 Q320,154 313,166 Q306,180 316,192 Q328,205 352,205 Q372,204 378,190 Q382,180 375,172"
              fill="none"
              stroke="white"
              strokeWidth="13"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Sport<span className="text-emerald-400">Nest</span>
          </h1>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-2">
          {visibleLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-white/10 text-emerald-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* DESKTOP PROFILE / LOGIN */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10 transition-all group"
                >
                  <div className="relative">
                    <img
                      className="h-10 w-10 rounded-xl object-cover border border-emerald-400/30 group-hover:border-emerald-400 transition"
                      src={session?.user?.image || '/avatar.png'}
                      alt="User"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-black" />
                  </div>
                  <div className="pr-2 text-left">
                    <p className="text-sm font-bold text-white leading-tight">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400">View Profile</p>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl backdrop-blur-xl">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-bold truncate">
                        {session?.user?.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          router.push('/profile');
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-emerald-400 transition"
                      >
                        <Pencil className="w-4 h-4" /> Edit Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition">
                        <Settings className="w-4 h-4" /> Settings
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B1120]/95 backdrop-blur-xl">
          {isLoggedIn && (
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <div className="relative">
                <img
                  className="h-11 w-11 rounded-xl object-cover border border-emerald-400/30"
                  src={session?.user?.image || '/avatar.png'}
                  alt="User"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-black" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-gray-400 text-xs">{session?.user?.email}</p>
              </div>
            </div>
          )}

          <ul className="px-4 py-3 space-y-1">
            {visibleLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    pathname === link.href
                      ? 'bg-white/10 text-emerald-400'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 pb-4 pt-1 border-t border-white/10 space-y-1">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    router.push('/profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-emerald-400 transition"
                >
                  <Pencil className="w-4 h-4" /> Edit Profile
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
