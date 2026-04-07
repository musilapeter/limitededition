import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { StockBadge } from '../common/StockBadge';
import { limitedMessage } from '../../utils/stock';

export const ProductCard = ({ product }) => {
  const highlightVariant = product.variants[0];

  return (
    <Card className="overflow-hidden p-0">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-64 w-full object-cover transition duration-500 hover:scale-105"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl">{product.name}</h3>
          {highlightVariant && <StockBadge variant={highlightVariant} />}
        </div>
        <p className="text-sm text-pearl/75">{product.shortDescription}</p>
        <p className="text-lg font-bold text-sand">${product.price}</p>
        {highlightVariant && limitedMessage(highlightVariant) && (
          <p className="text-xs font-semibold uppercase tracking-wide text-rust">
            {limitedMessage(highlightVariant)}
          </p>
        )}
        <Link to={`/products/${product.slug}`} className="text-sm text-pearl underline underline-offset-4">
          View Piece
        </Link>
      </div>
    </Card>
  );
};
