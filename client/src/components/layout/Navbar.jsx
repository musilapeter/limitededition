import { useState } from 'react';
import { Link } from 'react-router-dom';

const desktopLinks = [
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
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/" className="hidden items-center gap-2 md:inline-flex" aria-label="L$E home">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/15 bg-white text-xl font-bold text-ink">
                L
              </span>
              <span className="font-heading text-3xl leading-none text-ink">L$E</span>
            </Link>

            <div className="relative shrink-0 md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:border-black/30 hover:text-ink"
                aria-expanded={isMenuOpen}
                aria-label="Open navigation menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
                Menu
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 top-full z-50 mt-3 w-[280px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
                  <div className="border-b border-black/10 bg-[#f8f8f8] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/55">Explore</p>
                    <p className="mt-1 text-sm text-ink/70">Homepage hero links</p>
                  </div>
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

            <form className="flex min-w-0 flex-1" onSubmit={(event) => event.preventDefault()}>
              <input
                type="search"
                placeholder="I'm looking for..."
                className="h-12 min-w-0 w-full rounded-l-md border border-black/20 px-4 text-sm text-ink outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="inline-flex h-12 w-14 items-center justify-center rounded-r-md bg-[#f68b1e] text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </header>
  );
};
