import React from 'react'

export default function ArrayView2D({ step }) {
  if (!step || !step.array) return null;

  const { array, comparing = [], sorted = [], found = null } = step;
  const max = Math.max(...array.map((n) => Math.abs(n)), 1);

  const getBarStyle = (idx) => {
    if (found === idx) {
      return {
        bg: "bg-gradient-to-t from-emerald-500 to-green-300 ring-2 ring-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)]",
        text: "text-emerald-300",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      };
    }
    if (comparing.includes(idx)) {
      return {
        bg: "bg-gradient-to-t from-amber-500 to-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.7)] animate-pulse",
        text: "text-amber-300",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      };
    }
    if (sorted.includes(idx)) {
      return {
        bg: "bg-gradient-to-t from-teal-500 to-emerald-400 shadow-[0_0_12px_rgba(45,212,191,0.4)]",
        text: "text-teal-300",
        badge: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      };
    }
    return {
      bg: "bg-gradient-to-t from-indigo-600 via-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(99,102,241,0.25)] hover:brightness-110",
      text: "text-slate-300",
      badge: "bg-slate-800 text-slate-400 border-slate-700",
    };
  };

  return (
    <div className="w-full flex flex-col items-center justify-between p-4">
      {/* Visual Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gradient-to-tr from-indigo-600 to-cyan-400 shadow-sm"></span>
          <span className="text-slate-400">Default</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-sm"></span>
          <span className="text-amber-400">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-sm"></span>
          <span className="text-teal-400">Sorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-gradient-to-tr from-emerald-500 to-green-300 ring-1 ring-emerald-300 shadow-sm"></span>
          <span className="text-emerald-400">Found</span>
        </div>
      </div>

      {/* Bars Container */}
      <div className="flex items-end justify-center gap-2 sm:gap-3 h-64 w-full max-w-2xl px-4 pb-2 border-b border-slate-700/80">
        {array.map((val, idx) => {
          const style = getBarStyle(idx);
          const barHeight = Math.max((Math.abs(val) / max) * 190, 16);

          return (
            <div key={idx} className="flex flex-col items-center flex-1 max-w-[48px] group">
              {/* Value Label */}
              <span className={`text-xs font-mono font-bold mb-2 transition-all ${style.text}`}>
                {val}
              </span>

              {/* Graphical Bar */}
              <div
                className={`w-full rounded-t-lg transition-all duration-300 ease-out ${style.bg}`}
                style={{ height: `${barHeight}px` }}
              />

              {/* Index Badge */}
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border mt-2 transition-all ${style.badge}`}>
                {idx}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}