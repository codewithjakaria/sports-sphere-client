import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'SportNest',
  description: 'Sports Facility Booking System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
