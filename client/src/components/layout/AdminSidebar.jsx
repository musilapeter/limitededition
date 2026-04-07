import { NavLink } from 'react-router-dom';

export const AdminSidebar = () => {
  const links = [
    { to: '/admin', label: 'Overview' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/collections', label: 'Collections' },
    { to: '/admin/inventory', label: 'Inventory' },
  ];

  return (
    <aside className="h-fit rounded-2xl border border-black/10 bg-white p-4">
      <h3 className="mb-4 font-heading text-lg">Control Studio</h3>
      <div className="flex gap-2 overflow-x-auto pb-1 text-sm lg:flex-col lg:overflow-visible">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="whitespace-nowrap rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10 lg:border-transparent"
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
