import React from 'react';

function layout(node, depth, counter, list, parent) {
  if (!node) return;
  layout(node.left, depth + 1, counter, list, node);
  const me = { value: node.value, x: counter.n++, y: depth, parentValue: parent ? parent.value : null };
  list.push(me);
  layout(node.right, depth + 1, counter, list, node);
}

export default function TreeView2D({ step }) {
  if (!step || !step.tree) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 font-mono text-sm">
        Binary Search Tree is empty
      </div>
    );
  }

  const list = [];
  layout(step.tree, 0, { n: 0 }, list, null);

  const GAP_X = 64;
  const GAP_Y = 68;
  const px = (n) => n.x * GAP_X + 50;
  const py = (n) => n.y * GAP_Y + 50;

  const width = Math.max(...list.map(px)) + 50;
  const height = Math.max(...list.map(py)) + 50;

  return (
    <div className="overflow-x-auto w-full py-4 flex flex-col items-center">
      <svg width={Math.max(width, 300)} height={height} className="mx-auto">
        <defs>
          <filter id="treeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="treeNodeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="treeHighlightGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>

        {/* Tree Edges */}
        {list.map((n) => {
          if (n.parentValue === null) return null;
          const p = list.find((m) => m.value === n.parentValue);
          if (!p) return null;
          return (
            <line
              key={`l-${n.value}`}
              x1={px(p)}
              y1={py(p)}
              x2={px(n)}
              y2={py(n)}
              stroke="#475569"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Tree Nodes */}
        {list.map((n) => {
          const isHighlight = n.value === step.highlight;
          return (
            <g key={n.value} className="transition-all duration-300">
              <circle
                cx={px(n)}
                cy={py(n)}
                r={isHighlight ? "23" : "20"}
                fill={isHighlight ? "url(#treeHighlightGrad)" : "url(#treeNodeGrad)"}
                stroke={isHighlight ? "#facc15" : "#818cf8"}
                strokeWidth="2.5"
                filter={isHighlight ? "url(#treeGlow)" : "none"}
              />
              <text
                x={px(n)}
                y={py(n) + 5}
                textAnchor="middle"
                fill={isHighlight ? "#0f172a" : "#ffffff"}
                fontSize="14"
                fontWeight="700"
                fontFamily="'JetBrains Mono', monospace"
              >
                {n.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}