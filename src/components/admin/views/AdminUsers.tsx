import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Users, Crown, Search, CheckCircle, XCircle } from 'lucide-react';

export default function AdminUsers() {
  const { users, updateUserPremium } = useApp();
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.nom.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Users size={24} className="text-green-600" /> Utilisateurs
          </h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} comptes · {users.filter(u => u.premium).length} premium</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: users.length, icon: '👥', color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Premium', value: users.filter(u => u.premium).length, icon: '👑', color: 'text-yellow-700', bg: 'bg-yellow-50' },
          { label: 'Admin', value: users.filter(u => u.role === 'admin').length, icon: '🛡️', color: 'text-red-700', bg: 'bg-red-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Utilisateur</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Rôle</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Code parrainage</th>
                <th className="px-4 py-3 text-left">Inscription</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                        {u.nom.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{u.nom}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.premium ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-yellow-700">
                        <Crown size={12} /> Premium
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Gratuit</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-mono">{u.referral_code}</code>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{u.joinDate}</td>
                  <td className="px-4 py-3">
                    {u.role !== 'admin' && (
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateUserPremium(u.id, !u.premium)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1
                            ${u.premium
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                        >
                          {u.premium ? <><XCircle size={13} /> Révoquer</> : <><CheckCircle size={13} /> Activer</>}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
