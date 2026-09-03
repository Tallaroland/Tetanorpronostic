import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Plus, Trash2, Edit2, X, Calendar, Save } from 'lucide-react';
import { Match } from '../../../data/mockData';
import Badge from '../../shared/Badge';

type MatchStatus = 'upcoming' | 'live' | 'finished';

const emptyForm: Omit<Match, 'id'> = {
  team_home: '',
  team_away: '',
  logo_home: '⚽',
  logo_away: '⚽',
  date: '',
  heure: '',
  live_status: 'upcoming',
  competition: '',
};

export default function AdminMatches() {
  const { matches, addMatch, deleteMatch, updateMatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Match, 'id'>>(emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateMatch(editId, form);
      setEditId(null);
    } else {
      addMatch(form);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (m: Match) => {
    setForm({ team_home: m.team_home, team_away: m.team_away, logo_home: m.logo_home, logo_away: m.logo_away, date: m.date, heure: m.heure, live_status: m.live_status, competition: m.competition, score_home: m.score_home, score_away: m.score_away });
    setEditId(m.id);
    setShowForm(true);
  };

  const statusVariant = (s: MatchStatus) => s === 'live' ? 'live' : s === 'finished' ? 'info' : 'warning';
  const statusLabel = (s: MatchStatus) => s === 'live' ? 'LIVE' : s === 'finished' ? 'Terminé' : 'À venir';

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Calendar size={24} className="text-blue-600" /> Gestion des matchs
          </h1>
          <p className="text-gray-500 text-sm mt-1">{matches.length} matchs enregistrés</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Ajouter un match
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">{editId ? 'Modifier le match' : 'Ajouter un match'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Équipe domicile</label>
                  <input value={form.team_home} onChange={e => setForm(f => ({ ...f, team_home: e.target.value }))}
                    placeholder="PSG" required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Équipe extérieur</label>
                  <input value={form.team_away} onChange={e => setForm(f => ({ ...f, team_away: e.target.value }))}
                    placeholder="Real Madrid" required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Logo domicile (emoji)</label>
                  <input value={form.logo_home} onChange={e => setForm(f => ({ ...f, logo_home: e.target.value }))}
                    placeholder="🔵🔴"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Logo extérieur (emoji)</label>
                  <input value={form.logo_away} onChange={e => setForm(f => ({ ...f, logo_away: e.target.value }))}
                    placeholder="⚪"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Compétition</label>
                <input value={form.competition} onChange={e => setForm(f => ({ ...f, competition: e.target.value }))}
                  placeholder="UEFA Champions League" required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Heure</label>
                  <input type="time" value={form.heure} onChange={e => setForm(f => ({ ...f, heure: e.target.value }))} required
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Statut</label>
                <select value={form.live_status} onChange={e => setForm(f => ({ ...f, live_status: e.target.value as MatchStatus }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="upcoming">À venir</option>
                  <option value="live">En direct</option>
                  <option value="finished">Terminé</option>
                </select>
              </div>

              {form.live_status !== 'upcoming' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Score domicile</label>
                    <input type="number" min={0} value={form.score_home ?? ''} onChange={e => setForm(f => ({ ...f, score_home: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Score extérieur</label>
                    <input type="number" min={0} value={form.score_away ?? ''} onChange={e => setForm(f => ({ ...f, score_away: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 bg-blue-800 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Save size={16} /> {editId ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Matches table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Match</th>
                <th className="px-4 py-3 text-left">Compétition</th>
                <th className="px-4 py-3 text-left">Date & Heure</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {matches.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{m.logo_home}</span>
                      <div>
                        <div className="text-sm font-bold text-gray-800">{m.team_home} vs {m.team_away}</div>
                        <div className="text-xs text-gray-400">{m.logo_away}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{m.competition}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{m.date} {m.heure}</td>
                  <td className="px-4 py-3 text-sm font-bold text-blue-900">
                    {m.live_status !== 'upcoming' ? `${m.score_home} - ${m.score_away}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge label={statusLabel(m.live_status)} variant={statusVariant(m.live_status)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => startEdit(m)} className="text-blue-500 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => deleteMatch(m.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
