import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-vividViolet/25 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-heading text-2xl text-electricLime">
          LimitedEdition
        </Link>

        <button
          type="button"
          className="rounded-lg border border-cyberTurquoise/50 px-3 py-1.5 text-sm text-cyberTurquoise md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav
          className={`w-full flex-col items-center gap-5 text-sm text-ink md:flex md:w-auto md:flex-row ${open ? 'flex' : 'hidden'}`}
        >
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="flex w-full items-center justify-end gap-2 md:w-auto">
          {user ? (
            <>
              <span className="hidden text-xs text-cyberTurquoise md:inline">{user.email}</span>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
