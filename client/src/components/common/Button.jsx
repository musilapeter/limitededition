import { cn } from '../../utils/cn';

export const Button = ({ className, children, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-rust text-pearl hover:opacity-90',
    secondary: 'bg-pearl text-ink hover:bg-sand',
    ghost: 'bg-transparent border border-white/20 text-pearl hover:bg-white/5',
  };

  return (
    <button
      className={cn(
        'rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
