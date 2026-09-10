export interface User {
  id: string;
  nom: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  premium: boolean;
  referral_code: string;
  referredBy?: string;
  joinDate: string;
  avatar?: string;
}

export interface Match {
  id: string;
  team_home: string;
  team_away: string;
  logo_home: string;
  logo_away: string;
  date: string;
  heure: string;
  live_status: 'upcoming' | 'live' | 'finished';
  score_home?: number;
  score_away?: number;
  competition: string;
  minute?: number;
}

export interface Prediction {
  id: string;
  match_id: string;
  type: 'free' | 'premium';
  prediction_text: string;
  odds?: number;
  confidence: number;
  result?: 'win' | 'loss' | 'pending';
  analyst: string;
  created_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  method: 'orange_money' | 'mtn_money';
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string;
  plan: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  status: 'pending' | 'confirmed';
  reward: number;
  date: string;
}

// ─── Mock Users ────────────────────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    nom: 'Admin Etalon',
    email: 'admin@etalon.com',
    password: 'admin123',
    role: 'admin',
    premium: true,
    referral_code: 'ADMIN001',
    joinDate: '2024-01-01',
  },
  {
    id: 'user-1',
    nom: 'Kouamé Jean',
    email: 'jean@mail.com',
    password: 'user123',
    role: 'user',
    premium: false,
    referral_code: 'JEAN123',
    joinDate: '2024-03-15',
  },
  {
    id: 'user-2',
    nom: 'Fatou Diallo',
    email: 'fatou@mail.com',
    password: 'user123',
    role: 'user',
    premium: true,
    referral_code: 'FATOU456',
    joinDate: '2024-04-02',
  },
  {
    id: 'user-3',
    nom: 'Mamadou Bah',
    email: 'mamadou@mail.com',
    password: 'user123',
    role: 'user',
    premium: false,
    referral_code: 'MAMBA789',
    joinDate: '2024-05-10',
  },
  {
    id: 'user-4',
    nom: 'Awa Touré',
    email: 'awa@mail.com',
    password: 'user123',
    role: 'user',
    premium: true,
    referral_code: 'AWAT321',
    joinDate: '2024-06-01',
  },
];

// ─── Mock Matches ──────────────────────────────────────────────────────────────
export const mockMatches: Match[] = [
  {
    id: 'match-1',
    team_home: 'PSG',
    team_away: 'Real Madrid',
    logo_home: '🔵🔴',
    logo_away: '⚪',
    date: '2025-07-20',
    heure: '21:00',
    live_status: 'live',
    score_home: 2,
    score_away: 1,
    competition: 'UEFA Champions League',
    minute: 67,
  },
  {
    id: 'match-2',
    team_home: 'Manchester City',
    team_away: 'Bayern Munich',
    logo_home: '🔵',
    logo_away: '🔴',
    date: '2025-07-20',
    heure: '20:45',
    live_status: 'live',
    score_home: 0,
    score_away: 0,
    competition: 'UEFA Champions League',
    minute: 23,
  },
  {
    id: 'match-3',
    team_home: 'Barcelona',
    team_away: 'Atletico Madrid',
    logo_home: '🔴🔵',
    logo_away: '🔴⚪',
    date: '2025-07-21',
    heure: '20:00',
    live_status: 'upcoming',
    competition: 'La Liga',
  },
  {
    id: 'match-4',
    team_home: 'Arsenal',
    team_away: 'Chelsea',
    logo_home: '🔴',
    logo_away: '🔵',
    date: '2025-07-21',
    heure: '16:30',
    live_status: 'upcoming',
    competition: 'Premier League',
  },
  {
    id: 'match-5',
    team_home: 'Juventus',
    team_away: 'Inter Milan',
    logo_home: '⚫⚪',
    logo_away: '🔵⚫',
    date: '2025-07-19',
    heure: '20:45',
    live_status: 'finished',
    score_home: 1,
    score_away: 2,
    competition: 'Serie A',
  },
  {
    id: 'match-6',
    team_home: 'Dortmund',
    team_away: 'Leipzig',
    logo_home: '🟡⚫',
    logo_away: '🔴⚪',
    date: '2025-07-22',
    heure: '18:30',
    live_status: 'upcoming',
    competition: 'Bundesliga',
  },
];

