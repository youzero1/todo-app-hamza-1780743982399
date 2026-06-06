import clsx from 'clsx';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  total: number;
};

export default function StatsBar({ activeCount, completedCount, total }: StatsBarProps) {
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <StatCard label="Total" value={total} color="bg-indigo-100 text-indigo-700" />
      <StatCard label="Active" value={activeCount} color="bg-amber-100 text-amber-700" />
      <StatCard label="Done" value={completedCount} color="bg-emerald-100 text-emerald-700" />

      <div className="col-span-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={clsx(
              'h-2 rounded-full transition-all duration-500',
              percent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
      <div className={clsx('text-2xl font-bold', color.split(' ')[1])}>{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}
