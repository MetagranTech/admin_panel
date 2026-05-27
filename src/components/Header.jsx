import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard';
      case '/slideshow': return 'Slideshow Controls';
      case '/services': return 'Service Pricing';
      case '/bookings': return 'Bookings';
      case '/revenue': return 'Revenue Reports';
      case '/complaints': return 'Complaints';
      case '/servicemen': return 'Service Providers';
      case '/notifications': return 'Notifications';
      default: return 'Admin Center';
    }
  };

  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 capitalize">{getPageTitle()}</h2>
        <p className="text-slate-500 mt-1">Manage your platform controls here.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
          AD
        </div>
      </div>
    </header>
  );
}
