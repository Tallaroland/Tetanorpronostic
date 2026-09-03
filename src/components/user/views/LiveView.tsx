import { useApp } from '../../../context/AppContext';
import MatchCard from '../../shared/MatchCard';
import { Radio, Clock, Trophy } from 'lucide-react';

export default function LiveView() {
  const { matches } = useApp();
  const liveMatches = matches.filter(m => m.live_status === 'live');
  const upcomingMatches = matches.filter(m => m.live_status === 'upcoming');
  const finishedMatches = matches.filter(m => m.live_status === 'finished');

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
          <Radio size={24} className="text-red-500 animate-pulse" /> Scores Live
        </h1>
        <p className="text-gray-500 text-sm mt-1">Suivez vos matchs en temps réel</p>
      </div>

      {/* Live now */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h2 className="font-bold text-blue-900">En direct maintenant</h2>
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">{liveMatches.length}</span>
        </div>
        {liveMatches.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 text-gray-400">
            <Radio size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun match en direct pour le moment</p>
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-yellow-500" />
          <h2 className="font-bold text-blue-900">Prochains matchs</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </div>

      {/* Finished */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-gray-500" />
          <h2 className="font-bold text-blue-900">Terminés</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {finishedMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </div>
    </div>
  );
}
