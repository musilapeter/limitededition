export const stockStateFromVariant = (variant) => {
  if (variant.quantity <= 0) return 'Out of Stock';
  if (variant.quantity <= variant.lowStockThreshold) return 'Low Stock';
  return 'In Stock';
};

export const limitedMessage = (variant) => {
  if (variant.quantity > 0 && variant.quantity <= variant.lowStockThreshold) {
    return `Only ${variant.quantity} left in ${variant.size}`;
  }
  return '';
};
