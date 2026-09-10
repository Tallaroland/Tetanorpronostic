import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Notifications from './components/shared/Notifications';

function AppContent() {
  const { activeView, currentUser } = useApp();

  if (currentUser?.role === 'admin' && activeView.startsWith('admin-')) {
    return <AdminDashboard />;
  }
  if (currentUser && !activeView.startsWith('admin-')) {
    return <UserDashboard />;
  }

  switch (activeView) {
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    default:
      return <LandingPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <Notifications />
    </AppProvider>
  );
}

// Application shell for the full public, user, bot, and admin experience.
