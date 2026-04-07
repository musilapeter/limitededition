import { stockStateFromVariant } from '../../utils/stock';

export const StockBadge = ({ variant }) => {
  const state = stockStateFromVariant(variant);

  const stateClass =
    state === 'In Stock'
      ? 'bg-moss/20 text-moss'
      : state === 'Low Stock'
        ? 'bg-rust/20 text-rust'
        : 'bg-white/15 text-white/70';

  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stateClass}`}>{state}</span>;
};
