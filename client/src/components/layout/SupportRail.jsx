const supportActions = [
  {
    id: 'chat-seller',
    label: 'Chat with Seller',
    shortLabel: 'Seller',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" />
      </svg>
    ),
  },
  {
    id: 'live-chat',
    label: 'Live Chat',
    shortLabel: 'Live',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
  },
  {
    id: 'order-query',
    label: 'Order Query',
    shortLabel: 'Orders',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
];

export const SupportRail = () => {
  return (
    <aside className="fixed bottom-4 right-3 z-50 hidden flex-col gap-2 lg:flex">
      {supportActions.map((action) => (
        <a
          key={action.id}
          href={action.href}
          aria-label={action.label}
          className="group flex items-center justify-end gap-2"
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow ring-1 ring-black/10 transition group-hover:text-vividViolet">
            {action.shortLabel}
          </span>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-vividViolet shadow ring-1 ring-black/10 transition group-hover:bg-vividViolet group-hover:text-white">
            {action.icon}
          </span>
        </a>
      ))}
    </aside>
  );
};
