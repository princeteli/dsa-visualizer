import React from 'react'

const Controls = ({
  onPrev,
  onNext,
  onReset,
  canPrev,
  canNext,
  isPlaying = false,
  onTogglePlay,
  speed = 1,
  onSpeedChange,
  currentStep = 0,
  totalSteps = 0,
  onSeek,
}) => {
  const hasSteps = totalSteps > 0;
  const progressPercent = hasSteps ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Interactive Timeline Scrubber */}
      {hasSteps && (
        <div className="space-y-1.5 px-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Progress</span>
            <span className="text-indigo-400 font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div
            className="relative h-2.5 bg-slate-800/90 rounded-full overflow-hidden cursor-pointer border border-slate-700/60 hover:border-slate-600 transition"
            onClick={(e) => {
              if (!onSeek || !hasSteps) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetIdx = Math.round(ratio * (totalSteps - 1));
              onSeek(targetIdx);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 rounded-2xl shadow-xl">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            disabled={!hasSteps}
            title="Reset to beginning"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-xl transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Previous Step Button */}
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            title="Previous step"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-xl transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Prev</span>
          </button>

          {/* Play / Pause Toggle Button */}
          {onTogglePlay && (
            <button
              type="button"
              onClick={onTogglePlay}
              disabled={!hasSteps}
              title={isPlaying ? "Pause" : "Auto Play"}
              className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl transition duration-200 shadow-md cursor-pointer ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400/30"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-indigo-500/30"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {isPlaying ? (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
          )}

          {/* Next Step Button */}
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            title="Next step"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/60 rounded-xl transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Speed Selector Controls */}
        {onSpeedChange && (
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 px-2">Speed:</span>
            {[0.5, 1, 2, 4].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => onSpeedChange(spd)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition duration-150 cursor-pointer ${
                  speed === spd
                    ? "bg-indigo-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Controls