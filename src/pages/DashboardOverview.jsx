import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { getStats } from '../api';

export default function DashboardOverview() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { getStats().then((r) => setData(r.data)).catch((e) => setError(e.response?.data?.message || e.message)); }, []);
  if (error) return <div className="card text-red-600">{error}</div>;
  if (!data) return <div className="card">Loading dashboard…</div>;
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <StatCard title="Total Bookings" value={data.stats.totalBookings} change="Live" />
    <StatCard title="Active Service Men" value={data.stats.activeProviders} change="Live" />
    <StatCard title="Customers" value={data.stats.totalCustomers} change="Live" />
    <StatCard title="Paid Revenue" value={`₹${Number(data.stats.totalRevenue).toLocaleString('en-IN')}`} change="Live" />
    <div className="card md:col-span-4">
      <h3 className="font-bold text-xl mb-4">Last 7 days paid revenue</h3>
      {data.dailyRevenue.length === 0 ? <p className="text-slate-500">No paid transactions in this period.</p> : data.dailyRevenue.map((day) =>
        <div className="flex justify-between border-b py-3" key={day._id}><span>{day._id}</span><strong>₹{day.revenue}</strong></div>)}
    </div>
  </div>;
}
