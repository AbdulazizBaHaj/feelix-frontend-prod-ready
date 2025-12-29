'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function DashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Safe parameter update function
  const updateFilter = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Update URL without full page reload
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="mb-6 flex gap-4">
      <select
        value={searchParams.get('time') || ''}
        onChange={(e) => updateFilter('time', e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

      <select
        value={searchParams.get('category') || ''}
        onChange={(e) => updateFilter('category', e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">All Categories</option>
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="support">Support</option>
      </select>

      <select
        value={searchParams.get('status') || ''}
        onChange={(e) => updateFilter('status', e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
