import { useApp } from '../context/AppContext';
import { TrendingUp, Shield, Star, Users, ChevronRight, Trophy, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { performanceStats } from '../data/mockData';

export default function LandingPage() {
  const { setActiveView } = useApp();

  const totalWins = performanceStats.reduce((s, m) => s + m.wins, 0);
  const totalLosses = performanceStats.reduce((s, m) => s + m.losses, 0);
  const winRate = Math.round((totalWins / (totalWins + totalLosses)) * 100);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* ─── NAVBAR ────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center shadow-lg">
              <Trophy size={18} className="text-yellow-400" />
            </div>
            <div>
              <span className="font-black text-blue-900 text-lg leading-none">ÉTALON</span>
              <br />
              <span className="text-xs font-semibold text-yellow-500 leading-none tracking-widest">PRONOSTICS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#performances" className="hover:text-blue-700 transition-colors">Performances</a>
            <a href="#pronostics" className="hover:text-blue-700 transition-colors">Pronostics</a>
            <a href="#tarifs" className="hover:text-blue-700 transition-colors">Tarifs</a>
            <a href="#parrainage" className="hover:text-blue-700 transition-colors">Parrainage</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('login')}
              className="text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors"
            >
              Connexion
            </button>
            <button
              onClick={() => setActiveView('register')}
              className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
            >
              Inscription
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-[120px]" />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-400 text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-wider">
            <Zap size={12} />
            PLATEFORME N°1 DE PRONOSTICS SPORTIFS
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Pariez avec
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> l'expertise</span>
            <br />des champions
          </h1>

          <p className="text-blue-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Analyses professionnelles, pronostics exclusifs et suivi live. Rejoignez des milliers d'abonnés qui gagnent avec Étalon Pronostics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setActiveView('register')}
              className="group w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 font-black px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-yellow-400/30 transition-all text-lg flex items-center justify-center gap-2"
            >
              Commencer gratuitement
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveView('login')}
              className="w-full sm:w-auto border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-lg flex items-center justify-center gap-2"
            >
              Se connecter
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: `${winRate}%`, label: 'Taux de réussite' },
              { value: '5k+', label: 'Abonnés actifs' },
              { value: '2k+', label: 'Pronostics publiés' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-yellow-400">{s.value}</div>
                <div className="text-blue-300 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LIVE TICKER ───────────────────────────────────── */}
      <div className="bg-blue-800 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {['PSG 2-1 Real Madrid 🔴', 'Man City 0-0 Bayern 🔵', 'Barcelona vs Atletico demain ⚽', 'Arsenal vs Chelsea 21:00 🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Dortmund vs Leipzig Samedi 🇩🇪', 'PSG 2-1 Real Madrid 🔴', 'Man City 0-0 Bayern 🔵'].map((t, i) => (
            <span key={i} className="text-white text-sm font-medium mx-8 opacity-90">
              <span className="text-yellow-400 mr-2">•</span>{t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ──────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="pronostics">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-blue-900 mb-4">Tout ce dont vous avez besoin</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Une plateforme complète pour transformer vos paris sportifs en victoires régulières.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, title: 'Pronostics Experts', desc: 'Analyses approfondies par nos experts avec statistiques, forme des équipes et données historiques.', color: 'from-blue-500 to-blue-700', bg: 'bg-blue-50' },
            { icon: Zap, title: 'Scores en Direct', desc: 'Suivez tous vos matchs en temps réel avec mises à jour instantanées des scores et événements.', color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
            { icon: Shield, title: 'Sécurité Maximale', desc: 'Vos données et paiements sont protégés par des technologies de chiffrement de dernière génération.', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
            { icon: Star, title: 'Premium Exclusif', desc: 'Accédez aux pronostics les plus rentables avec des cotes élevées réservées aux membres premium.', color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-50' },
            { icon: Users, title: 'Système de Parrainage', desc: 'Invitez vos amis et gagnez des récompenses pour chaque membre qui rejoint la plateforme.', color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50' },
            { icon: Trophy, title: 'Historique & Stats', desc: 'Consultez l\'historique complet de nos pronostics avec taux de réussite transparent et vérifiable.', color: 'from-teal-500 to-cyan-600', bg: 'bg-teal-50' },
          ].map(f => (
            <div key={f.title} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className={`bg-gradient-to-br ${f.color} p-2 rounded-lg`}>
                  <f.icon size={20} className="text-white" />
                </div>
              </div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PERFORMANCE ───────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900" id="performances">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Nos Performances 2025</h2>
            <p className="text-blue-300 text-lg">Transparence totale sur nos résultats</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { value: `${winRate}%`, label: 'Taux de réussite global', color: 'text-yellow-400' },
              { value: `${totalWins}`, label: 'Pronostics gagnants', color: 'text-green-400' },
              { value: `${totalLosses}`, label: 'Pronostics perdants', color: 'text-red-400' },
              { value: '2.1x', label: 'ROI moyen mensuel', color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                <div className={`text-4xl font-black ${s.color} mb-2`}>{s.value}</div>
                <div className="text-blue-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Monthly bars */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-bold mb-6">Pronostics par mois</h3>
            <div className="flex items-end gap-3 h-36">
              {performanceStats.map(m => {
                const total = m.wins + m.losses;
                const winH = Math.round((m.wins / total) * 100);
                const lossH = Math.round((m.losses / total) * 100);
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '100px' }}>
                      <div className="w-full bg-red-500/60 rounded-t" style={{ height: `${lossH * 0.4}px` }} />
                      <div className="w-full bg-green-400 rounded-t" style={{ height: `${winH * 0.8}px` }} />
                    </div>
                    <span className="text-blue-300 text-xs">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-green-400" /><span className="text-blue-200 text-xs">Gagnants</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-red-500/60" /><span className="text-blue-200 text-xs">Perdants</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ───────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="tarifs">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-blue-900 mb-4">Tarifs simples & transparents</h2>
          <p className="text-gray-500 text-lg">Choisissez la formule qui vous convient</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: 'Gratuit', price: '0', period: 'toujours', color: 'border-gray-200', badge: '', popular: false,
              features: ['Pronostics gratuits', 'Scores en direct', 'Historique limité', 'Système de parrainage'],
            },
            {
              name: 'Mensuel', price: '5 000', period: 'FCFA / mois', color: 'border-blue-500', badge: '⭐ Populaire', popular: true,
              features: ['Tout le gratuit', 'Pronostics premium', 'Analyses complètes', 'Cotes exclusives', 'Support prioritaire'],
            },
            {
              name: 'Trimestriel', price: '12 000', period: 'FCFA / 3 mois', color: 'border-yellow-400', badge: '💎 Meilleure valeur', popular: false,
              features: ['Tout le mensuel', '-20% de réduction', 'Accès VIP analyste', 'Alertes WhatsApp', 'Historique complet'],
            },
          ].map(plan => (
            <div key={plan.name} className={`relative rounded-3xl border-2 ${plan.color} p-8 ${plan.popular ? 'shadow-2xl shadow-blue-100 scale-105' : 'shadow-sm'}`}>
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap ${plan.popular ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-blue-900'}`}>
                  {plan.badge}
                </div>
              )}
              <h3 className="text-xl font-black text-blue-900 mb-1">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-blue-900">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-blue-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveView('register')}
                className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                  ? 'bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200'
                  : 'border-2 border-blue-200 text-blue-800 hover:bg-blue-50'}`}
              >
                Commencer
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">Paiement via Orange Money & MTN Mobile Money</p>
      </section>

      {/* ─── REFERRAL ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-yellow-50 to-orange-50" id="parrainage">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🤝</div>
          <h2 className="text-4xl font-black text-blue-900 mb-4">Parrainez & Gagnez</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Partagez votre lien unique et gagnez <strong className="text-yellow-600">1 000 FCFA</strong> pour chaque ami qui s'inscrit et souscrit un abonnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            {[
              { step: '1', text: 'Créez votre compte', icon: '📱' },
              { step: '2', text: 'Partagez votre lien', icon: '🔗' },
              { step: '3', text: 'Votre ami s\'abonne', icon: '👥' },
              { step: '4', text: 'Recevez 1 000 FCFA', icon: '💰' },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-orange-100 text-center">
                    <div className="text-xs text-orange-400 font-bold">Étape {s.step}</div>
                    <div className="text-sm font-semibold text-gray-800">{s.text}</div>
                  </div>
                </div>
                {i < 3 && <ChevronRight className="text-orange-300 hidden sm:block shrink-0" size={20} />}
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveView('register')}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 font-black px-10 py-4 rounded-2xl hover:shadow-xl hover:shadow-yellow-200 transition-all text-lg"
          >
            Rejoindre et parrainer 🚀
          </button>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-blue-950 to-blue-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Prêt à gagner avec <span className="text-yellow-400">l'Étalon</span> ?
          </h2>
          <p className="text-blue-300 text-lg mb-10">
            Rejoignez plus de 5 000 parieurs qui font confiance à notre expertise chaque jour.
          </p>
          <button
            onClick={() => setActiveView('register')}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-blue-950 font-black px-12 py-5 rounded-2xl hover:shadow-2xl hover:shadow-yellow-400/30 transition-all text-xl inline-flex items-center gap-3"
          >
            Créer mon compte gratuit <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-blue-950 border-t border-white/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
              <Trophy size={16} className="text-yellow-400" />
            </div>
            <span className="font-black text-white">ÉTALON PRONOSTICS</span>
          </div>
          <p className="text-blue-400 text-sm">© 2025 Étalon Pronostics. Tous droits réservés.</p>
          <div className="flex gap-4 text-blue-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
