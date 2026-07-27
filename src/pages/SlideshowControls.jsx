import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Link2, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { getBanners, updateBanners, uploadBanner } from '../api';

const empty = { row3: [], row5: [] };

export default function SlideshowControls() {
  const [banners, setBanners] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    try {
      const response = await getBanners();
      setBanners({
        row3: Array.isArray(response.data?.banners?.row3) ? response.data.banners.row3 : [],
        row5: Array.isArray(response.data?.banners?.row5) ? response.data.banners.row5 : [],
      });
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    }
  };

  useEffect(() => { load(); }, []);

  const update = (row, index, value) => setBanners((current) => ({
    ...current,
    [row]: current[row].map((item, itemIndex) => itemIndex === index ? value : item),
  }));

  const addUrl = (row) => setBanners((current) => ({
    ...current,
    [row]: [...current[row], ''],
  }));

  const remove = (row, index) => setBanners((current) => ({
    ...current,
    [row]: current[row].filter((_, itemIndex) => itemIndex !== index),
  }));

  const save = async () => {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      const response = await updateBanners(banners);
      setBanners(response.data.banners);
      setMessage('Slideshow saved. Pull down to refresh the Customer App home screen.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const upload = async (row, file) => {
    if (!file) return;
    setUploading(row);
    setMessage('');
    setError('');
    try {
      const response = await uploadBanner(row, file);
      setBanners(response.data.banners);
      setMessage('Image uploaded and added to the slideshow successfully.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setUploading('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Slideshow Controls</h1>
        <p className="mt-1 text-slate-500">Upload images directly or add an existing public HTTPS URL.</p>
      </div>

      {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-medium text-emerald-700">{message}</div>}
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 font-medium text-red-700">{error}</div>}

      {['row3', 'row5'].map((row) => (
        <SlideshowSection
          key={row}
          row={row}
          title={row === 'row3' ? 'Top slideshow' : 'Lower slideshow'}
          images={banners[row]}
          uploading={uploading === row}
          onUpload={(file) => upload(row, file)}
          onAddUrl={() => addUrl(row)}
          onUpdate={(index, value) => update(row, index, value)}
          onRemove={(index) => remove(row, index)}
        />
      ))}

      <button className="btn btn-primary" disabled={saving || Boolean(uploading)} onClick={save}>
        {saving ? 'Saving…' : 'Save URL changes & removals'}
      </button>
    </div>
  );
}

function SlideshowSection({ row, title, images, uploading, onUpload, onAddUrl, onUpdate, onRemove }) {
  const picker = useRef(null);
  return (
    <section className="card space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">JPG, PNG or WEBP • Maximum 8 MB • Up to 10 images</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={picker}
            className="hidden"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              onUpload(event.target.files?.[0]);
              event.target.value = '';
            }}
          />
          <button className="btn btn-primary" disabled={uploading || images.length >= 10} onClick={() => picker.current?.click()}>
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />}
            {uploading ? 'Uploading…' : 'Upload image'}
          </button>
          <button className="btn" disabled={images.length >= 10} onClick={onAddUrl}>
            <Link2 size={18} /> Add URL
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 py-12 text-center text-slate-400">
          <ImagePlus className="mx-auto mb-3" size={34} />
          No slideshow images yet
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {images.map((url, index) => (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50" key={`${row}-${index}`}>
              <div className="aspect-[16/7] bg-slate-100">
                {url ? (
                  <img src={url} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">Enter an HTTPS URL below</div>
                )}
              </div>
              <div className="flex gap-2 p-3">
                <input
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white p-2 text-sm"
                  value={url}
                  placeholder="https://…"
                  onChange={(event) => onUpdate(index, event.target.value)}
                />
                <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" title="Remove image" onClick={() => onRemove(index)}>
                  <Trash2 size={19} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
