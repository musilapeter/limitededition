import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-vividViolet/20 bg-mutedClay">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink/90">
          LimitedEdition Clothline Studio
          <span className="ml-2 text-electricLime">Curated drops. Limited runs.</span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/collections" className="text-vividViolet underline underline-offset-4">
            Collections
          </Link>
          <Link to="/products" className="text-vividViolet underline underline-offset-4">
            Products
          </Link>
          <Link to="/cart" className="text-vividViolet underline underline-offset-4">
            Cart
          </Link>
          <p className="text-cyberTurquoise">Designed for modern street-luxury expression.</p>
        </div>
      </div>
    </footer>
  );
};