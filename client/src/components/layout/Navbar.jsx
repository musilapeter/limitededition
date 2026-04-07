import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { Button } from '../common/Button';

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-heading text-2xl text-pearl">
          LimitedEdition
        </Link>

        <nav className="flex items-center gap-5 text-sm text-pearl/90">
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-xs text-pearl/70 md:inline">{user.email}</span>
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
