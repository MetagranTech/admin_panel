import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStats } from '../api';

export default function RevenueDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { getStats().then((r) => setData(r.data)); }, []);
  if (!data) return <div className="card">Loading revenue…</div>;
  const chart = data.dailyRevenue.map((item) => ({ name: item._id, revenue: item.revenue }));
  return <div className="space-y-8">
    <div className="card"><p className="text-slate-500">Total captured revenue</p><h2 className="text-4xl font-bold">₹{Number(data.stats.totalRevenue).toLocaleString('en-IN')}</h2></div>
    <div className="card"><h3 className="text-xl font-bold mb-6">Last 7 days</h3><div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%"><BarChart data={chart}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="revenue" fill="#1068A8" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer>
    </div></div>
  </div>;
}
