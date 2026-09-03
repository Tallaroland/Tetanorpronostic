import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  User, Match, Prediction, Payment,
  mockUsers, mockMatches, mockPredictions, mockPayments, mockReferrals, Referral,
} from '../data/mockData';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => { success: boolean; role?: string; error?: string };
  logout: () => void;
  register: (nom: string, email: string, password: string, referralCode?: string) => { success: boolean; error?: string };

  // Data
  users: User[];
  matches: Match[];
  predictions: Prediction[];
  payments: Payment[];
  referrals: Referral[];

  // Admin actions
  addMatch: (match: Omit<Match, 'id'>) => void;
  deleteMatch: (id: string) => void;
  updateMatch: (id: string, data: Partial<Match>) => void;
  addPrediction: (prediction: Omit<Prediction, 'id' | 'created_at'>) => void;
  deletePrediction: (id: string) => void;
  updateUserPremium: (userId: string, premium: boolean) => void;

  // User actions
  subscribePremium: (method: 'orange_money' | 'mtn_money', plan: string, amount: number) => void;

  // UI
  activeView: string;
  setActiveView: (view: string) => void;

  // Notifications
  notifications: string[];
  addNotification: (msg: string) => void;
  clearNotification: (idx: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [referrals] = useState<Referral[]>(mockReferrals);
  const [activeView, setActiveView] = useState('landing');
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = useCallback((msg: string) => {
    setNotifications(prev => [...prev, msg]);
    setTimeout(() => setNotifications(prev => prev.slice(1)), 4000);
  }, []);

  const clearNotification = useCallback((idx: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const login = useCallback((email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Email ou mot de passe incorrect.' };
    setCurrentUser(user);
    setActiveView('dashboard');
    addNotification(`Bienvenue, ${user.nom} ! 🎉`);
    return { success: true, role: user.role };
  }, [users, addNotification]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setActiveView('dashboard');
  }, []);

  const register = useCallback((nom: string, email: string, password: string, referralCode?: string) => {
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Cet email est déjà utilisé.' };
    }
    const code = nom.toUpperCase().replace(/\s/g, '').slice(0, 4) + Math.floor(Math.random() * 9000 + 1000);
    const newUser: User = {
      id: `user-${Date.now()}`,
      nom,
      email,
      password,
      role: 'user',
      premium: false,
      referral_code: code,
      referredBy: referralCode,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveView('dashboard');
    addNotification(`Compte créé avec succès ! Bienvenue ${nom} 🎉`);
    return { success: true };
  }, [users, addNotification]);

  // Admin: Matches
  const addMatch = useCallback((match: Omit<Match, 'id'>) => {
    const newMatch: Match = { ...match, id: `match-${Date.now()}` };
    setMatches(prev => [newMatch, ...prev]);
    addNotification('Match ajouté avec succès ✅');
  }, [addNotification]);

  const deleteMatch = useCallback((id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
    addNotification('Match supprimé ✅');
  }, [addNotification]);

  const updateMatch = useCallback((id: string, data: Partial<Match>) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    addNotification('Match mis à jour ✅');
  }, [addNotification]);

  // Admin: Predictions
  const addPrediction = useCallback((prediction: Omit<Prediction, 'id' | 'created_at'>) => {
    const newPred: Prediction = {
      ...prediction,
      id: `pred-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setPredictions(prev => [newPred, ...prev]);
    addNotification('Pronostic publié avec succès ✅');
  }, [addNotification]);

  const deletePrediction = useCallback((id: string) => {
    setPredictions(prev => prev.filter(p => p.id !== id));
    addNotification('Pronostic supprimé ✅');
  }, [addNotification]);

  const updateUserPremium = useCallback((userId: string, premium: boolean) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, premium } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, premium } : null);
    }
    addNotification(`Statut premium ${premium ? 'activé' : 'désactivé'} ✅`);
  }, [currentUser, addNotification]);

  // User: Subscribe
  const subscribePremium = useCallback((method: 'orange_money' | 'mtn_money', plan: string, amount: number) => {
    if (!currentUser) return;
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      user_id: currentUser.id,
      method,
      status: 'success',
      amount,
      date: new Date().toISOString().split('T')[0],
      plan,
    };
    setPayments(prev => [payment, ...prev]);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, premium: true } : u));
    setCurrentUser(prev => prev ? { ...prev, premium: true } : null);
    addNotification('Abonnement activé avec succès ! 🎊 Profitez des pronostics premium.');
  }, [currentUser, addNotification]);

  return (
    <AppContext.Provider value={{
      currentUser, login, logout, register,
      users, matches, predictions, payments, referrals,
      addMatch, deleteMatch, updateMatch,
      addPrediction, deletePrediction, updateUserPremium,
      subscribePremium,
      activeView, setActiveView,
      notifications, addNotification, clearNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
