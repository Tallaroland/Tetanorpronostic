import { useApp } from '../../../context/AppContext';
import { TrendingUp, Radio, Star, Gift, Crown, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import StatCard from '../../shared/StatCard';
import MatchCard from '../../shared/MatchCard';
import PredictionCard from '../../shared/PredictionCard';

export default function DashboardHome() {
  const { currentUser, matches, predictions, setActiveView } = useApp();

  const liveMatches = matches.filter(m => m.live_status === 'live');
  const upcomingMatches = matches.filter(m => m.live_status === 'upcoming').slice(0, 2);
  const recentPredictions = predictions.slice(0, 3);
  const freePredictions = predictions.filter(p => p.type === 'free');
  const premiumPredictions = predictions.filter(p => p.type === 'premium');
  const winCount = predictions.filter(p => p.result === 'win').length;
  const lossCount = predictions.filter(p => p.result === 'loss').length;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-900">
            Bonjour, {currentUser?.nom.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {!currentUser?.premium && (
          <button
            onClick={() => setActiveView('abonnement')}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:shadow-md transition-all"
          >
            <Crown size={14} /> Passer Premium
          </button>
        )}
      </div>

      {/* Premium banner */}
      {!currentUser?.premium && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-5 flex items-center justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute right-8 bottom-0 w-20 h-20 bg-yellow-400/10 rounded-full translate-y-8" />
          <div className="relative">
            <div className="text-yellow-400 text-xs font-bold mb-1 tracking-wider">⭐ OFFRE PREMIUM</div>
            <h3 className="text-white font-bold text-lg">Débloque les pronostics exclusifs</h3>
            <p className="text-blue-300 text-xs mt-1">Accède à +{premiumPredictions.length} analyses premium à partir de 5 000 FCFA/mois</p>
          </div>
          <button
            onClick={() => setActiveView('abonnement')}
            className="relative shrink-0 bg-yellow-400 text-blue-900 font-black text-sm px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors flex items-center gap-1"
          >
            S'abonner <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pronostics gratuits" value={freePredictions.length} icon={TrendingUp}
          color="text-blue-700" bgColor="bg-blue-50" subtitle="Disponibles" />
        <StatCard title="Pronostics premium" value={premiumPredictions.length} icon={Star}
          color="text-yellow-600" bgColor="bg-yellow-50" subtitle={currentUser?.premium ? 'Débloqués' : 'Verrouillés 🔒'} />
        <StatCard title="Matchs en direct" value={liveMatches.length} icon={Radio}
          color="text-red-600" bgColor="bg-red-50" subtitle="En cours maintenant" />
        <StatCard title="Taux de réussite" value="83%" icon={CheckCircle}
          color="text-green-700" bgColor="bg-green-50" subtitle="Ce mois" trend="+5% vs mois dernier" trendUp />
      </div>

      {/* Live + Recent predictions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Live matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <Radio size={18} className="text-red-500 animate-pulse" /> Matchs Live
            </h2>
            <button onClick={() => setActiveView('live')} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {liveMatches.length > 0 ? (
              liveMatches.map(m => <MatchCard key={m.id} match={m} compact />)
            ) : (
              <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-100">
                <Radio size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun match en direct</p>
              </div>
            )}
            {upcomingMatches.map(m => <MatchCard key={m.id} match={m} compact />)}
          </div>
        </div>

        {/* Recent predictions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" /> Derniers pronostics
            </h2>
            <button onClick={() => setActiveView('pronostics')} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentPredictions.map(p => {
              const match = useApp().matches.find(m => m.id === p.match_id);
              return (
                <PredictionCard key={p.id} prediction={p} match={match} isPremiumUser={currentUser?.premium ?? false} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Result history mini */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-blue-900 mb-4">Résultats récents</h2>
        <div className="flex gap-3 flex-wrap">
          {predictions.map(p => (
            <div key={p.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border
              ${p.result === 'win' ? 'bg-green-50 border-green-200 text-green-700'
                : p.result === 'loss' ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              {p.result === 'win' ? <CheckCircle size={12} /> : p.result === 'loss' ? <XCircle size={12} /> : <Clock size={12} />}
              {p.result === 'win' ? 'Gagné' : p.result === 'loss' ? 'Perdu' : 'En cours'}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50">
          <div className="text-center">
            <div className="text-2xl font-black text-green-600">{winCount}</div>
            <div className="text-xs text-gray-500">Gagnés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-red-500">{lossCount}</div>
            <div className="text-xs text-gray-500">Perdus</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-gray-500">{predictions.filter(p => p.result === 'pending').length}</div>
            <div className="text-xs text-gray-500">En attente</div>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
                style={{ width: `${(winCount / (winCount + lossCount || 1)) * 100}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round((winCount / (winCount + lossCount || 1)) * 100)}% de réussite
            </div>
          </div>
        </div>
      </div>

      {/* Referral mini */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-white font-bold">Parrainez et gagnez 🤝</div>
          <div className="text-purple-200 text-xs mt-1">1 000 FCFA par ami parrainé</div>
          <div className="mt-2 bg-white/20 rounded-lg px-3 py-1.5 text-white text-xs font-mono font-bold inline-block">
            etalonpro.com/ref={currentUser?.referral_code}
          </div>
        </div>
        <button
          onClick={() => setActiveView('parrainage')}
          className="shrink-0 bg-white text-purple-600 font-bold text-xs px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors"
        >
          <Gift size={14} className="inline mr-1" /> Parrainer
        </button>
      </div>
    </div>
  );
}
