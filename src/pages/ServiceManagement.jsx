import React, { useEffect, useState } from 'react';
import { createService, deleteService, getServices, updateService } from '../api';

const defaultCategories = ['Electrician', 'Plumbing', 'AC Repair', 'Fridge Repair', 'Washing Machine Repair', 'Tank Cleaning', 'Bathroom Cleaning', 'Home Cleaning'];
const defaultPricingTypes = ['inspection', 'fixed'];
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
  const categories = [...new Set([...defaultCategories, ...services.map((service) => service.category).filter(Boolean)])];
  const pricingTypes = [...new Set([...defaultPricingTypes, ...services.map((service) => service.pricingType).filter(Boolean)])];
  const gstAmount = Number(form.basePrice || 0) * Number(form.gstPercentage || 0) / 100;
  const customerTotal = Number(form.basePrice || 0) + gstAmount + Number(form.platformFee || 0);
  return <div className="grid lg:grid-cols-3 gap-6">
    <form onSubmit={save} className="card space-y-3"><h3 className="text-xl font-bold">{editing ? 'Edit service' : 'Add service'}</h3>
      <input className="w-full border rounded p-3" placeholder="Service name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} required />
      <textarea className="w-full border rounded p-3" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} />
      <label className="block text-sm font-semibold">Category
        <input
          className="mt-1 w-full border rounded p-3 font-normal"
          list="service-category-options"
          placeholder="Select or type a custom category"
          value={form.category}
          onChange={(e) => setForm({...form, category:e.target.value})}
          required
        />
        <datalist id="service-category-options">{categories.map((category) => <option key={category} value={category} />)}</datalist>
        <span className="mt-1 block text-xs font-normal text-slate-500">Choose a suggestion or type a new category.</span>
      </label>
      <label className="block text-sm font-semibold">Pricing Type
        <input
          className="mt-1 w-full border rounded p-3 font-normal"
          list="service-pricing-type-options"
          placeholder="Select or type a custom pricing type"
          value={form.pricingType}
          onChange={(e) => setForm({...form, pricingType:e.target.value})}
          required
        />
        <datalist id="service-pricing-type-options">{pricingTypes.map((type) => <option key={type} value={type} />)}</datalist>
        <span className="mt-1 block text-xs font-normal text-slate-500">Use “inspection” for the quote workflow; other values use fixed-style billing.</span>
      </label>
      <label className="block text-sm font-semibold">Base Price (₹)
        <input className="mt-1 w-full border rounded p-3 font-normal" type="number" min="1" value={form.basePrice} onChange={(e) => setForm({...form, basePrice:Number(e.target.value)})} />
      </label>
      <label className="block text-sm font-semibold">GST (%)
        <input className="mt-1 w-full border rounded p-3 font-normal" type="number" min="0" value={form.gstPercentage} onChange={(e) => setForm({...form, gstPercentage:Number(e.target.value)})} />
      </label>
      <label className="block text-sm font-semibold">Platform Fee (₹)
        <input className="mt-1 w-full border rounded p-3 font-normal" type="number" min="0" value={form.platformFee} onChange={(e) => setForm({...form, platformFee:Number(e.target.value)})} />
      </label>
      <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm">
        <p className="font-semibold">Customer Final Amount</p>
        <p>Base Price + GST + Platform Fee</p>
        <p className="mt-1 font-bold">₹{Number(form.basePrice || 0).toFixed(2)} + ₹{gstAmount.toFixed(2)} + ₹{Number(form.platformFee || 0).toFixed(2)} = ₹{customerTotal.toFixed(2)}</p>
      </div>
      <input className="w-full border rounded p-3" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl:e.target.value})} />
      {error && <p className="text-red-600">{error}</p>}<button className="btn btn-primary w-full">Save</button>
    </form>
    <section className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-6 py-5">
        <div>
          <h3 className="text-2xl font-bold">Services</h3>
          <p className="mt-1 text-sm text-slate-500">Manage service pricing and availability.</p>
        </div>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-[#1068A8]">{services.length} services</span>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Pricing</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>{services.map((service) => <tr key={service._id} className="bg-slate-50 transition-colors hover:bg-blue-50/60">
            <td className="rounded-l-xl border-y border-l border-slate-200 px-4 py-4">
              <p className="font-bold text-slate-900">{service.name}</p>
              {service.description && <p className="mt-1 max-w-xs truncate text-xs text-slate-500">{service.description}</p>}
            </td>
            <td className="border-y border-slate-200 px-4 py-4"><span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 ring-1 ring-slate-200">{service.category}</span></td>
            <td className="border-y border-slate-200 px-4 py-4"><p className="font-bold text-slate-900">₹{service.basePrice}</p><p className="text-xs capitalize text-slate-500">{service.pricingType}</p></td>
            <td className="border-y border-slate-200 px-4 py-4"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${service.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}><span className={`h-2 w-2 rounded-full ${service.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />{service.isActive ? 'Active' : 'Inactive'}</span></td>
            <td className="rounded-r-xl border-y border-r border-slate-200 px-4 py-4 text-right">
              <div className="inline-flex items-center gap-2">
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-[#1068A8]" onClick={() => edit(service)}>Edit</button>
                {service.isActive && <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100" onClick={async () => { await deleteService(service._id); load(); }}>Disable</button>}
              </div>
            </td>
          </tr>)}</tbody>
        </table>
        {!services.length && <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">No services added yet.</div>}
      </div>
    </section>
  </div>;
}
