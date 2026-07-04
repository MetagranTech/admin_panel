import React, { useEffect, useState } from 'react';
import { getProviders, updateProviderStatus } from '../api';

export default function ProviderManagement() {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const load = () => getProviders().then((r) => setProviders(r.data.providers)).catch((e) => setError(e.response?.data?.message || e.message));
  useEffect(load, []);
  const changeStatus = async (id, status) => {
    const reason = status === 'pending' ? window.prompt('Rejection reason') : undefined;
    if (status === 'pending' && !reason) return;
    await updateProviderStatus(id, status, reason); load();
  };
  return <div className="space-y-4"><h3 className="text-2xl font-bold">Service Providers</h3>{error && <p className="text-red-600">{error}</p>}
    {providers.map((provider) => <div className="card" key={provider._id}>
      <div className="flex flex-wrap justify-between gap-4"><div><h4 className="text-lg font-bold">{provider.name}</h4><p>{provider.phone} • {provider.categories?.join(', ')}</p><p>KYC: {provider.kycDetails?.status || 'not uploaded'} • Account: {provider.status}</p></div>
      <div className="space-x-2">
        {provider.kycDetails?.idProofUrl && <a className="btn" href={provider.kycDetails.idProofUrl} target="_blank" rel="noreferrer">ID proof</a>}
        {provider.kycDetails?.skillProofUrl && <a className="btn" href={provider.kycDetails.skillProofUrl} target="_blank" rel="noreferrer">Skill proof</a>}
        {provider.status !== 'active' && <button className="btn btn-primary" onClick={() => changeStatus(provider._id, 'active')}>Approve</button>}
        {provider.status !== 'suspended' && <button className="btn" onClick={() => changeStatus(provider._id, 'suspended')}>Suspend</button>}
        {provider.status === 'pending' && <button className="btn" onClick={() => changeStatus(provider._id, 'pending')}>Reject KYC</button>}
      </div></div>
    </div>)}
  </div>;
}
