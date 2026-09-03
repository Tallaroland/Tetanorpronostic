interface BadgeProps {
  label: string;
  variant: 'success' | 'error' | 'warning' | 'info' | 'premium' | 'free' | 'live';
  size?: 'sm' | 'md';
}

const variants = {
  success: 'bg-green-100 text-green-700',
  error: 'bg-red-100 text-red-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
  premium: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white',
  free: 'bg-green-100 text-green-700',
  live: 'bg-red-500 text-white animate-pulse',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
};

export default function Badge({ label, variant, size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${variants[variant]} ${sizes[size]}`}>
      {variant === 'live' && <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />}
      {label}
    </span>
  );
}
