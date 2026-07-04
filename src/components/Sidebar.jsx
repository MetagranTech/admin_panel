import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Settings, 
  Users, 
  LogOut,
  Calendar,
  BarChart3,
  MessageSquare,
  Bell
} from 'lucide-react';

export default function Sidebar() {
  const signOut = () => {
    localStorage.removeItem('adminToken');
    window.dispatchEvent(new Event('admin-unauthorized'));
  };
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <span className="text-[#1068A8]">Step</span> In
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-widest mt-1 uppercase">Admin Center</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/slideshow" icon={<Image size={20} />} label="Slideshow Controls" />
        <NavItem to="/services" icon={<Settings size={20} />} label="Service Pricing" />
        <NavItem to="/bookings" icon={<Calendar size={20} />} label="Bookings" />
        <NavItem to="/revenue" icon={<BarChart3 size={20} />} label="Revenue Reports" />
        <NavItem to="/complaints" icon={<MessageSquare size={20} />} label="Complaints" />
        <NavItem to="/servicemen" icon={<Users size={20} />} label="Service Providers" />
        <NavItem to="/notifications" icon={<Bell size={20} />} label="Notifications" />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button onClick={signOut} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error transition-colors w-full">
          <LogOut size={20} />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, to }) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
        isActive 
          ? 'bg-[#1068A8] text-white shadow-lg shadow-blue-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </NavLink>
  );
}
