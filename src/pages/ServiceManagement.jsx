import React from 'react';
import { Plus, Settings, Trash2 } from 'lucide-react';

export default function ServiceManagement() {
  const services = [
    { id: 1, name: 'Electrician', price: '499', category: 'Repair', icon: 'bolt' },
    { id: 2, name: 'Plumbing', price: '399', category: 'Repair', icon: 'droplet' },
    { id: 3, name: 'Cleaning', price: '799', category: 'Maintenance', icon: 'sparkles' },
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800">Master Services List</h3>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-xs font-bold tracking-widest uppercase border-b border-slate-100">
              <th className="pb-4 px-4">Service Name</th>
              <th className="pb-4 px-4">Category</th>
              <th className="pb-4 px-4">Base Price</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                      <Settings size={20} />
                    </div>
                    <span className="font-bold text-slate-800">{service.name}</span>
                  </div>
                </td>
                <td className="py-5 px-4 font-medium text-slate-500">{service.category}</td>
                <td className="py-5 px-4 font-bold text-slate-800">₹{service.price}</td>
                <td className="py-5 px-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Active</span>
                </td>
                <td className="py-5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"><Settings size={18} /></button>
                    <button className="p-2 hover:bg-rose-100 rounded-lg text-error transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
