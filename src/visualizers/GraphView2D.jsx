import React from 'react';

export default function GraphView2D({ step }) {
  if (!step || !step.nodes) return null;

  const { nodes, edges, visited = [], current = null } = step;
  const pos = (id) => nodes.find((n) => n.id === id);

  const getNodeTheme = (id) => {
    if (id === current) {
      return {
        fill: "url(#currentGrad)",
        stroke: "#facc15",
        text: "#0f172a",
        filter: "url(#glow)",
      };
    }
    if (visited.includes(id)) {
      return {
        fill: "url(#visitedGrad)",
        stroke: "#34d399",
        text: "#0f172a",
        filter: "none",
      };
    }
    return {
      fill: "url(#defaultGrad)",
      stroke: "#6366f1",
      text: "#ffffff",
      filter: "none",
    };
  };

  return (
    <div className="w-full flex flex-col items-center p-3">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500 border border-indigo-400"></span>
          <span className="text-slate-400">Unvisited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-300 animate-pulse"></span>
          <span className="text-amber-400">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-300"></span>
          <span className="text-emerald-400">Visited</span>
        </div>
      </div>

      <svg viewBox="0 0 500 360" className="w-full max-w-lg h-72">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="defaultGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="currentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="visitedGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], idx) => {
          const p = pos(a);
          const q = pos(b);
          if (!p || !q) return null;
          const isEdgeActive =
            (a === current && visited.includes(b)) ||
            (b === current && visited.includes(a));

          return (
            <line
              key={idx}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke={isEdgeActive ? "#818cf8" : "#334155"}
              strokeWidth={isEdgeActive ? "3.5" : "2"}
              strokeDasharray={isEdgeActive ? "none" : "none"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => {
          const theme = getNodeTheme(n.id);
          return (
            <g key={n.id} className="transition-all duration-300">
              <circle
                cx={n.x}
                cy={n.y}
                r={n.id === current ? "25" : "22"}
                fill={theme.fill}
                stroke={theme.stroke}
                strokeWidth="2.5"
                filter={theme.filter}
                className="transition-all duration-200"
              />
              <text
                x={n.x}
                y={n.y + 5}
                textAnchor="middle"
                fill={theme.text}
                fontSize="15"
                fontWeight="700"
                fontFamily="'JetBrains Mono', monospace"
              >
                {n.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}