import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import PredictionCard from '../../shared/PredictionCard';
import { TrendingUp, Filter } from 'lucide-react';

type FilterType = 'all' | 'free' | 'premium';

export default function PronosticsView() {
  const { currentUser, predictions, matches } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = predictions.filter(p => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" /> Pronostics
          </h1>
          <p className="text-gray-500 text-sm mt-1">Analyses professionnelles de nos experts</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm w-fit">
        {([
          { id: 'all', label: `Tous (${predictions.length})` },
          { id: 'free', label: `✓ Gratuits (${predictions.filter(p => p.type === 'free').length})` },
          { id: 'premium', label: `⭐ Premium (${predictions.filter(p => p.type === 'premium').length})` },
        ] as { id: FilterType; label: string }[]).map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === f.id
              ? 'bg-blue-800 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Predictions grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(p => {
          const match = matches.find(m => m.id === p.match_id);
          return (
            <PredictionCard
              key={p.id}
              prediction={p}
              match={match}
              isPremiumUser={currentUser?.premium ?? false}
            />
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Filter size={40} className="mx-auto mb-3 opacity-30" />
          <p>Aucun pronostic trouvé</p>
        </div>
      )}
    </div>
  );
}
