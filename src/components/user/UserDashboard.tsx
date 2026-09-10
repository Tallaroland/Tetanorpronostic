import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import DashboardHome from './views/DashboardHome';
import PronosticsView from './views/PronosticsView';
import LiveView from './views/LiveView';
import HistoriqueView from './views/HistoriqueView';
import ParrainageView from './views/ParrainageView';
import AbonnementView from './views/AbonnementView';

export default function UserDashboard() {
  const { activeView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardHome />;
      case 'pronostics': return <PronosticsView />;
      case 'live': return <LiveView />;
      case 'historique': return <HistoriqueView />;
      case 'parrainage': return <ParrainageView />;
      case 'abonnement': return <AbonnementView />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar mobile onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-blue-800 transition-colors">
            <Menu size={22} />
          </button>
          <span className="font-black text-blue-900 text-lg">ÉTALON PRONOSTICS</span>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
