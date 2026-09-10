import { useApp } from '../../../context/AppContext';
import { Users, Calendar, TrendingUp, CreditCard, Crown } from 'lucide-react';
import StatCard from '../../shared/StatCard';

export default function AdminHome() {
  const { users, matches, predictions, payments } = useApp();

  const premiumUsers = users.filter(u => u.premium).length;
  const totalRevenue = payments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0);
  const liveMatches = matches.filter(m => m.live_status === 'live').length;
  const winPredictions = predictions.filter(p => p.result === 'win').length;
  const totalFinished = predictions.filter(p => p.result !== 'pending').length;
  const winRate = totalFinished > 0 ? Math.round((winPredictions / totalFinished) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Tableau de bord Admin</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenue sur votre espace de gestion</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Utilisateurs" value={users.length} icon={Users} color="text-blue-700" bgColor="bg-blue-50"
          subtitle={`${premiumUsers} premium`} trend="+3 cette semaine" trendUp />
        <StatCard title="Matchs actifs" value={matches.length} icon={Calendar} color="text-green-700" bgColor="bg-green-50"
          subtitle={`${liveMatches} en direct`} />
        <StatCard title="Pronostics" value={predictions.length} icon={TrendingUp} color="text-purple-700" bgColor="bg-purple-50"
          subtitle={`${winRate}% taux réussite`} trend="+5% vs mois dernier" trendUp />
        <StatCard title="Revenus totaux" value={`${totalRevenue.toLocaleString()} F`} icon={CreditCard}
          color="text-orange-700" bgColor="bg-orange-50" subtitle={`${payments.filter(p => p.status === 'success').length} paiements`}
          trend="+12% ce mois" trendUp />
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Latest users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><Users size={16} className="text-blue-600" /> Derniers utilisateurs</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {users.slice(-5).reverse().map(u => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                  {u.nom.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{u.nom}</div>
                  <div className="text-xs text-gray-400 truncate">{u.email}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {u.premium && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Crown size={10} /> Premium
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{u.joinDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest payments */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><CreditCard size={16} className="text-green-600" /> Derniers paiements</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {payments.slice(0, 5).map(p => {
              const user = users.find(u => u.id === p.user_id);
              return (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="text-xl">{p.method === 'orange_money' ? '🟠' : '🟡'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800">{user?.nom ?? 'Inconnu'}</div>
                    <div className="text-xs text-gray-400">{p.plan} • {p.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-gray-900 text-sm">{p.amount.toLocaleString()} F</div>
                    <div className={`text-xs font-bold ${p.status === 'success' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {p.status === 'success' ? '✓ Payé' : '⏳ En cours'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Taux premium', value: `${Math.round((premiumUsers / users.length) * 100)}%`, icon: '👑' },
          { label: 'Pronostics gagnés', value: winPredictions, icon: '✅' },
          { label: 'Matchs ce mois', value: matches.length, icon: '⚽' },
          { label: 'Taux de réussite', value: `${winRate}%`, icon: '📈' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-white font-black text-xl">{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
