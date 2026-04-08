import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SupportRail } from './SupportRail';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-hero-glow">
      <Navbar />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <Outlet />
      </main>
      <SupportRail />
      <Footer />
    </div>
  );
};
