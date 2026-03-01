import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useSafetyStats } from '../../hooks/dashboard/useSafetyStats';
import { ChartLegend } from './ChartLegend';

export const SafetyChart = ({ products = [], onNavigate }) => {
  const { containerRef, chartWidth, chartData, stats } = useSafetyStats(products);

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in duration-700">

      <div className="absolute top-4 left-6">
        <h3 className="text-[10px] font-black p-5 text-slate-500 uppercase tracking-[0.3em]">Safety Index</h3>
      </div>

      <div ref={containerRef} className="h-64 w-full relative mt-4 flex items-center justify-center">
        {chartWidth > 0 && (
          <PieChart width={chartWidth} height={256}>
            <Pie
              data={chartData}
              cx="50%" cy="50%"
              innerRadius={75} outerRadius={95}
              paddingAngle={stats.total > 1 ? 8 : 0}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
              animationDuration={1000}
              isAnimationActive={true}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
              ))}
            </Pie>
            <Tooltip
              cursor={{ fill: 'transparent' }}
              wrapperStyle={{ zIndex: 1000 }}
              contentStyle={{
                borderRadius: '16px', border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                fontSize: '10px', fontWeight: '900', textTransform: 'uppercase'
              }}
            />
          </PieChart>
        )}

        {/* Center Stats Button */}
        <button onClick={onNavigate} className="absolute inset-0 flex flex-col items-center justify-center group">
          <div className="flex flex-col items-center justify-center transition-transform group-hover:scale-110 duration-300 pointer-events-auto cursor-pointer">
            <span className="text-6xl font-black text-slate-800 tracking-tighter leading-none">
              {stats.total}
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 group-hover:text-pink-500 transition-colors">
              Products
            </span>
          </div>
        </button>
      </div>

      {stats.total > 0 && (
        <ChartLegend
          safe={stats.safeCount}
          warning={stats.warningCount}
          danger={stats.dangerCount}
        />
      )}
    </div>
  );
};