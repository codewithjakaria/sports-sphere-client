'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const user = {
    name: 'Jakaria Ahmed',
    email: 'jakaria@example.com',
  
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Facilities', href: '/all-facility' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 shadow-lg shadow-emerald-950/20">
      <header className="flex h-20 items-center justify-between px-6 container mx-auto">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-300 cursor-pointer p-2 rounded-xl hover:bg-white/10 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-xl bg-white/10 p-2 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-green-400/30">
              <Image
                className="w-8 h-8 object-contain"
                src="/assets/logo.png"
                alt="SportNest Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <p className="font-black text-2xl md:text-3xl tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Sport
              </span>
              <span className="text-white">Nest</span>
            </p>
          </Link>
        </div>

        <ul className="hidden items-center gap-2 md:flex list-none m-0 p-0">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 block ${
                    isActive
                      ? 'text-green-400 bg-white/10 border border-white/10 shadow-inner'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer focus:outline-none shadow-md"
              >
                <img
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-green-400/30"
                  src={user.photoUrl}
                  alt={user.name}
                />
                <span className="hidden lg:block text-sm font-bold text-gray-200 pr-1.5">
                  {user.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="font-bold text-white truncate tracking-tight">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-gray-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <ul className="list-none p-1 m-0 flex flex-col gap-0.5">
                    <li>
                      <Link
                        href="/my-bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-green-400 transition"
                      >
                        My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/add-facility"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-green-400 transition"
                      >
                        Add Facility
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/manage-facilities"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-green-400 transition"
                      >
                        Manage My Facilities
                      </Link>
                    </li>
                  </ul>

                  <div className="border-t border-white/5 mt-1 p-1">
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left flex px-3 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-2.5 text-sm shadow-lg shadow-green-500/20 hover:opacity-95 transition cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-white/5 md:hidden bg-slate-900/95 backdrop-blur-2xl w-full shadow-2xl absolute left-0 top-20 z-40">
          <ul className="flex flex-col gap-1 p-4 list-none m-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    pathname === link.href
                      ? 'text-green-400 bg-white/5'
                      : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {isLoggedIn && (
              <>
                <div className="h-px bg-white/5 my-2 mx-2" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-4 py-1">
                  Dashboard
                </p>
                <li>
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5"
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-facility"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5"
                  >
                    Add Facility
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-facilities"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5"
                  >
                    Manage My Facilities
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
