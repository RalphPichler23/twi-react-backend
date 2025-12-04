// src/modules/Properties/components/details/PropertyStatusManager.tsx
import type { Property } from '@modules/Properties/types';

interface PropertyStatusManagerProps {
  currentStatus: Property['status'];
  onStatusChange: (newStatus: Property['status']) => void;
}

interface StatusConfig {
  value: Property['status'];
  label: string;
  description: string;
  icon: string;
  colors: {
    active: {
      border: string;
      bg: string;
      text: string;
      dot: string;
    };
    inactive: {
      border: string;
      hover: string;
      text: string;
    };
  };
}

const PropertyStatusManager = ({ currentStatus, onStatusChange }: PropertyStatusManagerProps) => {
  const statuses: StatusConfig[] = [
    {
      value: 'available',
      label: 'Verfügbar',
      description: 'Objekt kann besichtigt werden',
      icon: '✓',
      colors: {
        active: {
          border: 'border-emerald-200',
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          dot: 'bg-emerald-500',
        },
        inactive: {
          border: 'border-gray-200',
          hover: 'hover:border-emerald-200 hover:bg-emerald-50/30',
          text: 'text-gray-700',
        },
      },
    },
    {
      value: 'reserved',
      label: 'Reserviert',
      description: 'Vorgemerkt für Kunden',
      icon: '⏱',
      colors: {
        active: {
          border: 'border-amber-200',
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          dot: 'bg-amber-500',
        },
        inactive: {
          border: 'border-gray-200',
          hover: 'hover:border-amber-200 hover:bg-amber-50/30',
          text: 'text-gray-700',
        },
      },
    },
    {
      value: 'sold',
      label: 'Verkauft',
      description: 'Erfolgreich verkauft',
      icon: '✓',
      colors: {
        active: {
          border: 'border-slate-200',
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          dot: 'bg-slate-500',
        },
        inactive: {
          border: 'border-gray-200',
          hover: 'hover:border-slate-200 hover:bg-slate-50/30',
          text: 'text-gray-700',
        },
      },
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Status ändern</h3>
          <p className="text-xs text-gray-600">Aktueller Verkaufsstatus</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {statuses.map((status) => {
          const isActive = currentStatus === status.value;
          const colors = status.colors;

          return (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={`
                w-full text-left px-4 py-3.5 rounded-lg border-2 transition-all duration-200
                ${isActive ? colors.active.border : colors.inactive.border}
                ${isActive ? colors.active.bg : colors.inactive.hover}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Radio Indicator */}
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${isActive ? `border-transparent ${colors.active.dot}` : 'border-gray-300 bg-white'}
                  transition-all duration-200
                `}>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold mb-0.5 ${isActive ? colors.active.text : colors.inactive.text}`}>
                    {status.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {status.description}
                  </p>
                </div>

                {/* Icon */}
                <div className={`
                  w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isActive ? colors.active.bg : 'bg-gray-50'}
                  transition-all duration-200
                `}>
                  <span className="text-base">
                    {status.icon}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyStatusManager;