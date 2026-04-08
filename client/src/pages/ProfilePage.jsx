import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../app/store/authStore';
import { fetchProducts } from '../services/productService';
import { getWalletBalance } from '../services/walletService';
import { formatKsh } from '../utils/currency';

const topActions = [
  { label: 'My Wishlist', icon: 'heart' },
  { label: 'Followed Store', icon: 'shop' },
  { label: 'Recently Viewed', icon: 'clock' },
];

const orderActions = [
  { label: 'Unpaid', icon: 'wallet' },
  { label: 'To be Shipped', icon: 'gift' },
  { label: 'Shipped', icon: 'truck' },
  { label: 'To be Reviewed', icon: 'store' },
  { label: 'Return Refund', icon: 'refund' },
];

const serviceActions = [
  { label: 'Address', icon: 'pin', href: '#' },
  { label: 'Settings', icon: 'settings', href: '#' },
  { label: 'Customer Service', icon: 'headset', href: '#' },
];

const Icon = ({ type, className = 'h-6 w-6' }) => {
  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.9l-1.2-1.3a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
      </svg>
    );
  }

  if (type === 'shop') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h16l-1.4 9H5.4L4 10Z" />
        <path d="M8 10V7.8A3.8 3.8 0 0 1 11.8 4h.4A3.8 3.8 0 0 1 16 7.8V10" />
        <path d="M16.5 18.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === 'wallet') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h15a3 3 0 0 1 3 3v7H5a2 2 0 0 1-2-2V7Z" />
        <path d="M3 7a3 3 0 0 1 3-3h10" />
        <circle cx="16.5" cy="12.2" r="1.2" />
      </svg>
    );
  }

  if (type === 'gift') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 11h16v9H4z" />
        <path d="M2.8 7h18.4v4H2.8z" />
        <path d="M12 7v13" />
        <path d="M9.3 7c-1.5 0-2.8-1.1-2.8-2.5 0-1.3 1-2.3 2.2-2.3C11 2.2 12 7 12 7H9.3Z" />
        <path d="M14.7 7c1.5 0 2.8-1.1 2.8-2.5 0-1.3-1-2.3-2.2-2.3C13 2.2 12 7 12 7h2.7Z" />
      </svg>
    );
  }

  if (type === 'truck') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 7h11v9H2z" />
        <path d="M13 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="18" cy="18" r="1.6" />
      </svg>
    );
  }

  if (type === 'store') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h16v10H4z" />
        <path d="m5 10 1.3-5h11.4L19 10" />
        <path d="M8 15h4v5H8z" />
      </svg>
    );
  }

  if (type === 'refund') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 12a8 8 0 1 1-2.3-5.7" />
        <path d="M20 4v5h-5" />
        <path d="M12 8v8" />
        <path d="M9 10.3h5.1a1.7 1.7 0 1 1 0 3.4H9" />
      </svg>
    );
  }

  if (type === 'pin') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s6-5.6 6-10a6 6 0 1 0-12 0c0 4.4 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    );
  }

  if (type === 'settings') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="m19.5 15 .8 1.4-1.8 3.1-1.5-.3a8.8 8.8 0 0 1-1.2.7l-.4 1.5h-3.6l-.4-1.5a8.8 8.8 0 0 1-1.2-.7l-1.5.3-1.8-3.1.8-1.4a8.2 8.2 0 0 1 0-1.4l-.8-1.4 1.8-3.1 1.5.3a8.8 8.8 0 0 1 1.2-.7l.4-1.5h3.6l.4 1.5a8.8 8.8 0 0 1 1.2.7l1.5-.3 1.8 3.1-.8 1.4a8.2 8.2 0 0 1 0 1.4Z" />
      </svg>
    );
  }

  if (type === 'headset') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 13a8 8 0 1 1 16 0" />
        <rect x="3" y="12" width="4" height="7" rx="1.2" />
        <rect x="17" y="12" width="4" height="7" rx="1.2" />
        <path d="M17 20a4 4 0 0 1-4 4h-1" />
      </svg>
    );
  }

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 11 12 4l9 7" />
        <path d="M6 10v10h12V10" />
      </svg>
    );
  }

  if (type === 'categories') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
    );
  }

  if (type === 'message') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-9l-5 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
      </svg>
    );
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
        <path d="M3 4h2l2.5 11h11l2-8H7" />
      </svg>
    );
  }

  return null;
};

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  const walletBalanceQuery = useQuery({
    queryKey: ['wallet-balance', user?.id],
    queryFn: () => getWalletBalance(user.id),
    enabled: Boolean(user?.id),
  });

  const picksQuery = useQuery({
    queryKey: ['profile-picks'],
    queryFn: () => fetchProducts({ featured: true }),
  });

  const walletValue = formatKsh(walletBalanceQuery.data ?? user?.wallet?.balance ?? 0).replace('.00', '');
  const vouchers = 0;
  const coins = 236;
  const picks = (picksQuery.data || []).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-5 pb-24 md:space-y-6 md:pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-[#ef5566]/40 bg-gradient-to-br from-[#ee3748] via-[#f25162] to-[#f56d76] px-5 py-6 text-white shadow-[0_22px_50px_-30px_rgba(224,34,56,.7)] md:px-8 md:py-8">
        <div className="pointer-events-none absolute -left-10 top-0 h-full w-28 rotate-[18deg] bg-white/8" />
        <div className="pointer-events-none absolute left-20 top-0 h-full w-20 rotate-[18deg] bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=240&q=80"
              alt="Profile"
              className="h-16 w-16 rounded-full border-2 border-white/80 object-cover md:h-20 md:w-20"
            />
            <div>
              <p className="font-heading text-2xl capitalize tracking-wide md:text-3xl">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-white/90 md:text-sm">{user?.email || 'guest@limitededition.com'}</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white"
            aria-label="Open settings"
          >
            <Icon type="settings" className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 text-center md:mt-10 md:gap-4">
          {topActions.map((item) => (
            <button key={item.label} type="button" className="group rounded-2xl px-2 py-2 transition hover:bg-white/10">
              <span className="mx-auto inline-flex h-9 w-9 items-center justify-center text-white/95 transition group-hover:scale-105 md:h-10 md:w-10">
                <Icon type={item.icon} className="h-7 w-7" />
              </span>
              <span className="mt-1 block text-[11px] font-semibold leading-snug text-white md:text-base">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm md:px-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-ink">My Orders</h2>
              <a href="#" className="text-base font-semibold text-ink/60 transition hover:text-ink">View All</a>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center md:gap-3">
              {orderActions.map((item) => (
                <button key={item.label} type="button" className="rounded-xl px-1 py-2 transition hover:bg-[#f9f9f9]">
                  <span className="mx-auto inline-flex h-9 w-9 items-center justify-center text-[#cd3142] md:h-10 md:w-10">
                    <Icon type={item.icon} className="h-7 w-7" />
                  </span>
                  <span className="mt-2 block text-xs font-semibold text-ink md:text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm md:px-5">
            <h2 className="mb-4 font-heading text-2xl text-ink">My Assets</h2>
            <div className="grid grid-cols-3 divide-x divide-black/10">
              <div className="px-2 text-center">
                <p className="text-2xl font-extrabold text-[#cf3040] md:text-3xl">{walletValue}</p>
                <p className="text-lg text-ink/85">Wallet</p>
              </div>
              <div className="px-2 text-center">
                <p className="text-2xl font-extrabold text-[#cf3040] md:text-3xl">{vouchers}</p>
                <p className="text-lg text-ink/85">Vouchers</p>
              </div>
              <div className="px-2 text-center">
                <p className="text-2xl font-extrabold text-[#cf3040] md:text-3xl">{coins}</p>
                <p className="text-lg text-ink/85">Coins</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm md:px-5">
            <h2 className="mb-4 font-heading text-2xl text-ink">My Services</h2>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {serviceActions.map((item) => (
                <a key={item.label} href={item.href} className="rounded-xl px-2 py-3 text-center transition hover:bg-[#f9f9f9]">
                  <span className="mx-auto inline-flex h-10 w-10 items-center justify-center text-[#cd3142]">
                    <Icon type={item.icon} className="h-8 w-8" />
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-ink">{item.label}</span>
                </a>
              ))}

              {user?.role === 'admin' && (
                <Link to="/admin" className="rounded-xl px-2 py-3 text-center transition hover:bg-[#f9f9f9]">
                  <span className="mx-auto inline-flex h-10 w-10 items-center justify-center text-[#cd3142]">
                    <Icon type="categories" className="h-8 w-8" />
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-ink">Admin Panel</span>
                </Link>
              )}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-black/10 bg-white px-4 py-4 shadow-sm md:px-5">
          <h2 className="mb-4 text-center font-heading text-2xl text-ink md:text-left">You May Also Like</h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2">
            {picks.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-[#fafafa] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <p className="line-clamp-2 text-sm font-semibold text-ink">{product.name}</p>
                  <p className="text-sm font-bold text-[#cf3040]">{formatKsh(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 px-3 py-2 text-center text-[11px] font-semibold text-ink/75">
          <Link to="/" className="flex flex-col items-center gap-1 py-1">
            <Icon type="home" className="h-5 w-5" />
            Home
          </Link>
          <Link to="/collections" className="flex flex-col items-center gap-1 py-1">
            <Icon type="categories" className="h-5 w-5" />
            Categories
          </Link>
          <button type="button" className="flex flex-col items-center gap-1 py-1">
            <Icon type="message" className="h-5 w-5" />
            Message
          </button>
          <Link to="/cart" className="flex flex-col items-center gap-1 py-1">
            <Icon type="cart" className="h-5 w-5" />
            Cart
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 py-1 text-[#cf3040]">
            <Icon type="settings" className="h-5 w-5" />
            Account
          </Link>
        </div>
      </nav>
    </div>
  );
};
