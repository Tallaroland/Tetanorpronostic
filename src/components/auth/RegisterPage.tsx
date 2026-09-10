import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Gift } from 'lucide-react';

export default function RegisterPage() {
  const { register, setActiveView } = useApp();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [referral, setReferral] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register(nom, email, password, referral || undefined);
    setLoading(false);
    if (!result.success) setError(result.error || 'Erreur lors de la création du compte');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Retour à l'accueil
        </button>

        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-950/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-8 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Trophy size={28} className="text-yellow-400" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-white">Créer un compte</h1>
            <p className="text-blue-300 text-sm mt-1">Rejoignez Étalon Pronostics gratuitement</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={nom} onChange={e => setNom(e.target.value)}
                    placeholder="Jean Kouamé" required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com" required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 caractères" required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPw ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code parrainage <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <div className="relative">
                  <Gift size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={referral} onChange={e => setReferral(e.target.value.toUpperCase())}
                    placeholder="Ex: JEAN1234"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Création...</>
                ) : 'Créer mon compte gratuitement'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Déjà un compte ?{' '}
              <button onClick={() => setActiveView('login')} className="text-blue-600 font-bold hover:underline">
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
