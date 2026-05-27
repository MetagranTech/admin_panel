import React from 'react';
import { Image } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusItem from '../components/StatusItem';

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard title="Total Bookings" value="128" change="+12%" />
      <StatCard title="Active Service Men" value="45" change="+5%" />
      <StatCard title="Total Revenue" value="₹84,200" change="+18%" />
      
      <div className="col-span-1 md:col-span-2 card">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between py-3 border-bottom border-slate-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Image size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Slideshow Update</p>
                  <p className="text-sm text-slate-500">Row 3 images updated successfully</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-6">Platform Status</h3>
        <div className="space-y-6">
          <StatusItem label="Customer App" status="Online" color="success" />
          <StatusItem label="Service Man App" status="Online" color="success" />
          <StatusItem label="Firebase Backend" status="Online" color="success" />
        </div>
      </div>
    </div>
  );
}
