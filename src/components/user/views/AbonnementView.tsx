import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Crown, CheckCircle, Smartphone, X, CreditCard, Shield } from 'lucide-react';

const plans = [
  {
    id: 'mensuel',
    name: 'Mensuel',
    price: 5000,
    period: 'mois',
    badge: '',
    popular: false,
    color: 'border-gray-200',
    features: ['Tous les pronostics premium', 'Analyses complètes', 'Cotes exclusives', 'Support prioritaire'],
  },
  {
    id: 'trimestriel',
    name: 'Trimestriel',
    price: 12000,
    period: '3 mois',
    badge: '⭐ Populaire',
    popular: true,
    color: 'border-blue-500',
    features: ['Tout le plan Mensuel', '-20% économisé', 'Accès VIP analyste', 'Alertes notifications', 'Historique complet'],
  },
  {
    id: 'semestriel',
    name: 'Semestriel',
    price: 20000,
    period: '6 mois',
    badge: '💎 Meilleure valeur',
    popular: false,
    color: 'border-yellow-400',
    features: ['Tout le Trimestriel', '-33% économisé', 'Chat WhatsApp direct', 'Analyses IA avancées', 'Badge VIP'],
  },
];

type Step = 'plans' | 'payment' | 'success';

export default function AbonnementView() {
  const { currentUser, subscribePremium, payments } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [step, setStep] = useState<Step>('plans');
  const [method, setMethod] = useState<'orange_money' | 'mtn_money'>('orange_money');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const myPayments = payments.filter(p => p.user_id === currentUser?.id);

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    subscribePremium(method, selectedPlan.name, selectedPlan.price);
    setLoading(false);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-blue-900 mb-2">Paiement réussi ! 🎊</h2>
          <p className="text-gray-500 mb-2">Votre abonnement <strong>{selectedPlan.name}</strong> est actif.</p>
          <p className="text-gray-400 text-sm mb-6">Profitez maintenant de tous les pronostics premium !</p>
          <div className="bg-green-50 rounded-2xl p-4 text-green-700 text-sm font-semibold mb-6">
            ✅ {selectedPlan.price.toLocaleString()} FCFA débité via {method === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money'}
          </div>
          <button
            onClick={() => setStep('plans')}
            className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Voir mes pronostics premium
          </button>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="p-4 sm:p-6">
        <button onClick={() => setStep('plans')} className="flex items-center gap-2 text-gray-500 hover:text-blue-800 mb-6 text-sm font-medium transition-colors">
          <X size={16} /> Retour aux plans
        </button>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-6 text-center">
              <Crown size={32} className="text-yellow-400 mx-auto mb-2" />
              <h2 className="text-xl font-black text-white">Plan {selectedPlan.name}</h2>
              <p className="text-3xl font-black text-yellow-400 mt-2">
                {selectedPlan.price.toLocaleString()} FCFA
                <span className="text-blue-300 text-sm font-normal ml-2">/ {selectedPlan.period}</span>
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* Payment method */}
              <div>
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <CreditCard size={16} /> Méthode de paiement
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'orange_money', label: 'Orange Money', emoji: '🟠', color: 'border-orange-400 bg-orange-50' },
                    { id: 'mtn_money', label: 'MTN Mobile Money', emoji: '🟡', color: 'border-yellow-400 bg-yellow-50' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id as 'orange_money' | 'mtn_money')}
                      className={`border-2 rounded-2xl p-4 text-center transition-all ${method === m.id ? m.color : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="text-2xl mb-1">{m.emoji}</div>
                      <div className="text-xs font-bold text-gray-700">{m.label}</div>
                      {method === m.id && <div className="text-xs text-green-600 font-bold mt-1">✓ Sélectionné</div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold text-gray-700 text-sm mb-2 flex items-center gap-2">
                  <Smartphone size={15} /> Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Ex: +225 07 12 34 56 78"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Security note */}
              <div className="bg-blue-50 rounded-xl p-3 flex items-start gap-2">
                <Shield size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">Paiement 100% sécurisé. Vous recevrez une notification de confirmation sur votre téléphone.</p>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={!phone || loading}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-black py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Traitement en cours...</>
                ) : `Payer ${selectedPlan.price.toLocaleString()} FCFA`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-2">
          <Crown size={24} className="text-yellow-500" /> Abonnement Premium
        </h1>
        <p className="text-gray-500 text-sm mt-1">Accédez à tous les pronostics exclusifs</p>
      </div>

      {/* Current status */}
      {currentUser?.premium ? (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
              <Crown size={24} className="text-white" />
            </div>
            <div>
              <div className="font-black text-blue-900 text-lg">Vous êtes Premium ! 🎉</div>
              <div className="text-blue-800/70 text-sm">Tous les pronostics exclusifs sont débloqués</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-5 flex items-center gap-4">
          <div className="text-4xl">🔒</div>
          <div>
            <div className="font-bold text-white">Compte gratuit actif</div>
            <div className="text-blue-300 text-sm">Abonnez-vous pour débloquer les pronostics premium</div>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all
              ${selectedPlan.id === plan.id ? 'border-blue-500 shadow-lg shadow-blue-100 bg-blue-50' : plan.color + ' bg-white hover:shadow-md'}
              ${plan.popular ? 'scale-[1.02]' : ''}`}
          >
            {plan.badge && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${plan.popular ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-blue-900'}`}>
                {plan.badge}
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-blue-900">{plan.name}</h3>
              {selectedPlan.id === plan.id && <CheckCircle size={20} className="text-blue-600" />}
            </div>
            <div className="mb-4">
              <span className="text-3xl font-black text-blue-900">{plan.price.toLocaleString()}</span>
              <span className="text-gray-500 text-sm ml-1">FCFA / {plan.period}</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle size={13} className="text-green-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!currentUser?.premium && (
        <div className="text-center">
          <button
            onClick={() => setStep('payment')}
            className="bg-gradient-to-r from-blue-800 to-blue-600 text-white font-black px-10 py-4 rounded-2xl hover:shadow-xl hover:shadow-blue-200 transition-all text-lg inline-flex items-center gap-3"
          >
            <Crown size={20} /> Souscrire au plan {selectedPlan.name}
          </button>
          <p className="text-gray-400 text-sm mt-3">Paiement Orange Money & MTN Mobile Money acceptés</p>
        </div>
      )}

      {/* Payment history */}
      {myPayments.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-blue-900">Historique de paiements</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {myPayments.map(p => (
              <div key={p.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{p.method === 'orange_money' ? '🟠' : '🟡'}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Plan {p.plan}</div>
                    <div className="text-xs text-gray-400">{p.method === 'orange_money' ? 'Orange Money' : 'MTN Mobile Money'} • {p.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-blue-900">{p.amount.toLocaleString()} FCFA</div>
                  <div className={`text-xs font-bold ${p.status === 'success' ? 'text-green-600' : p.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {p.status === 'success' ? '✓ Payé' : p.status === 'pending' ? '⏳ En cours' : '✗ Échoué'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
