// src/modules/Dashboard/components/DashboardHeader.tsx
import { Link } from 'react-router-dom';
import { useZustand } from '@state';

const DashboardHeader = () => {
  const { user } = useZustand();

  const displayName = user?.email?.split('@')[0] || 'Benutzer';

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Willkommen zurück, {displayName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Hier ist Ihre Übersicht
            </p>
          </div>
          <Link
            to="/properties/create"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            Neue Immobilie
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;