import { Link } from 'react-router-dom';

const quickChannels = [
  {
    title: 'Contact Us With Chat',
    count: 3,
    color: 'from-[#f4f4f4] to-[#ebebeb]',
    icon: (
      <img
        src="https://images.unsplash.com/photo-1541534401786-2077eed87a72?auto=format&fit=crop&w=120&q=80"
        alt="Support"
        className="h-12 w-12 rounded-full object-cover"
      />
    ),
  },
  {
    title: 'Order Query',
    suffix: '(Available 24 hours)',
    count: null,
    color: 'from-[#f5f5f5] to-[#ececec]',
    icon: <div className="h-12 w-12 rounded-full bg-[#ffd6dd]" aria-hidden="true" />,
  },
  {
    title: 'System Message',
    count: 0,
    color: 'from-[#fff4bf] to-[#ffe082]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#b88700]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h4l4-4v12l-4-4H4z" />
        <path d="M17 9a4 4 0 0 1 0 6" />
      </svg>
    ),
  },
  {
    title: 'Order Updates',
    count: 0,
    color: 'from-[#dcffbf] to-[#b6ef78]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#3f8f14]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 3h8" />
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
      </svg>
    ),
  },
  {
    title: 'Promotions',
    count: 0,
    color: 'from-[#ffe2be] to-[#ffc371]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#c96c06]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12.5 12.5 4l7.5 7.5-8.5 8.5H4z" />
        <circle cx="15.6" cy="8.4" r="1" />
      </svg>
    ),
  },
  {
    title: 'Comments',
    count: 0,
    color: 'from-[#ffd1c8] to-[#ff8f7a]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#c53b2f]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      </svg>
    ),
  },
];

const sellerChats = [
  {
    id: 'c1',
    shop: 'Tcee254',
    preview: 'Your package left Nairobi sorting center.',
    at: '2026-04-08 11:29',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'c2',
    shop: 'Brown Home',
    preview: 'Order confirmed. Rider assigned for same-day delivery.',
    at: '2026-04-07 09:54',
    logo: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'c3',
    shop: 'Techbram Technologies',
    preview: 'Tracking code generated. Tap to view route timeline.',
    at: '2026-04-05 07:38',
    logo: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'c4',
    shop: 'Zenlys',
    preview: '[Order message] Item packed and ready for dispatch.',
    at: '2026-04-01 07:35',
    logo: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=120&q=80',
  },
];

const BottomIcon = ({ type, className = 'h-6 w-6' }) => {
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

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
};

export const OrderTrackingPage = () => {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-black/10 bg-[#f2f2f2] pb-20 md:pb-8">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white">
        <div className="grid grid-cols-[40px_1fr_56px] items-center px-4 py-3 md:px-6">
          <Link to="/profile" className="inline-flex h-9 w-9 items-center justify-center text-ink/80" aria-label="Go back">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </Link>
          <h1 className="text-center font-heading text-2xl text-ink">Message Center</h1>
          <button type="button" className="justify-self-end text-sm font-semibold text-ink/80">FAQ</button>
        </div>
      </header>

      <section className="divide-y divide-black/10 bg-[#f7f7f7]">
        {quickChannels.map((item) => (
          <button key={item.title} type="button" className="grid w-full grid-cols-[68px_1fr] items-center px-4 py-3 text-left transition hover:bg-white md:px-6">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color}`}>
              {item.icon}
            </div>
            <div className="text-[19px] leading-tight text-ink">
              <span className="font-semibold">{item.title}</span>{' '}
              {item.suffix && <span className="font-medium text-ink/85">{item.suffix}</span>}
              {Number.isFinite(item.count) && <span className="font-semibold text-[#d62e40]"> ({item.count})</span>}
            </div>
          </button>
        ))}
      </section>

      <section className="mt-3 bg-white">
        <div className="px-4 py-4 md:px-6">
          <h2 className="font-heading text-4xl text-ink md:text-3xl">Chats with Sellers</h2>
        </div>

        <ul className="divide-y divide-black/10">
          {sellerChats.map((chat) => (
            <li key={chat.id}>
              <button type="button" className="grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-[#fafafa] md:px-6">
                <img src={chat.logo} alt={chat.shop} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-3xl font-semibold leading-tight text-ink md:text-xl">{chat.shop}</p>
                  <p className="mt-1 line-clamp-1 text-2xl text-ink/55 md:text-sm">{chat.preview}</p>
                </div>
                <p className="text-xl text-ink/45 md:text-sm">{chat.at}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 px-3 py-2 text-center text-[11px] font-semibold text-ink/75">
          <Link to="/" className="flex flex-col items-center gap-1 py-1">
            <BottomIcon type="home" className="h-5 w-5" />
            Home
          </Link>
          <Link to="/collections" className="flex flex-col items-center gap-1 py-1">
            <BottomIcon type="categories" className="h-5 w-5" />
            Categories
          </Link>
          <Link to="/order-tracking" className="flex flex-col items-center gap-1 py-1 text-[#d62e40]">
            <BottomIcon type="message" className="h-5 w-5" />
            Message
          </Link>
          <Link to="/cart" className="flex flex-col items-center gap-1 py-1">
            <BottomIcon type="cart" className="h-5 w-5" />
            Cart
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 py-1">
            <BottomIcon type="account" className="h-5 w-5" />
            Account
          </Link>
        </div>
      </nav>
    </div>
  );
};
