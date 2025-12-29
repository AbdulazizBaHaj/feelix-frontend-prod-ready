// app/dashboard/page.tsx
import { Suspense } from 'react';
import DashboardFilters from '@/components/DashboardFilters';
import DashboardContent from '@/components/DashboardContent';
import DashboardSkeleton from '@/components/DashboardSkeleton';

type SearchParams = Promise<{
  time?: string;
  category?: string;
  status?: string;
}>;

type Props = {
  searchParams: SearchParams;
};

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Client Component for filters */}
      <DashboardFilters />

      {/* Server Component wrapped in Suspense for streaming */}
      <Suspense key={JSON.stringify(params)} fallback={<DashboardSkeleton />}>
        <DashboardContent params={params} />
      </Suspense>
    </div>
  );
}