// ─── Mock Predictions ──────────────────────────────────────────────────────────
export const mockPredictions: Prediction[] = [
  {
    id: 'pred-1',
    match_id: 'match-1',
    type: 'free',
    prediction_text: 'PSG Victoire – L\'équipe de Paris est en grande forme à domicile avec 8 victoires consécutives. Real Madrid affaibli par des blessures en défense.',
    odds: 1.85,
    confidence: 78,
    result: 'win',
    analyst: 'Etalon Expert',
    created_at: '2025-07-20T10:00:00',
  },
  {
    id: 'pred-2',
    match_id: 'match-2',
    type: 'premium',
    prediction_text: 'Les deux équipes marquent (BTTS) – Manchester City et Bayern Munich ont les meilleures attaques d\'Europe. Défenses fragilisées. Statistiques : 85% des rencontres se terminent avec buts des deux côtés.',
    odds: 1.65,
    confidence: 85,
    result: 'pending',
    analyst: 'Etalon Expert',
    created_at: '2025-07-20T09:30:00',
  },
  {
    id: 'pred-3',
    match_id: 'match-3',
    type: 'free',
    prediction_text: 'Barcelone Victoire ou Nul – Barcelona joue à domicile avec une forme exceptionnelle. Atletico joue défensif mais vulnérable aux contre-attaques rapides.',
    odds: 1.45,
    confidence: 72,
    result: 'pending',
    analyst: 'Etalon Expert',
    created_at: '2025-07-20T11:00:00',
  },
  {
    id: 'pred-4',
    match_id: 'match-4',
    type: 'premium',
    prediction_text: 'Plus de 2,5 buts – Le derby londonien promet du spectacle. Arsenal marque en moyenne 2.4 buts par match, Chelsea 2.1. La tension du derby pousse les deux équipes à attaquer. Cote excellente.',
    odds: 1.90,
    confidence: 80,
    result: 'pending',
    analyst: 'Etalon Expert',
    created_at: '2025-07-20T12:00:00',
  },
  {
    id: 'pred-5',
    match_id: 'match-5',
    type: 'free',
    prediction_text: 'Inter Milan Victoire – Derby d\'Italie. Inter en grande forme avec Lautaro Martinez. Juventus sans ses titulaires en milieu de terrain.',
    odds: 2.10,
    confidence: 68,
    result: 'win',
    analyst: 'Etalon Expert',
    created_at: '2025-07-19T08:00:00',
  },
  {
    id: 'pred-6',
    match_id: 'match-6',
    type: 'premium',
    prediction_text: 'Dortmund Victoire + Plus de 2,5 buts – Le Signal Iduna Park toujours impressionnant. Leipzig déplacement difficile. Analyse complète des 10 dernières confrontations : 7 victoires Dortmund.',
    odds: 2.40,
    confidence: 73,
    result: 'pending',
    analyst: 'Etalon Expert',
    created_at: '2025-07-20T13:00:00',
  },
];

// ─── Mock Payments ─────────────────────────────────────────────────────────────
export const mockPayments: Payment[] = [
  {
    id: 'pay-1',
    user_id: 'user-2',
    method: 'orange_money',
    status: 'success',
    amount: 5000,
    date: '2024-04-02',
    plan: 'Mensuel',
  },
  {
    id: 'pay-2',
    user_id: 'user-4',
    method: 'mtn_money',
    status: 'success',
    amount: 12000,
    date: '2024-06-01',
    plan: 'Trimestriel',
  },
  {
    id: 'pay-3',
    user_id: 'user-1',
    method: 'orange_money',
    status: 'pending',
    amount: 5000,
    date: '2025-07-20',
    plan: 'Mensuel',
  },
];

// ─── Mock Referrals ────────────────────────────────────────────────────────────
export const mockReferrals: Referral[] = [
  {
    id: 'ref-1',
    referrer_id: 'user-1',
    referred_id: 'user-3',
    status: 'confirmed',
    reward: 1000,
    date: '2024-05-10',
  },
  {
    id: 'ref-2',
    referrer_id: 'user-2',
    referred_id: 'user-4',
    status: 'confirmed',
    reward: 1000,
    date: '2024-06-01',
  },
];

// ─── Performance stats ─────────────────────────────────────────────────────────
export const performanceStats = [
  { month: 'Jan', wins: 18, losses: 4 },
  { month: 'Fév', wins: 22, losses: 3 },
  { month: 'Mar', wins: 19, losses: 5 },
  { month: 'Avr', wins: 25, losses: 2 },
  { month: 'Mai', wins: 21, losses: 4 },
  { month: 'Jun', wins: 28, losses: 3 },
  { month: 'Jul', wins: 15, losses: 2 },
];
