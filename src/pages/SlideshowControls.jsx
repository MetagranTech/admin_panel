import React, { useEffect, useState } from 'react';
import { getBanners, updateBanners } from '../api';

export default function SlideshowControls() {
  const [banners, setBanners] = useState({ row3: [], row5: [] });
  const [saving, setSaving] = useState(false);
  useEffect(() => { getBanners().then((r) => setBanners(r.data.banners)); }, []);
  const update = (row, index, value) => setBanners((current) => ({ ...current, [row]: current[row].map((item, i) => i === index ? value : item) }));
  const add = (row) => setBanners((current) => ({ ...current, [row]: [...current[row], ''] }));
  const remove = (row, index) => setBanners((current) => ({ ...current, [row]: current[row].filter((_, i) => i !== index) }));
  const save = async () => { setSaving(true); try { const r = await updateBanners(banners); setBanners(r.data.banners); } finally { setSaving(false); } };
  return <div className="space-y-6">
    {['row3', 'row5'].map((row) => <div className="card" key={row}><div className="flex justify-between mb-5"><div><h3 className="text-xl font-bold">{row === 'row3' ? 'Top slideshow' : 'Lower slideshow'}</h3><p className="text-slate-500">Use public HTTPS image URLs.</p></div><button className="btn" onClick={() => add(row)}>Add image</button></div>
      <div className="space-y-3">{banners[row].map((url, index) => <div className="flex gap-3" key={index}><input className="border rounded-xl p-3 flex-1" value={url} placeholder="https://…" onChange={(e) => update(row, index, e.target.value)} /><button className="text-red-600" onClick={() => remove(row, index)}>Remove</button></div>)}</div>
    </div>)}
    <button className="btn btn-primary" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save slideshow'}</button>
  </div>;
}
