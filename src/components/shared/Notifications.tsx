import { useApp } from '../../context/AppContext';
import { X, CheckCircle } from 'lucide-react';

export default function Notifications() {
  const { notifications, clearNotification } = useApp();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {notifications.map((msg, idx) => (
        <div
          key={idx}
          className="pointer-events-auto flex items-center gap-3 bg-white border border-blue-100 shadow-xl rounded-xl px-4 py-3 min-w-[280px] max-w-sm animate-slide-in"
        >
          <CheckCircle className="text-green-500 shrink-0" size={20} />
          <span className="text-sm text-gray-800 flex-1">{msg}</span>
          <button onClick={() => clearNotification(idx)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
