import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, TrendingUp, Radio, History,
  Users, Crown, LogOut, Trophy, X, Star
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'pronostics', label: 'Pronostics', icon: TrendingUp },
  { id: 'live', label: 'Scores Live', icon: Radio },
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'parrainage', label: 'Parrainage', icon: Users },
  { id: 'abonnement', label: 'Premium', icon: Crown },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile, onClose }: SidebarProps) {
  const { currentUser, activeView, setActiveView, logout } = useApp();

  const handleNav = (id: string) => {
    setActiveView(id);
    onClose?.();
  };

  return (
    <aside className={`flex flex-col bg-gradient-to-b from-blue-950 to-blue-900 h-full ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center">
            <Trophy size={18} className="text-yellow-400" />
          </div>
          <div>
            <div className="font-black text-white text-sm leading-none">ÉTALON</div>
            <div className="text-yellow-400 text-[10px] font-bold tracking-widest leading-none mt-0.5">PRONOSTICS</div>
          </div>
        </div>
        {mobile && (
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white text-sm">
            {currentUser?.nom.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-semibold text-sm truncate">{currentUser?.nom}</div>
            <div className="flex items-center gap-1">
              {currentUser?.premium ? (
                <span className="text-yellow-400 text-xs flex items-center gap-1 font-semibold">
                  <Star size={10} fill="currentColor" /> Premium
                </span>
              ) : (
                <span className="text-blue-300 text-xs">Compte gratuit</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
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
                  : 'text-blue-300 hover:bg-white/8 hover:text-white'
                }`}
            >
              <item.icon size={18} className={active ? 'text-yellow-400' : ''} />
              {item.label}
              {item.id === 'abonnement' && !currentUser?.premium && (
                <span className="ml-auto text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold">NEW</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <LogOut size={18} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
