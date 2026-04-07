import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-hero-glow">
      <Navbar />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
};
