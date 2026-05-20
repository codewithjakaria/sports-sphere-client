import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'SportNest',
  description: 'Sports Facility Booking System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white">
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
