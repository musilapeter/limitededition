import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { fetchCart } from '../../services/cartService';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const cartQuery = useQuery({ queryKey: ['cart'], queryFn: fetchCart });

  const itemCount = (cartQuery.data?.items || []).reduce(
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
          <div className="grid gap-3 md:grid-cols-[220px_1fr_auto] md:items-center">
            <Link to="/" className="inline-flex items-center gap-2" aria-label="L$E home">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#e3343a] text-xl font-bold text-white">
                L
              </span>
              <span className="font-heading text-3xl leading-none text-ink">L$E</span>
            </Link>

            <form className="flex w-full" onSubmit={(event) => event.preventDefault()}>
              <input
                type="search"
                placeholder="I'm looking for..."
                className="h-12 w-full rounded-l-md border border-[#e3343a] px-4 text-sm text-ink outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="inline-flex h-12 w-14 items-center justify-center rounded-r-md bg-[#e3343a] text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </form>

            <div className="flex items-center gap-5 text-ink">
              <Link to="/cart" className="relative inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M3 4h2l2.5 11h11l2-8H7" />
                </svg>
                <span className="text-2xl leading-none">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#e3343a] px-1 text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link to={user ? '/admin' : '/login'} className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                <span className="text-xl">{user ? 'My Account' : 'Sign In'}</span>
              </Link>

              {user && (
                <button type="button" onClick={logout} className="text-sm text-vividViolet hover:underline">
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/80">
            <a href="#" className="hover:text-ink">Infinix Note 60 Pro</a>
            <a href="#" className="hover:text-ink">Maybelline Easter Sale</a>
            <a href="#" className="hover:text-ink">Garnier Easter Sale</a>
            <a href="#" className="hover:text-ink">K ELEC X Luckydraw</a>
            <a href="#" className="hover:text-ink">Women Sneakers</a>
          </div>
        </div>
      </div>
    </header>
  );
};
