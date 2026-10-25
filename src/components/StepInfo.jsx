import React from 'react'

const StepInfo = ({ message, current, total }) => {
  const hasSteps = total > 0;

  return (
    <div className="w-full max-w-3xl mx-auto my-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-lg">
        {/* Step Badge */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasSteps ? 'bg-indigo-400' : 'bg-slate-500'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${hasSteps ? 'bg-indigo-500' : 'bg-slate-600'}`}></span>
          </span>
          <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {hasSteps ? `STEP ${current} OF ${total}` : 'READY'}
          </span>
        </div>

        {/* Dynamic Explanation Text */}
        <p className="text-sm font-medium text-slate-200 text-center sm:text-right flex-1 truncate px-2" title={message}>
          {message || (hasSteps ? "Algorithm step execution" : "Press 'Visualize' to begin the step-by-step walkthrough.")}
        </p>
      </div>
    </div>
  )
}

export default StepInfo