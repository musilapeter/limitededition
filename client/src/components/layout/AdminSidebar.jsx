import { NavLink } from 'react-router-dom';

export const AdminSidebar = () => {
  const links = [
    { to: '/admin', label: 'Overview' },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/collections', label: 'Collections' },
    { to: '/admin/inventory', label: 'Inventory' },
  ];

  return (
    <aside className="glass-panel h-fit rounded-2xl p-4">
      <h3 className="mb-4 font-heading text-lg">Control Studio</h3>
      <div className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className="rounded-lg px-3 py-2 hover:bg-white/10">
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
