import { stockStateFromVariant } from '../../utils/stock';

export const StockBadge = ({ variant }) => {
  const state = stockStateFromVariant(variant);

  const stateClass =
    state === 'In Stock'
      ? 'bg-electricLime/20 text-electricLime'
      : state === 'Low Stock'
        ? 'bg-hotPink/20 text-hotPink'
        : 'bg-vividViolet/20 text-vividViolet';

  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stateClass}`}>{state}</span>;
};
