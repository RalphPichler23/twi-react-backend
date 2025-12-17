// src/modules/Dashboard/components/StatsGrid.tsx
import type { DashboardStats } from '../types';

interface StatsGridProps {
  stats: DashboardStats;
  isLoading: boolean;
}

const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const statCards = [
    {
      label: 'Gesamt Immobilien',
      value: stats.totalProperties.toString(),
      icon: '🏠',
      trend: `${stats.availableProperties} verfügbar`,
    },
    {
      label: 'Verfügbar',
      value: stats.availableProperties.toString(),
      icon: '✅',
      trend: `${stats.reservedProperties} reserviert`,
    },
    {
      label: 'Verkauft',
      value: stats.soldProperties.toString(),
      icon: '🎉',
      trend: `${Math.round((stats.soldProperties / stats.totalProperties) * 100) || 0}% der Objekte`,
    },
    {
      label: 'Gesamtwert',
      value: formatCurrency(stats.totalValue),
      icon: '💰',
      trend: `⌀ ${formatCurrency(stats.averagePrice)}`,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded mb-4" />
            <div className="h-10 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
          <p className="text-xs text-primary font-medium">
            {stat.trend}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;