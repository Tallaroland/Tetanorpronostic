import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Plus, Trash2, X, TrendingUp, Save } from 'lucide-react';
import { Prediction } from '../../../data/mockData';

const emptyForm: Omit<Prediction, 'id' | 'created_at'> = {
  match_id: '',
  type: 'free',
  prediction_text: '',
  odds: undefined,
  confidence: 70,
  result: 'pending',
  analyst: 'Etalon Expert',
};

export default function AdminPredictions() {
  const { predictions, matches, addPrediction, deletePrediction } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Prediction, 'id' | 'created_at'>>(emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrediction(form);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <TrendingUp size={24} className="text-purple-600" /> Gestion des pronostics
          </h1>
          <p className="text-gray-500 text-sm mt-1">{predictions.length} pronostics publiés</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-purple-600 transition-colors shadow-sm"
        >
          <Plus size={16} /> Publier un pronostic
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-black text-gray-900">Publier un pronostic</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Match</label>
                <select value={form.match_id} onChange={e => setForm(f => ({ ...f, match_id: e.target.value }))} required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Sélectionner un match</option>
                  {matches.map(m => (
                    <option key={m.id} value={m.id}>{m.team_home} vs {m.team_away} ({m.date})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'free' | 'premium' }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="free">✓ Gratuit</option>
                    <option value="premium">⭐ Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Résultat</label>
                  <select value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value as 'win' | 'loss' | 'pending' }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="pending">⏳ En cours</option>
                    <option value="win">✅ Gagné</option>
                    <option value="loss">❌ Perdu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Analyse / Pronostic</label>
                <textarea value={form.prediction_text} onChange={e => setForm(f => ({ ...f, prediction_text: e.target.value }))}
                  placeholder="Rédigez votre analyse détaillée..." rows={4} required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Cote (optionnel)</label>
                  <input type="number" step="0.01" min="1" value={form.odds ?? ''} onChange={e => setForm(f => ({ ...f, odds: parseFloat(e.target.value) || undefined }))}
                    placeholder="1.85"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Confiance ({form.confidence}%)</label>
                  <input type="range" min="50" max="99" value={form.confidence} onChange={e => setForm(f => ({ ...f, confidence: parseInt(e.target.value) }))}
                    className="w-full mt-2 accent-purple-600" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Analyste</label>
                <input value={form.analyst} onChange={e => setForm(f => ({ ...f, analyst: e.target.value }))}
                  placeholder="Etalon Expert"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-gray-600 font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 bg-purple-700 text-white font-bold py-2.5 rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                  <Save size={16} /> Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Predictions list */}
      <div className="space-y-3">
        {predictions.map(p => {
          const match = matches.find(m => m.id === p.match_id);
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.type === 'premium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {p.type === 'premium' ? '⭐ Premium' : '✓ Gratuit'}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.result === 'win' ? 'bg-green-100 text-green-700' : p.result === 'loss' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {p.result === 'win' ? '✅ Gagné' : p.result === 'loss' ? '❌ Perdu' : '⏳ En cours'}
                    </span>
                    {p.odds && <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Cote: x{p.odds}</span>}
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{p.confidence}% confiance</span>
                  </div>
                  <div className="text-xs font-bold text-blue-900 mb-1">
                    {match ? `${match.team_home} vs ${match.team_away} – ${match.competition}` : 'Match inconnu'}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.prediction_text}</p>
                  <div className="text-xs text-gray-400 mt-2">Par {p.analyst} • {new Date(p.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
                <button onClick={() => deletePrediction(p.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
