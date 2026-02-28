export const ChartLegend = ({ safe, warning, danger }) => (
  <div className="flex gap-4 mt-4 animate-in slide-in-from-bottom-2">
    <LegendItem color="bg-green-500" label="Safe" count={safe} />
    <LegendItem color="bg-amber-500" label="Warn" count={warning} />
    <LegendItem color="bg-red-500" label="Risk" count={danger} />
  </div>
);

const LegendItem = ({ color, label, count }) => (
  <div className="flex items-center gap-1.5">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <span className="text-[9px] font-black text-slate-500 uppercase">{count} {label}</span>
  </div>
);