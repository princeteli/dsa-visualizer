import React, { useState } from 'react'
import Controls from './components/Controls'
import useStepper from './hooks/useStepper'
import InputPanel from './components/InputPanel'
import StepInfo from './components/StepInfo'
import ViewToggle from './components/ViewToggle'
import { algorithms } from "./algorithms";
import { parseArray } from "./utils/parseInput";
import { visualizers } from "./visualizers";

const App = () => {
  const stepper = useStepper();

  const [selectedAlgo, setSelectedAlgo] = useState("bubbleSort");
  const [inputText, setInputText] = useState("5, 2, 9, 1, 7, 6");
  const [targetText, setTargetText] = useState("9");
  const [viewMode, setViewMode] = useState("2D");
  const [error, setError] = useState("");

  const algo = algorithms[selectedAlgo] || algorithms.bubbleSort;
  const availableViews = visualizers[algo?.type] || {};
  const Visualizer = availableViews[viewMode] || availableViews["2D"];

  const handleVisualize = () => {
    // algorithms that don't need input like graphs
    if (algo.input === "none") {
      setError("");
      stepper.load(algo.run());
      return;
    }

    const parsed = parseArray(inputText);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    let arr = parsed.value;
    if (algo.sortFirst) {
      arr = [...arr].sort((a, b) => a - b);
    }

    if (algo.needsTarget) {
      const target = Number(targetText);
      if (targetText.trim() === "" || Number.isNaN(target)) {
        setError("Please enter a valid number in the Target field.");
        return;
      }
      setError("");
      stepper.load(algo.run(arr, target));
      return;
    }

    setError("");
    stepper.load(algo.run(arr));
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex-1">
        {/* Top Navbar */}
        <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  DSA Visualizer
                </h1>
                <p className="text-[10px] text-slate-400 font-mono tracking-tight -mt-0.5">
                  Interactive 2D & 3D Algorithm Engine
                </p>
              </div>
            </div>

            {/* Active Algo Tag */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-indigo-400">
                {algo.name}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {algo.type}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Dashboard */}
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          {/* Controls & Input Section */}
          <InputPanel
            selectedAlgo={selectedAlgo}
            onAlgoChange={(algoKey) => {
              setSelectedAlgo(algoKey);
              setError("");
            }}
            inputText={inputText}
            onInputChange={setInputText}
            targetText={targetText}
            onTargetChange={setTargetText}
            needsTarget={!!algo.needsTarget}
            isGraph={algo.input === "none"}
            onVisualize={handleVisualize}
          />

          {/* Error Banner */}
          {error && (
            <div className="max-w-3xl mx-auto p-3.5 bg-red-950/80 border border-red-800/80 text-red-300 rounded-2xl text-center text-xs font-medium flex items-center justify-center gap-2 shadow-lg">
              <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* 2D / 3D Dimension Switcher (only for array algorithms) */}
          {algo?.type === "array" && (
            <div className="flex justify-center">
              <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            </div>
          )}

          {/* Central Visualizer Stage */}
          <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-4 sm:p-6 transition-all">
            <div className="min-h-[280px] sm:min-h-[320px] flex items-center justify-center">
              {Visualizer && stepper.step ? (
                <Visualizer step={stepper.step} />
              ) : (
                <div className="text-center py-12 px-4 space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-2xl mb-3">
                    🚀
                  </div>
                  <p className="text-sm font-medium text-slate-300">
                    No active visualization running
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Select your algorithm, tweak the input if desired, and click <span className="text-indigo-400 font-semibold">"Generate & Run Visualization"</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Step HUD Console */}
            <StepInfo
              message={stepper.step?.message || ''}
              current={stepper.total > 0 ? stepper.i + 1 : 0}
              total={stepper.total}
            />

            {/* Playback Controls Deck */}
            <Controls
              onPrev={stepper.prev}
              onNext={stepper.next}
              onReset={stepper.reset}
              canPrev={stepper.i > 0}
              canNext={stepper.i < stepper.total - 1}
              isPlaying={stepper.isPlaying}
              onTogglePlay={stepper.togglePlay}
              speed={stepper.speed}
              onSpeedChange={stepper.setSpeed}
              currentStep={stepper.i}
              totalSteps={stepper.total}
              onSeek={stepper.goTo}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-4 text-center text-xs font-mono text-slate-500">
        DSA Visualizer • Bubble, Selection, Insertion, Linear/Binary Search, BFS, DFS, BST
      </footer>
    </div>
  )
}

export default App