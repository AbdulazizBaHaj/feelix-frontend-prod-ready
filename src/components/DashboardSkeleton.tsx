export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg" />
        ))}
      </div>
      <div className="bg-gray-200 h-64 rounded-lg" />
    </div>
  );
}
