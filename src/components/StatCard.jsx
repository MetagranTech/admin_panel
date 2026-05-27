import React from 'react';

export default function StatCard({ title, value, change }) {
  return (
    <div className="card hover:shadow-xl transition-shadow cursor-pointer group">
      <p className="text-slate-500 font-medium text-sm mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-4xl font-bold text-slate-800 font-sans">{value}</h4>
        <span className="text-success font-bold text-sm mb-1">{change}</span>
      </div>
    </div>
  );
}
