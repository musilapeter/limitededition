import { cn } from '../../utils/cn';

export const Button = ({ className, children, variant = 'primary', ...props }) => {
  const styles = {
    primary: 'bg-[#2b8a3e] text-white hover:brightness-105',
    secondary: 'bg-[#3f9b54] text-white hover:brightness-95',
    ghost: 'bg-transparent border border-[#2b8a3e]/60 text-[#2b8a3e] hover:bg-[#2b8a3e]/10',
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
