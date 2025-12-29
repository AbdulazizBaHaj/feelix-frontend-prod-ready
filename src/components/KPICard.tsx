type Props = {
  title: string;
  value: string;
  trend?: string;
};

export default function KPICard({ title, value, trend }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {trend && <span className="text-sm text-green-600">{trend}</span>}
    </div>
  );
}
