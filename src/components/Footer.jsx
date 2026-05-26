import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-[#050a07] to-black text-gray-400 border-t border-white/10">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
  
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-5">
            <h1 className="text-3xl font-black text-white">
              Sport<span className="text-emerald-400">Nest</span>
            </h1>
          </Link>

          <p className="max-w-md text-gray-400 leading-relaxed">
            The ultimate destination to book your sports grounds and facilities
            with ease. Experience premium booking services with speed, trust,
            and simplicity.
          </p>

         
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-400 transition"
            >
              <FaFacebookF className="text-white hover:text-emerald-400" />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-400 transition"
            >
              <FaInstagram className="text-white hover:text-emerald-400" />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-400 transition"
            >
              <FaTwitter className="text-white hover:text-emerald-400" />
            </a>
          </div>
        </div>


        <div>
          <h4 className="text-white font-bold mb-5">Quick Links</h4>

          <ul className="space-y-3">
            {[
              { name: 'Home', href: '/' },
              { name: 'All Facilities', href: '/facilities' },
              { name: 'My Bookings', href: '/my-bookings' },
            ].map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-emerald-400 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

   
        <div>
          <h4 className="text-white font-bold mb-5">Contact</h4>

          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-gray-200 transition">
              📧 support@sportnest.com
            </li>
            <li className="hover:text-gray-200 transition">
              📍 Dhaka, Bangladesh
            </li>
            <li className="hover:text-gray-200 transition">⏰ 24/7 Support</li>
          </ul>
        </div>
      </div>

  
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{' '}
            <span className="text-emerald-400 font-semibold">SportNest</span>.
            All rights reserved.
          </p>

          <p className="mt-2 md:mt-0 text-gray-600">
            Built with ❤️ for sports lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
