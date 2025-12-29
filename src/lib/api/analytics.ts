type AnalyticsParams = {
  time?: string;
  category?: string;
  status?: string;
};

type AnalyticsResponse = {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  activeUsers: number;
  chartData: Array<{ date: string; value: number }>;
};

export async function fetchAnalytics(
  params: AnalyticsParams
): Promise<AnalyticsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not configured');
  }

  // Build query string safely
  const queryParams = new URLSearchParams();
  if (params.time) queryParams.set('time', params.time);
  if (params.category) queryParams.set('category', params.category);
  if (params.status) queryParams.set('status', params.status);

  const url = `${apiUrl}/api/analytics?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store', // Always get fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    return data as AnalyticsResponse;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
}
