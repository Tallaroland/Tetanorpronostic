import { useApp } from '../../../context/AppContext';
import { CreditCard, TrendingUp } from 'lucide-react';

export default function AdminPayments() {
  const { payments, users } = useApp();

  const successPayments = payments.filter(p => p.status === 'success');
  const totalRevenue = successPayments.reduce((s, p) => s + p.amount, 0);
  const orangeRevenue = successPayments.filter(p => p.method === 'orange_money').reduce((s, p) => s + p.amount, 0);
  const mtnRevenue = successPayments.filter(p => p.method === 'mtn_money').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <CreditCard size={24} className="text-green-600" /> Paiements
        </h1>
        <p className="text-gray-500 text-sm mt-1">{payments.length} transactions au total</p>
      </div>

      {/* Revenue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Revenus totaux', value: `${totalRevenue.toLocaleString()} FCFA`, icon: '💰', color: 'text-green-700', bg: 'from-green-50 to-emerald-50', border: 'border-green-200' },
          { label: 'Orange Money', value: `${orangeRevenue.toLocaleString()} FCFA`, icon: '🟠', color: 'text-orange-700', bg: 'from-orange-50 to-yellow-50', border: 'border-orange-200' },
          { label: 'MTN Mobile Money', value: `${mtnRevenue.toLocaleString()} FCFA`, icon: '🟡', color: 'text-yellow-700', bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-200' },
        ].map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Distribution bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-blue-600" /> Distribution des paiements</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-orange-700">🟠 Orange Money</span>
              <span className="font-bold">{totalRevenue > 0 ? Math.round((orangeRevenue / totalRevenue) * 100) : 0}%</span>
            </div>
            <div className="h-2.5 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                style={{ width: `${totalRevenue > 0 ? (orangeRevenue / totalRevenue) * 100 : 0}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-yellow-700">🟡 MTN Mobile Money</span>
              <span className="font-bold">{totalRevenue > 0 ? Math.round((mtnRevenue / totalRevenue) * 100) : 0}%</span>
            </div>
            <div className="h-2.5 bg-yellow-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                style={{ width: `${totalRevenue > 0 ? (mtnRevenue / totalRevenue) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Historique des transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Utilisateur</th>
                <th className="px-4 py-3 text-left">Méthode</th>
                <th className="px-4 py-3 text-left">Plan</th>
                <th className="px-4 py-3 text-left">Montant</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map(p => {
                const user = users.find(u => u.id === p.user_id);
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                          {user?.nom.charAt(0) ?? '?'}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{user?.nom ?? 'Inconnu'}</div>
                          <div className="text-xs text-gray-400">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-sm">
                        <span>{p.method === 'orange_money' ? '🟠' : '🟡'}</span>
                        <span className="text-gray-700">{p.method === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money'}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.plan}</td>
                    <td className="px-4 py-3 text-sm font-black text-gray-900">{p.amount.toLocaleString()} FCFA</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === 'success' ? 'bg-green-100 text-green-700'
                        : p.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {p.status === 'success' ? '✓ Succès' : p.status === 'pending' ? '⏳ En cours' : '✗ Échoué'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
