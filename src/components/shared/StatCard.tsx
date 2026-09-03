import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, color, bgColor, subtitle, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`${bgColor} p-3 rounded-xl`}>
          <Icon className={color} size={22} />
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
          <span>{trendUp ? '▲' : '▼'}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
