import { useApp } from '../../../context/AppContext';
import { History, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

export default function HistoriqueView() {
  const { predictions, matches, currentUser } = useApp();

  const wins = predictions.filter(p => p.result === 'win').length;
  const losses = predictions.filter(p => p.result === 'loss').length;
  const pending = predictions.filter(p => p.result === 'pending').length;
  const total = wins + losses;
  const rate = total > 0 ? Math.round((wins / total) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
          <History size={24} className="text-blue-600" /> Historique
        </h1>
        <p className="text-gray-500 text-sm mt-1">Bilan de tous les pronostics</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Gagnés', value: wins, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
          { label: 'Perdus', value: losses, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
          { label: 'En attente', value: pending, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: Clock },
          { label: 'Taux de réussite', value: `${rate}%`, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center`}>
            <s.icon size={24} className={`${s.color} mx-auto mb-2`} />
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-700 text-sm">Performance globale</span>
          <span className="font-black text-blue-700">{rate}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700"
            style={{ width: `${rate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </div>

      {/* All predictions table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-blue-900">Tous les pronostics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Match</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Cote</th>
                <th className="px-4 py-3 text-left">Confiance</th>
                <th className="px-4 py-3 text-left">Résultat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {predictions.map(p => {
                const match = matches.find(m => m.id === p.match_id);
                const isLocked = p.type === 'premium' && !currentUser?.premium;
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-gray-800">
                        {match ? `${match.team_home} vs ${match.team_away}` : '—'}
                      </div>
                      <div className="text-xs text-gray-400">{match?.competition}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.type === 'premium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {p.type === 'premium' ? '⭐ Premium' : '✓ Gratuit'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-blue-700">
                      {isLocked ? '🔒' : (p.odds ? `x${p.odds}` : '—')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.confidence}%` }} />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{p.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.result === 'win' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                          <CheckCircle size={14} /> Gagné
                        </span>
                      ) : p.result === 'loss' ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                          <XCircle size={14} /> Perdu
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                          <Clock size={14} /> En cours
                        </span>
                      )}
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
