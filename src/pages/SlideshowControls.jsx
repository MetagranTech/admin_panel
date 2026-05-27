import React from 'react';
import { Upload, Settings, Trash2, Plus } from 'lucide-react';

export default function SlideshowControls() {
  return (
    <div className="space-y-10">
      <SlideshowSection 
        title="Row 3 Slideshow" 
        description="Top banners visible after the search bar." 
        images={['https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000']} 
      />
      <SlideshowSection 
        title="Row 5 Slideshow" 
        description="Promotional banners visible below the services section." 
        images={['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000']} 
      />
    </div>
  );
}

function SlideshowSection({ title, description, images }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
          <p className="text-slate-500">{description}</p>
        </div>
        <button className="btn btn-primary">
          <Upload size={18} />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((url, idx) => (
          <div key={idx} className="relative group rounded-2xl overflow-hidden border border-slate-100 aspect-video">
            <img src={url} alt="Slideshow" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button className="p-2 bg-white rounded-full text-slate-800 hover:bg-slate-100"><Settings size={18} /></button>
              <button className="p-2 bg-white rounded-full text-error hover:bg-slate-100"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all cursor-pointer aspect-video bg-slate-50">
          <Plus size={32} strokeWidth={1.5} />
          <span className="text-sm font-bold mt-2">New Slide</span>
        </div>
      </div>
    </div>
  );
}
