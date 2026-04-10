import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCart } from '../../services/cartService';
import { useAuthStore } from '../../app/store/authStore';
import { useTheme } from '../../app/theme/ThemeProvider';

const desktopLinks = [
  { label: 'Homepage', to: '/' },
  { label: "What's New", to: '/hero/whats-new' },
  { label: 'Flash Sale', to: '/hero/flash-sale' },
  { label: 'Women Clothing', to: '/hero/category/women-clothing' },
  { label: 'Men Clothing', to: '/hero/category/men-clothing' },
  { label: 'Unisex Clothing', to: '/hero/category/unisex-clothing' },
  { label: 'Outerwear', to: '/hero/category/outerwear' },
  { label: 'Tops', to: '/hero/category/tops' },
  { label: 'Bottoms', to: '/hero/category/bottoms' },
  { label: 'Dresses', to: '/hero/category/dresses' },
  { label: 'Sportswear', to: '/hero/category/sportswear' },
  { label: 'Kids Clothing', to: '/hero/category/kids-clothing' },
  { label: 'Shoes', to: '/hero/category/shoes' },
  { label: 'Sneakers', to: '/hero/category/sneakers' },
  { label: 'Formal Shoes', to: '/hero/category/formal-shoes' },
  { label: 'Boots', to: '/hero/category/boots' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, isSystem, toggleTheme, setMode } = useTheme();
  const user = useAuthStore((state) => state.user);
  const cartQuery = useQuery({ queryKey: ['cart'], queryFn: fetchCart });
  const cartItemCount = (cartQuery.data?.items || []).reduce(
    (sum, item) => sum + Number(item?.quantity || 0),
    0,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <div className="bg-[#ececef]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-ink/80">
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Seller Center</a>
            <a href="#" className="hover:text-ink">Download App</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">Help Center</a>
            <button type="button" className="inline-flex items-center gap-1 hover:text-ink">
              Kenya
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5.25 7.5 10 12.25 14.75 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center justify-between md:hidden">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center text-ink transition hover:text-[#2b8a3e]"
                  aria-expanded={isMenuOpen}
                  aria-label="Open navigation menu"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute left-0 top-full z-50 mt-3 w-[280px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
                    <div className="grid max-h-[70vh] gap-1 overflow-y-auto py-2">
                      {desktopLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className="px-4 py-3 text-sm font-medium text-ink transition hover:bg-[#fafafa] hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  to="/cart"
                  className="relative inline-flex h-10 w-10 items-center justify-center text-ink transition hover:text-[#2b8a3e]"
                  aria-label={`Open cart${cartItemCount ? ` with ${cartItemCount} items` : ''}`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="19" r="1.5" />
                    <circle cx="18" cy="19" r="1.5" />
                    <path d="M3 4h2l2.5 11h11l2-8H7" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-hotPink px-1 py-0.5 text-[10px] font-bold leading-none text-white">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to={user ? '/profile' : '/login'}
                  className="inline-flex h-10 w-10 items-center justify-center text-ink transition hover:text-[#2b8a3e]"
                  aria-label={user ? 'Open profile page' : 'Sign in'}
                  title={user ? 'Profile' : 'Sign In'}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() => setMode('system')}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isSystem ? 'border-[#2b8a3e] text-[#2b8a3e]' : 'border-black/10 text-ink hover:border-black/20 hover:text-[#2b8a3e]'
                  }`}
                  aria-label="Follow device theme"
                  title="Use device settings"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="5" width="16" height="11" rx="2" />
                    <path d="M8 20h8" />
                    <path d="M12 16v4" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition hover:border-black/20 hover:text-[#2b8a3e]"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  title={isDark ? 'Light mode' : 'Dark mode'}
                >
                  {isDark ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 3v2.5" />
                      <path d="M12 18.5V21" />
                      <path d="M4.2 4.2l1.8 1.8" />
                      <path d="M18 18l1.8 1.8" />
                      <path d="M3 12h2.5" />
                      <path d="M18.5 12H21" />
                      <path d="M4.2 19.8 6 18" />
                      <path d="M18 6l1.8-1.8" />
                      <circle cx="12" cy="12" r="4.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Link to="/" className="hidden items-center gap-2 md:inline-flex" aria-label="L$E home">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/15 bg-white text-xl font-bold text-ink">
                L
              </span>
              <span className="font-heading text-3xl leading-none text-ink">L$E</span>
            </Link>

            <form className="-mt-1 flex min-w-0 flex-1 md:mt-0" onSubmit={(event) => event.preventDefault()}>
              <input
                type="search"
                placeholder="I'm looking for..."
                className="h-12 min-w-0 w-full rounded-l-md border border-black/20 px-4 text-sm text-ink outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="inline-flex h-12 w-14 items-center justify-center rounded-r-md bg-[#2b8a3e] text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>

            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/cart"
                className="relative inline-flex h-12 w-12 items-center justify-center text-ink transition hover:text-[#2b8a3e]"
                aria-label={`Open cart${cartItemCount ? ` with ${cartItemCount} items` : ''}`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="19" r="1.5" />
                  <circle cx="18" cy="19" r="1.5" />
                  <path d="M3 4h2l2.5 11h11l2-8H7" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-hotPink px-1.5 py-0.5 text-[11px] font-bold leading-none text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <Link
                to={user ? '/profile' : '/login'}
                className="inline-flex h-12 w-12 items-center justify-center text-ink transition hover:text-[#2b8a3e]"
                aria-label={user ? 'Open profile page' : 'Sign in'}
                title={user ? 'Profile' : 'Sign In'}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={() => setMode('system')}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${
                  isSystem ? 'border-[#2b8a3e] text-[#2b8a3e]' : 'border-black/10 text-ink hover:border-black/20 hover:text-[#2b8a3e]'
                }`}
                aria-label="Follow device theme"
                title="Use device settings"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="5" width="16" height="11" rx="2" />
                  <path d="M8 20h8" />
                  <path d="M12 16v4" />
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition hover:border-black/20 hover:text-[#2b8a3e]"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v2.5" />
                    <path d="M12 18.5V21" />
                    <path d="M4.2 4.2l1.8 1.8" />
                    <path d="M18 18l1.8 1.8" />
                    <path d="M3 12h2.5" />
                    <path d="M18.5 12H21" />
                    <path d="M4.2 19.8 6 18" />
                    <path d="M18 6l1.8-1.8" />
                    <circle cx="12" cy="12" r="4.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
