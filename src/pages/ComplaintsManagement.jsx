import React, { useEffect, useState } from 'react';
import { getComplaints, resolveComplaint } from '../api';

export default function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const load = () => getComplaints().then((r) => setComplaints(r.data.complaints)).catch((e) => setError(e.response?.data?.message || e.message));
  useEffect(load, []);
  const resolve = async (id) => { const resolution = window.prompt('Resolution details'); if (!resolution) return; await resolveComplaint(id, resolution); load(); };
  return <div className="card overflow-x-auto"><h3 className="text-2xl font-bold mb-6">Customer Complaints</h3>{error && <p className="text-red-600">{error}</p>}
    <table className="w-full"><thead><tr className="text-left"><th>Customer</th><th>Booking</th><th>Subject</th><th>Description</th><th>Status</th><th></th></tr></thead><tbody>
      {complaints.map((item) => <tr className="border-t" key={item._id}><td className="py-4">{item.user?.name}<small className="block">{item.user?.phone}</small></td><td>{item.booking?.bookingId}</td><td>{item.subject}</td><td>{item.description}</td><td>{item.status}</td><td>{item.status !== 'resolved' && <button className="btn btn-primary" onClick={() => resolve(item._id)}>Resolve</button>}</td></tr>)}
    </tbody></table>
  </div>;
}
