import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHome from './views/AdminHome';
import AdminMatches from './views/AdminMatches';
import AdminPredictions from './views/AdminPredictions';
import AdminUsers from './views/AdminUsers';
import AdminPayments from './views/AdminPayments';

export default function AdminDashboard() {
  const { activeView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'admin-dashboard': return <AdminHome />;
      case 'admin-matches': return <AdminMatches />;
      case 'admin-predictions': return <AdminPredictions />;
      case 'admin-users': return <AdminUsers />;
      case 'admin-payments': return <AdminPayments />;
      default: return <AdminHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar mobile onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="hidden lg:flex flex-shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-slate-900 border-b border-slate-700">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
          <span className="font-black text-white text-lg">ADMIN – ÉTALON</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
