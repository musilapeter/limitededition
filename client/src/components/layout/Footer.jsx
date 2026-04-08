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
    <footer className="mt-12 border-t border-vividViolet/20 bg-mutedClay/95">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm">
        <div className="grid gap-8 border-b border-vividViolet/20 pb-8 md:grid-cols-2 lg:grid-cols-5">
          <section className="space-y-3 lg:col-span-2">
            <h2 className="font-heading text-2xl text-electricLime">LimitedEdition</h2>
            <p className="max-w-md text-ink/85">
              Placeholder brand story: premium limited-run fashion for expressive, modern wardrobes.
            </p>
            <div className="space-y-1 text-ink/80">
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
                  className="rounded-full border border-vividViolet/35 px-3 py-1 text-xs font-semibold text-vividViolet transition hover:bg-vividViolet/10"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-ink">Shop</h3>
            <nav className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-vividViolet hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-ink">Company</h3>
            <nav className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-vividViolet hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-ink">Support</h3>
            <nav className="flex flex-col gap-2">
              {supportLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-vividViolet hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
          </section>
        </div>

        <div className="grid gap-6 border-b border-vividViolet/20 py-8 md:grid-cols-2">
          <section className="space-y-3">
            <h3 className="font-heading text-base text-ink">Newsletter</h3>
            <p className="text-ink/80">Placeholder text: get launch drops, restock updates, and private sale access.</p>
            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-full border border-vividViolet/35 bg-white px-4 py-2 text-sm text-ink"
              />
              <button
                type="submit"
                className="rounded-full bg-vividViolet px-5 py-2 font-semibold text-white transition hover:brightness-105"
              >
                Subscribe
              </button>
            </form>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-base text-ink">Trust & Payments</h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-cyberTurquoise/40 px-3 py-1 text-xs font-semibold text-cyberTurquoise"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="text-xs text-ink/70">
              Placeholder trust copy: secure checkout, encrypted payments, and verified order processing.
            </p>
          </section>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-ink/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} LimitedEdition. All rights reserved.</p>
          <nav className="flex flex-wrap gap-3">
            {legalLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-vividViolet hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};