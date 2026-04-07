import { cn } from '../../utils/cn';

export const Button = ({ className, children, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-vividViolet text-white hover:brightness-105',
    secondary: 'bg-cyberTurquoise text-ink hover:brightness-95',
    ghost: 'bg-transparent border border-cyberTurquoise/50 text-cyberTurquoise hover:bg-cyberTurquoise/10',
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
