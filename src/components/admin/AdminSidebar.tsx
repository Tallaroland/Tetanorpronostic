import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Calendar, TrendingUp, Users, CreditCard, LogOut, X, Settings } from 'lucide-react';

const navItems = [
  { id: 'admin-dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'admin-matches', label: 'Gérer les matchs', icon: Calendar },
  { id: 'admin-predictions', label: 'Gérer pronostics', icon: TrendingUp },
  { id: 'admin-users', label: 'Utilisateurs', icon: Users },
  { id: 'admin-payments', label: 'Paiements', icon: CreditCard },
];

interface AdminSidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ mobile, onClose }: AdminSidebarProps) {
  const { activeView, setActiveView, logout } = useApp();

  const handleNav = (id: string) => {
    setActiveView(id);
    onClose?.();
  };

  return (
    <aside className={`flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 h-full ${mobile ? 'w-72' : 'w-64'}`}>
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center">
            <Settings size={18} className="text-orange-400" />
          </div>
          <div>
            <div className="font-black text-white text-sm leading-none">ADMIN</div>
            <div className="text-orange-400 text-[10px] font-bold tracking-widest leading-none mt-0.5">ÉTALON PRO</div>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center font-bold text-white text-sm">
            A
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Administrateur</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="text-green-400 text-xs">Actif</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${active
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/8 hover:text-white'
                }`}
            >
              <item.icon size={18} className={active ? 'text-orange-400' : ''} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={18} /> Se déconnecter
        </button>
      </div>
    </aside>
  );
}
