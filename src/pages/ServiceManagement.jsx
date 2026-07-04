import React, { useEffect, useState } from 'react';
import { createService, deleteService, getServices, updateService } from '../api';

const categories = ['Electrician', 'Plumbing', 'AC Repair', 'Fridge Repair', 'Washing Machine Repair', 'Tank Cleaning', 'Bathroom Cleaning', 'Home Cleaning'];
const empty = { name: '', description: '', category: 'Electrician', basePrice: 499, pricingType: 'inspection', gstPercentage: 18, platformFee: 50, imageUrl: '' };

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const load = () => getServices()
    .then((r) => setServices(Array.isArray(r.data?.services) ? r.data.services : []))
    .catch((e) => setError(e.response?.data?.message || e.message));
  useEffect(() => { load(); }, []);
  const save = async (event) => {
    event.preventDefault(); setError('');
    try { editing ? await updateService(editing, form) : await createService(form); setForm(empty); setEditing(null); load(); }
    catch (e) { setError(e.response?.data?.message || e.message); }
  };
  const edit = (service) => { setEditing(service._id); setForm({ ...empty, ...service }); };
  return <div className="grid lg:grid-cols-3 gap-6">
    <form onSubmit={save} className="card space-y-3"><h3 className="text-xl font-bold">{editing ? 'Edit service' : 'Add service'}</h3>
      <input className="w-full border rounded p-3" placeholder="Service name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} required />
      <textarea className="w-full border rounded p-3" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} />
      <select className="w-full border rounded p-3" value={form.category} onChange={(e) => setForm({...form, category:e.target.value})}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
      <select className="w-full border rounded p-3" value={form.pricingType} onChange={(e) => setForm({...form, pricingType:e.target.value})}><option value="inspection">Inspection</option><option value="fixed">Fixed</option></select>
      <input className="w-full border rounded p-3" type="number" min="1" placeholder="Base price" value={form.basePrice} onChange={(e) => setForm({...form, basePrice:Number(e.target.value)})} />
      <input className="w-full border rounded p-3" type="number" min="0" placeholder="GST %" value={form.gstPercentage} onChange={(e) => setForm({...form, gstPercentage:Number(e.target.value)})} />
      <input className="w-full border rounded p-3" type="number" min="0" placeholder="Platform fee" value={form.platformFee} onChange={(e) => setForm({...form, platformFee:Number(e.target.value)})} />
      <input className="w-full border rounded p-3" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl:e.target.value})} />
      {error && <p className="text-red-600">{error}</p>}<button className="btn btn-primary w-full">Save</button>
    </form>
    <div className="card lg:col-span-2 overflow-x-auto"><h3 className="text-2xl font-bold mb-6">Services</h3><table className="w-full"><thead><tr><th className="text-left">Name</th><th>Category</th><th>Pricing</th><th>Status</th><th></th></tr></thead>
      <tbody>{services.map((service) => <tr key={service._id} className="border-t"><td className="py-4 font-bold">{service.name}</td><td>{service.category}</td><td>₹{service.basePrice} / {service.pricingType}</td><td>{service.isActive ? 'Active' : 'Inactive'}</td><td className="text-right space-x-2"><button onClick={() => edit(service)}>Edit</button>{service.isActive && <button className="text-red-600" onClick={async () => { await deleteService(service._id); load(); }}>Disable</button>}</td></tr>)}</tbody>
    </table></div>
  </div>;
}
