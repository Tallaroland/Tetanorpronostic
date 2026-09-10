import { Match } from '../../data/mockData';
import Badge from './Badge';
import { Clock, Trophy } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export default function MatchCard({ match, compact = false }: MatchCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={12} className="text-yellow-400" />
          <span className="text-white text-xs font-medium truncate">{match.competition}</span>
        </div>
        {match.live_status === 'live' ? (
          <Badge label="LIVE" variant="live" />
        ) : match.live_status === 'finished' ? (
          <Badge label="Terminé" variant="info" />
        ) : (
          <Badge label="À venir" variant="warning" />
        )}
      </div>

      {/* Teams */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="text-3xl">{match.logo_home}</div>
            <span className="text-sm font-bold text-gray-800 text-center leading-tight">{match.team_home}</span>
          </div>

          {/* Score / Time */}
          <div className="flex flex-col items-center gap-1 px-3">
            {match.live_status !== 'upcoming' ? (
              <>
                <div className="text-2xl font-black text-blue-900 tracking-wider">
                  {match.score_home} – {match.score_away}
                </div>
                {match.live_status === 'live' && match.minute && (
                  <span className="text-xs text-red-500 font-bold animate-pulse">{match.minute}'</span>
                )}
              </>
            ) : (
              <>
                <div className="text-xl font-black text-blue-900">VS</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={11} />
                  <span>{match.heure}</span>
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="text-3xl">{match.logo_away}</div>
            <span className="text-sm font-bold text-gray-800 text-center leading-tight">{match.team_away}</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            <span>{match.date} à {match.heure}</span>
          </div>
        )}
      </div>
    </div>
  );
}
