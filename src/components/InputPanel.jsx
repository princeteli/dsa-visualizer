import React from 'react'
import { algorithmList } from "../algorithms";

const PRESETS = [
  { label: "Default", val: "5, 2, 9, 1, 7, 6" },
  { label: "Reversed", val: "9, 8, 7, 5, 4, 2, 1" },
  { label: "Random", val: () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 25) + 1).join(", ") },
  { label: "Nearly Sorted", val: "1, 2, 4, 3, 5, 7, 6, 8" },
];

const InputPanel = ({
  selectedAlgo,
  onAlgoChange,
  inputText,
  onInputChange,
  targetText,
  onTargetChange,
  needsTarget,
  isGraph,
  onVisualize
}) => {
  const handlePresetClick = (preset) => {
    const newVal = typeof preset.val === "function" ? preset.val() : preset.val;
    onInputChange(newVal);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5 bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Algorithm Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Algorithm
          </label>
          <div className="relative">
            <select
              value={selectedAlgo}
              onChange={(e) => onAlgoChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950/80 text-slate-100 text-sm font-medium border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition appearance-none cursor-pointer"
            >
              <optgroup label="Sorting Algorithms" className="bg-slate-900 text-slate-300">
                <option value="bubbleSort">Bubble Sort</option>
                <option value="selectionSort">Selection Sort</option>
                <option value="insertionSort">Insertion Sort</option>
              </optgroup>
              <optgroup label="Searching Algorithms" className="bg-slate-900 text-slate-300">
                <option value="linearSearch">Linear Search</option>
                <option value="binarySearch">Binary Search</option>
              </optgroup>
              <optgroup label="Graph Traversal" className="bg-slate-900 text-slate-300">
                <option value="bfs">Breadth-First Search (BFS)</option>
                <option value="dfs">Depth-First Search (DFS)</option>
              </optgroup>
              <optgroup label="Tree Data Structures" className="bg-slate-900 text-slate-300">
                <option value="bstInsert">Binary Search Tree (BST Insert)</option>
              </optgroup>
            </select>
            <div className="absolute right-3.5 top-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Input Text or Graph Notice */}
        <div>
          {!isGraph ? (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Array Elements
                </label>
                {/* Presets */}
                <div className="flex gap-1">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handlePresetClick(p)}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <input
                value={inputText}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="e.g. 5, 2, 9, 1, 7, 6"
                className="w-full px-3.5 py-2.5 bg-slate-950/80 text-slate-100 font-mono text-sm border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition placeholder-slate-500"
              />
            </div>
          ) : (
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Graph Model
              </label>
              <div className="px-3.5 py-2.5 bg-slate-950/50 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center gap-2 h-[42px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Using built-in sample graph (6 nodes, 5 edges)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Target search element if required */}
      {needsTarget && (
        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/90 flex flex-col sm:flex-row items-center gap-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 whitespace-nowrap flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Target Value to Search:
          </label>
          <input
            value={targetText}
            onChange={(e) => onTargetChange(e.target.value)}
            placeholder="e.g. 9"
            className="w-full sm:w-32 px-3 py-1.5 bg-slate-900 text-amber-300 font-mono text-sm border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none"
          />
          <span className="text-xs text-slate-400">Specify the number you want to find.</span>
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={onVisualize}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Generate & Run Visualization</span>
      </button>
    </div>
  )
}

export default InputPanel