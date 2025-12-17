// src/modules/Dashboard/components/QuickActionsCard.tsx
import { Link } from 'react-router-dom';

const QuickActionsCard = () => {
  const actions = [
    {
      to: '/properties',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      ),
      label: 'Immobilien',
      color: 'blue',
    },
    {
      to: '/properties/create',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
        </svg>
      ),
      label: 'Neue Immobilie',
      color: 'green',
    },
    {
      to: '/settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      label: 'Einstellungen',
      color: 'purple',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Schnellaktionen
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 group
              ${action.color === 'blue' ? 'bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100' : ''}
              ${action.color === 'green' ? 'bg-green-50 border-green-200 hover:border-green-400 hover:bg-green-100' : ''}
              ${action.color === 'purple' ? 'bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100' : ''}
            `}
          >
            <div className={`
              mb-2 group-hover:scale-110 transition-transform
              ${action.color === 'blue' ? 'text-blue-600' : ''}
              ${action.color === 'green' ? 'text-green-600' : ''}
              ${action.color === 'purple' ? 'text-purple-600' : ''}
            `}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;