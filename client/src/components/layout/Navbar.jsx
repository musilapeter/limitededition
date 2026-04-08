import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { Button } from '../common/Button';
import { fetchCart } from '../../services/cartService';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const guestAvatarSrc = '/uploads/avatar-placeholder.png';
  const cartQuery = useQuery({ queryKey: ['cart'], queryFn: fetchCart });

  const avatarLabel = user?.email?.[0]?.toUpperCase() || 'U';
  const itemCount = (cartQuery.data?.items || []).reduce(
    (sum, item) => sum + Number(item?.quantity || 0),
    0,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-vividViolet/25 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-3 items-center md:flex md:flex-wrap md:items-center md:justify-between md:gap-3">
          <button
            type="button"
            aria-label="Toggle menu"
            className="justify-self-start p-2 text-cyberTurquoise md:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>

          <Link to="/" className="justify-self-center font-heading text-2xl text-electricLime md:justify-self-auto">
            LimitedEdition
          </Link>

          <div className="flex items-center justify-self-end gap-2">
            {user ? (
              <>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-vividViolet text-sm font-bold text-white md:hidden">
                  {avatarLabel}
                </span>
                <span className="hidden text-xs text-cyberTurquoise md:inline">{user.email}</span>
                <Button variant="ghost" onClick={logout} className="hidden md:inline-flex">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-vividViolet text-sm font-bold text-white md:hidden"
                >
                  <img
                    src={guestAvatarSrc}
                    alt="Profile avatar placeholder"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </Link>
                <Link to="/login" className="hidden md:inline-flex">
                  <Button variant="secondary">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          className={`mt-3 w-full flex-col items-start gap-4 border-t border-vividViolet/20 pt-3 text-sm text-ink md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:border-0 md:pt-0 ${open ? 'flex' : 'hidden'}`}
        >
          <NavLink to="/collections" onClick={() => setOpen(false)}>Collections</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className="relative pr-6">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-hotPink px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </NavLink>
          {user?.role === 'admin' && <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>}
          {user && (
            <button type="button" onClick={logout} className="text-cyberTurquoise md:hidden">
              Logout
            </button>
          )}
          {!user && (
            <NavLink to="/login" onClick={() => setOpen(false)} className="md:hidden">
              Sign In / Sign Up
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};
