// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// import { useSession, authClient } from '@/lib/auth-client';

// const Navbar = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   const pathname = usePathname();

//   const { data: session, isPending } = useSession();

//   if (isPending) {
//     return (
//       <nav className="sticky top-0 z-50 w-full h-20 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20" />
//     );
//   }

//   const isLoggedIn = !!session;

//   const navLinks = [
//     { name: 'Home', href: '/', private: false },
//     { name: 'All Facilities', href: '/facilities', private: false },
//     { name: 'My Bookings', href: '/my-bookings', private: true },
//     { name: 'Add Facility', href: '/add-facility', private: true },
//     { name: 'Manage My Facilities', href: '/manage-facilities', private: true },
//   ];

//   const visibleLinks = navLinks.filter(
//     link => !link.private || (link.private && isLoggedIn),
//   );

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 shadow-lg backdrop-blur-xl">
//       <header className="container mx-auto flex h-20 items-center justify-between px-6">
//         <Link href="/" className="flex items-center gap-2">
//           <h1 className="text-2xl font-black tracking-tight text-white">
//             Sport<span className="text-green-400">Nest</span>
//           </h1>
//         </Link>

//         <ul className="hidden md:flex items-center gap-2">
//           {visibleLinks.map(link => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                   pathname === link.href
//                     ? 'bg-white/10 text-green-400'
//                     : 'text-gray-300 hover:text-white hover:bg-white/5'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center gap-4">
//           {isLoggedIn ? (
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 hover:bg-white/10 transition-all"
//               >
//                 <img
//                   className="h-9 w-9 rounded-xl object-cover"
//                   src={session?.user?.image || '/avatar.png'}
//                   alt="User"
//                 />

//                 <span className="hidden md:block pr-2 text-sm font-bold text-gray-200">
//                   {session?.user?.name || 'User'}
//                 </span>
//               </button>

//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
//                   <div className="border-b border-white/5 px-4 py-3">
//                     <p className="truncate text-sm font-bold text-white">
//                       {session?.user?.name}
//                     </p>

//                     <p className="truncate text-xs text-gray-400 mt-1">
//                       {session?.user?.email}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() =>
//                       authClient.signOut({
//                         fetchOptions: {
//                           onSuccess: () => {
//                             window.location.href = '/';
//                           },
//                         },
//                       })
//                     }
//                     className="w-full px-4 py-3 text-left text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </header>
//     </nav>
//   );
// };

// export default Navbar;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import { User, Settings, LogOut, Pencil } from 'lucide-react';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 shadow-lg backdrop-blur-xl">
      <header className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-black text-black">
            SN
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Sport<span className="text-emerald-400">Nest</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
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
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              {/* PROFILE BUTTON */}
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

                <div className="hidden md:block pr-2 text-left">
                  <p className="text-sm font-bold text-white leading-tight">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">View Profile</p>
                </div>
              </button>

              {/* DROPDOWN */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl backdrop-blur-xl">
                  {/* USER INFO */}
                  <div className="p-4 border-b border-white/10">
                    <p className="text-white font-bold truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {session?.user?.email}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-emerald-400 transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Profile
                    </button>

                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>

                    <button
                      onClick={() =>
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              window.location.href = '/';
                            },
                          },
                        })
                      }
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
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
      </header>
    </nav>
  );
};

export default Navbar;