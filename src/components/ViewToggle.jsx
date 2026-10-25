import React from 'react'

const ViewToggle = ({ viewMode, onChange }) => {
  return (
    <div className="flex justify-center p-1">
      <div className="inline-flex p-1 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-lg">
        <button
          type="button"
          onClick={() => onChange("2D")}
          className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            viewMode === "2D"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <span>2D Canvas</span>
        </button>

        <button
          type="button"
          onClick={() => onChange("3D")}
          className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
            viewMode === "3D"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span>3D Space</span>
        </button>
      </div>
    </div>
  )
}

export default ViewToggle