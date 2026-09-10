import { Prediction, Match } from '../../data/mockData';
import { Lock, TrendingUp, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import Badge from './Badge';

interface PredictionCardProps {
  prediction: Prediction;
  match?: Match;
  isPremiumUser: boolean;
}

export default function PredictionCard({ prediction, match, isPremiumUser }: PredictionCardProps) {
  const isLocked = prediction.type === 'premium' && !isPremiumUser;

  const resultIcon = {
    win: <CheckCircle size={16} className="text-green-500" />,
    loss: <XCircle size={16} className="text-red-500" />,
    pending: <Clock size={16} className="text-yellow-500" />,
  };

  return (
    <div className={`relative bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md
      ${isLocked ? 'border-yellow-200' : 'border-gray-100'}`}>
      {/* Top bar */}
      <div className={`h-1 ${prediction.type === 'premium' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gradient-to-r from-green-400 to-emerald-500'}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-1">
            {match && (
              <span className="text-xs font-bold text-blue-900">
                {match.team_home} vs {match.team_away}
              </span>
            )}
            <span className="text-xs text-gray-400">{match?.competition}</span>
          </div>
          <div className="flex items-center gap-2">
            {prediction.result && resultIcon[prediction.result]}
            <Badge
              label={prediction.type === 'premium' ? '⭐ Premium' : '✓ Gratuit'}
              variant={prediction.type === 'premium' ? 'premium' : 'free'}
            />
          </div>
        </div>

        {/* Content */}
        {isLocked ? (
          <div className="relative">
            <div className="blur-sm select-none text-sm text-gray-600 leading-relaxed line-clamp-3">
              {prediction.prediction_text}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
              <Lock size={28} className="text-yellow-500 mb-2" />
              <p className="text-sm font-bold text-gray-700">Contenu Premium</p>
              <p className="text-xs text-gray-500 mt-1">Abonnez-vous pour débloquer</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed">{prediction.prediction_text}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <User size={12} />
            <span>{prediction.analyst}</span>
          </div>
          <div className="flex items-center gap-3">
            {prediction.odds && !isLocked && (
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp size={12} className="text-blue-500" />
                <span className="font-bold text-blue-700">Cote: {prediction.odds}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
              <span className="text-xs font-bold text-blue-700">{prediction.confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
