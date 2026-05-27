import React from 'react';

export default function StatusItem({ label, status, color }) {
  const colors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500'
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${colors[color]}`}></div>
        <span className="text-sm font-bold text-slate-800">{status}</span>
      </div>
    </div>
  );
}
