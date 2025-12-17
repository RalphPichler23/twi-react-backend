// src/modules/Dashboard/pages/Dashboard.tsx
import DashboardHeader from '../components/DashboardHeader';
import StatsGrid from '../components/StatsGrid';
import RecentPropertiesCard from '../components/RecentPropertiesCard';
import PropertyOfMonthCard from '../components/PropertyOfMonthCard';
import useFetchDashboardStats from '../api/useFetchDashboardStats';
import useFetchRecentProperties from '../api/useFetchRecentProperties';
import useFetchProperties from '@modules/Properties/Overview/api/useFetchProperties';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useFetchDashboardStats();
  const { data: recentProperties, isLoading: propertiesLoading } = useFetchRecentProperties(5);
  const { data: allPropertiesData, isLoading: allPropertiesLoading } = useFetchProperties();

  // Extract properties array from response
  const allProperties = allPropertiesData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <StatsGrid 
          stats={stats || {
            totalProperties: 0,
            availableProperties: 0,
            soldProperties: 0,
            reservedProperties: 0,
            totalValue: 0,
            averagePrice: 0,
          }} 
          isLoading={statsLoading} 
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Properties - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentPropertiesCard 
              properties={recentProperties || []} 
              isLoading={propertiesLoading} 
            />
          </div>

          {/* Property of Month - Takes 1 column */}
          <div className="lg:col-span-1">
            <PropertyOfMonthCard 
              allProperties={allProperties}
              allPropertiesLoading={allPropertiesLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;