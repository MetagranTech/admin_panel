import React, { useState } from 'react';
import { Image } from 'lucide-react';

export default function ProviderManagement() {
  const [providers, setProviders] = useState([
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      categories: 'Electrician', 
      status: 'pending', 
      rating: 4.5,
      idProof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      skillProof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
    },
    { id: 2, name: 'Amit Kumar', categories: 'Plumbing', status: 'active', rating: 4.8 },
  ]);

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-8">Service Providers</h3>
      <div className="grid grid-cols-1 gap-6">
        {providers.map(provider => (
          <div key={provider.id} className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-slate-200" />
                <div>
                  <h4 className="font-bold text-lg">{provider.name}</h4>
                  <p className="text-sm text-slate-500">{provider.categories}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-amber-500 font-bold">★ {provider.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  provider.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {provider.status}
                </span>
              </div>
            </div>

            {provider.status === 'pending' && (
              <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                  <a href={provider.idProof} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    <Image size={16} /> View ID Proof
                  </a>
                  <a href={provider.skillProof} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    <Image size={16} /> View Skill Proof
                  </a>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 bg-error-light text-error rounded-xl text-sm font-bold hover:bg-error/10">Reject</button>
                  <button className="px-6 py-2 bg-success text-white rounded-xl text-sm font-bold hover:bg-success-dark">Approve Technician</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
