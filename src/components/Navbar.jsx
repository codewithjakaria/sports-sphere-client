'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSession, authClient } from '@/lib/auth-client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();


  const { data: session } = useSession();
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 shadow-lg">
      <header className="flex h-20 items-center justify-between px-6 container mx-auto">
   
        <Link href="/" className="flex items-center gap-3">
          <p className="font-black text-2xl text-white">
            Sport<span className="text-green-400">Nest</span>
          </p>
        </Link>

     
        <ul className="hidden md:flex items-center gap-2">
          {visibleLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${pathname === link.href ? 'text-green-400 bg-white/10' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>


        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
       
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <img
                  className="w-8 h-8 rounded-xl object-cover"
                  src={session.user.image || '/avatar.png'}
                  alt="User"
                />
                <span className="text-sm font-bold text-gray-200 pr-2 hidden md:block">
                  {session.user.name}
                </span>
              </button>

     
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-white/10 rounded-2xl p-2 z-50 shadow-2xl">
                  <div className="px-3 py-2 border-b border-white/5">
                    <p className="text-sm font-bold text-white truncate">
                      {session.user.name}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => window.location.reload(),
                        },
                      })
                    }
                    className="w-full text-left px-3 py-2 mt-1 text-sm font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-2 rounded-xl text-sm shadow-lg hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
