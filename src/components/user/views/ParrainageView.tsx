import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Users, Copy, CheckCircle, Gift, Link } from 'lucide-react';

export default function ParrainageView() {
  const { currentUser, referrals, users } = useApp();
  const [copied, setCopied] = useState(false);

  const myReferrals = referrals.filter(r => r.referrer_id === currentUser?.id);
  const totalReward = myReferrals.filter(r => r.status === 'confirmed').reduce((s, r) => s + r.reward, 0);
  const refLink = `etalonpro.com/ref=${currentUser?.referral_code}`;

  const copy = () => {
    navigator.clipboard.writeText(refLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
          <Users size={24} className="text-purple-600" /> Parrainage
        </h1>
        <p className="text-gray-500 text-sm mt-1">Invitez vos amis et gagnez des récompenses</p>
      </div>

      {/* Hero card */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative">
          <div className="text-5xl mb-3">🤝</div>
          <h2 className="text-2xl font-black mb-1">Parrainez & Gagnez</h2>
          <p className="text-purple-200 text-sm mb-6">
            Gagnez <strong className="text-yellow-300">1 000 FCFA</strong> pour chaque ami qui s'abonne via votre lien.
          </p>

          {/* Referral link */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="text-xs text-purple-200 mb-2 flex items-center gap-1">
              <Link size={12} /> Votre lien de parrainage
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-white font-mono text-sm truncate">{refLink}</code>
              <button
                onClick={copy}
                className="shrink-0 bg-white text-purple-700 font-bold text-xs px-3 py-2 rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-1.5"
              >
                {copied ? <><CheckCircle size={14} /> Copié!</> : <><Copy size={14} /> Copier</>}
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="mt-4 flex items-center gap-3">
            <div className="bg-white/10 rounded-xl px-4 py-2">
              <div className="text-xs text-purple-200">Votre code</div>
              <div className="text-white font-black text-lg font-mono">{currentUser?.referral_code}</div>
            </div>
            <div className="text-purple-200 text-sm">
              Partagez ce code directement avec vos amis lors de leur inscription.
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Amis invités', value: myReferrals.length, icon: '👥', color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Confirmés', value: myReferrals.filter(r => r.status === 'confirmed').length, icon: '✅', color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Gains totaux', value: `${totalReward.toLocaleString()} F`, icon: '💰', color: 'text-yellow-700', bg: 'bg-yellow-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Gift size={18} /> Comment ça marche ?</h2>
        <div className="space-y-4">
          {[
            { step: '1', title: 'Partagez votre lien', desc: 'Envoyez votre lien unique à vos amis via WhatsApp, SMS ou réseaux sociaux.', icon: '🔗' },
            { step: '2', title: 'Votre ami s\'inscrit', desc: 'Il crée son compte en utilisant votre lien ou code de parrainage.', icon: '📱' },
            { step: '3', title: 'Il souscrit un abonnement', desc: 'Lorsqu\'il achète un abonnement premium, vous êtes récompensé.', icon: '💳' },
            { step: '4', title: 'Recevez 1 000 FCFA', desc: 'La récompense est créditée automatiquement sur votre compte.', icon: '💰' },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-xs font-black text-purple-700 shrink-0">
                {s.step}
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{s.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals list */}
      {myReferrals.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-blue-900">Mes parrainages</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {myReferrals.map(r => {
              const friend = users.find(u => u.id === r.referred_id);
              return (
                <div key={r.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-sm font-bold text-purple-700">
                      {friend?.nom.charAt(0) ?? '?'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{friend?.nom ?? 'Inconnu'}</div>
                      <div className="text-xs text-gray-400">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {r.status === 'confirmed' ? '✓ Confirmé' : '⏳ En attente'}
                    </span>
                    <span className="text-sm font-black text-purple-700">+{r.reward.toLocaleString()} F</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {myReferrals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-3">🤝</div>
          <p className="font-semibold text-gray-700">Pas encore de parrainages</p>
          <p className="text-gray-400 text-sm mt-1">Partagez votre lien pour commencer à gagner !</p>
        </div>
      )}
    </div>
  );
}
