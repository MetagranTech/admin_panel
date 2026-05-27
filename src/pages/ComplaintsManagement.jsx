import React, { useState } from 'react';

export default function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([
    { id: 'C101', customer: 'John Doe', subject: 'Late Arrival', status: 'pending', date: '2024-05-12' },
    { id: 'C102', customer: 'Sarah Smith', subject: 'Wrong Pricing', status: 'resolved', date: '2024-05-11' },
  ]);

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-8">Customer Complaints</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
              <th className="pb-4 px-4">Ticket ID</th>
              <th className="pb-4 px-4">Customer</th>
              <th className="pb-4 px-4">Subject</th>
              <th className="pb-4 px-4">Date</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id} className="border-b border-slate-50">
                <td className="py-4 px-4 font-bold text-slate-800">{complaint.id}</td>
                <td className="py-4 px-4">{complaint.customer}</td>
                <td className="py-4 px-4">{complaint.subject}</td>
                <td className="py-4 px-4">{complaint.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    complaint.status === 'pending' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-primary font-bold hover:underline">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
