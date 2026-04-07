import { cn } from '../../utils/cn';

export const Card = ({ className, children }) => {
  return <div className={cn('glass-panel rounded-2xl p-4', className)}>{children}</div>;
};
