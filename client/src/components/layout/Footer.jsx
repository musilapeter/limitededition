import { Link } from 'react-router-dom';

const shopLinks = [
  { to: '/collections', label: 'Collections' },
  { to: '/products', label: 'All Products' },
  { to: '/cart', label: 'Cart' },
];

const companyLinks = [
  { to: '/', label: 'About Us' },
  { to: '/', label: 'Our Story' },
  { to: '/', label: 'Careers' },
  { to: '/', label: 'Press' },
];

const supportLinks = [
  { to: '/', label: 'Help Center' },
  { to: '/', label: 'Shipping & Delivery' },
  { to: '/', label: 'Returns & Exchanges' },
  { to: '/', label: 'Order Tracking' },
];

const legalLinks = [
  { to: '/', label: 'Privacy Policy' },
  { to: '/', label: 'Terms of Service' },
  { to: '/', label: 'Cookie Policy' },
  { to: '/', label: 'Accessibility' },
];

const socialLinks = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'TikTok' },
  { href: '#', label: 'YouTube' },
  { href: '#', label: 'X' },
];

const paymentMethods = ['M-Pesa', 'Visa', 'Mastercard', 'PayPal'];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t bg-[color:var(--app-surface-strong)]" style={{ borderColor: 'var(--app-border)' }}>
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[color:var(--app-text)]">
        <div className="grid gap-8 border-b pb-8 md:grid-cols-2 lg:grid-cols-5" style={{ borderColor: 'var(--app-border)' }}>
          <section className="space-y-3 lg:col-span-2">
            <h2 className="font-heading text-2xl text-electricLime">LimitedEdition</h2>
            <p className="max-w-md text-[color:var(--app-text-muted)]">
              Placeholder brand story: premium limited-run fashion for expressive, modern wardrobes.
            </p>
            <div className="space-y-1 text-[color:var(--app-text-muted)]">
              <p>Email: hello@limitededition.example</p>
              <p>Phone: +254 700 000 000</p>
              <p>Address: Nairobi, Kenya</p>
              <p>Working Hours: Mon - Sat, 8:00 AM - 8:00 PM</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-full border px-3 py-1 text-xs font-semibold text-[color:var(--app-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--app-text)]"
                  style={{ borderColor: 'var(--app-border-strong)' }}
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-[color:var(--app-text)]">Shop</h3>
            <nav className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-[color:var(--app-text-muted)] hover:underline hover:text-electricLime">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-[color:var(--app-text)]">Company</h3>
            <nav className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-[color:var(--app-text-muted)] hover:underline hover:text-electricLime">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-[color:var(--app-text)]">Support</h3>
            <nav className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-[color:var(--app-text-muted)] hover:underline hover:text-electricLime">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>
        </div>

        <div className="grid gap-6 border-b py-8 md:grid-cols-2" style={{ borderColor: 'var(--app-border)' }}>
          <section className="space-y-3">
            <h3 className="font-heading text-base text-[color:var(--app-text)]">Newsletter</h3>
            <p className="text-[color:var(--app-text-muted)]">Placeholder text: get launch drops, restock updates, and private sale access.</p>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border bg-[color:var(--app-surface)] px-4 py-2 text-sm text-[color:var(--app-text)]"
                style={{ borderColor: 'var(--app-border-strong)' }}
              />
              <button
                type="submit"
                className="rounded-full bg-electricLime px-5 py-2 font-semibold text-white transition hover:brightness-105"
              >
                Subscribe
              </button>
            </form>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-[color:var(--app-text)]">Trust & Payments</h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border px-3 py-1 text-xs font-semibold text-cyberTurquoise"
                  style={{ borderColor: 'var(--app-border-strong)' }}
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-xs text-[color:var(--app-text-soft)]">
              Placeholder trust copy: secure checkout, encrypted payments, and verified order processing.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-[color:var(--app-text-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} LimitedEdition. All rights reserved.</p>
          <nav className="flex flex-wrap gap-3">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-electricLime hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};