import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const time = searchParams.get('time') || 'all';
  const category = searchParams.get('category') || 'all';
  const status = searchParams.get('status') || 'all';

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data that changes based on filters
  const mockData = {
    totalRevenue: time === 'today' ? 12500 : 45000,
    totalOrders: category === 'sales' ? 320 : 567,
    conversionRate: status === 'active' ? 4.8 : 3.2,
    activeUsers: 1250,
    chartData: [
      { date: '2025-12-23', value: 4000 },
      { date: '2025-12-24', value: 3000 },
      { date: '2025-12-25', value: 2000 },
      { date: '2025-12-26', value: 2780 },
      { date: '2025-12-27', value: 1890 },
      { date: '2025-12-28', value: 2390 },
      { date: '2025-12-29', value: 3490 },
      { date: '2025-12-30', value: 3490 },
    ],
  };

  // Simulate occasional errors (10% of the time)
  if (Math.random() < 0.1) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }

  // Simulate empty state for specific filter combination
  if (status === 'pending' && category === 'support') {
    return NextResponse.json({
      ...mockData,
      chartData: [],
    });
  }

  return NextResponse.json(mockData);
}
