import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StockBadge } from '../common/StockBadge';
import { limitedMessage } from '../../utils/stock';
import { upsertCartItem } from '../../services/cartService';

export const ProductCard = ({ product }) => {
  const highlightVariant = product.variants[0];
  const [isAdding, setIsAdding] = useState(false);
  const [addStatus, setAddStatus] = useState(null); // 'success' | 'error' | null

  const handleAddToCart = async () => {
    if (!product.variants.length) {
      setAddStatus('error');
      return;
    }

    setIsAdding(true);
    try {
      // Create product snapshot for offline support
      const productSnapshot = {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        images: product.images,
      };

      // Add first available variant
      await upsertCartItem(productSnapshot, product.variants[0]._id, 1);
      setAddStatus('success');

      // Clear success message after 2 seconds
      setTimeout(() => setAddStatus(null), 2000);
    } catch (error) {
      console.error('Add to cart error:', error);
      setAddStatus('error');
      setTimeout(() => setAddStatus(null), 2000);
    } finally {
      setIsAdding(false);
    }
  };

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
        <p className="text-sm text-ink/80">{product.shortDescription}</p>
        <p className="text-lg font-bold text-electricLime">${product.price}</p>
        {highlightVariant && limitedMessage(highlightVariant) && (
          <p className="text-xs font-semibold uppercase tracking-wide text-hotPink">
            {limitedMessage(highlightVariant)}
          </p>
        )}

        {/* Status Message */}
        {addStatus === 'success' && (
          <p className="text-xs font-semibold text-green-600">✓ Added to cart</p>
        )}
        {addStatus === 'error' && (
          <p className="text-xs font-semibold text-red-600">✗ Failed to add</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !product.variants.length}
            className="flex-1"
            variant="primary"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
          <Link
            to={`/products/${product.slug}`}
            className="flex-1"
          >
            <Button variant="ghost" className="w-full">
              View
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
