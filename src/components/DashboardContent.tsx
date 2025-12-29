// components/DashboardContent.tsx
import { fetchAnalytics } from '@/lib/api/analytics';
import KPICard from './KPICard';
import SimpleChart from './SimpleChart';

type Props = {
  params: {
    time?: string;
    category?: string;
    status?: string;
  };
};

export default async function DashboardContent({ params }: Props) {
  let data;
  try {
    data = await fetchAnalytics(params);
  } catch (error) {
    // Error state handled by error.tsx
    throw error;
  }

  // Handle empty state
  if (!data.chartData || data.chartData.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString()}`}
          trend="+12%"
        />
        <KPICard
          title="Total Orders"
          value={data.totalOrders.toLocaleString()}
          trend="+8%"
        />
        <KPICard
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          trend="-2%"
        />
        <KPICard
          title="Active Users"
          value={data.activeUsers.toLocaleString()}
          trend="+15%"
        />
      </div>

      {/* Chart */}
      <SimpleChart data={data.chartData} />
    </div>
  );
}
