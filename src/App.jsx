import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Image, 
  Settings, 
  Users, 
  Wrench, 
  LogOut,
  Plus,
  Save,
  Trash2,
  ChevronRight,
  Upload,
  Calendar,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="text-[#1068A8]">Step</span> In
          </h1>
          <p className="text-xs text-slate-400 font-medium tracking-widest mt-1 uppercase">Admin Center</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavItem 
            active={activeTab === 'slideshow'} 
            onClick={() => setActiveTab('slideshow')}
            icon={<Image size={20} />} 
            label="Slideshow Controls" 
          />
          <NavItem 
            active={activeTab === 'services'} 
            onClick={() => setActiveTab('services')}
            icon={<Settings size={20} />} 
            label="Service Pricing" 
          />
          <NavItem 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')}
            icon={<Calendar size={20} />} 
            label="Bookings" 
          />
          <NavItem 
            active={activeTab === 'revenue'} 
            onClick={() => setActiveTab('revenue')}
            icon={<BarChart3 size={20} />} 
            label="Revenue Reports" 
          />
          <NavItem 
            active={activeTab === 'complaints'} 
            onClick={() => setActiveTab('complaints')}
            icon={<MessageSquare size={20} />} 
            label="Complaints" 
          />
          <NavItem 
            active={activeTab === 'servicemen'} 
            onClick={() => setActiveTab('servicemen')}
            icon={<Users size={20} />} 
            label="Service Providers" 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-error transition-colors w-full">
            <LogOut size={20} />
            <span className="font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 capitalize">{activeTab.replace('_', ' ')}</h2>
            <p className="text-slate-500 mt-1">Manage your platform controls here.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
              AD
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'slideshow' && <SlideshowControls />}
        {activeTab === 'services' && <ServiceManagement />}
        {activeTab === 'bookings' && <BookingManagement />}
        {activeTab === 'revenue' && <RevenueDashboard />}
        {activeTab === 'complaints' && <ComplaintsManagement />}
        {activeTab === 'servicemen' && <ProviderManagement />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
        active 
          ? 'bg-[#1068A8] text-white shadow-lg shadow-blue-100' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard title="Total Bookings" value="128" change="+12%" />
      <StatCard title="Active Service Men" value="45" change="+5%" />
      <StatCard title="Total Revenue" value="₹84,200" change="+18%" />
      
      <div className="col-span-1 md:col-span-2 card">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between py-3 border-bottom border-slate-50 last:border-0">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Image size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Slideshow Update</p>
                  <p className="text-sm text-slate-500">Row 3 images updated successfully</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-6">Platform Status</h3>
        <div className="space-y-6">
          <StatusItem label="Customer App" status="Online" color="success" />
          <StatusItem label="Service Man App" status="Online" color="success" />
          <StatusItem label="Firebase Backend" status="Online" color="success" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="card hover:shadow-xl transition-shadow cursor-pointer group">
      <p className="text-slate-500 font-medium text-sm mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-4xl font-bold text-slate-800 font-sans">{value}</h4>
        <span className="text-success font-bold text-sm mb-1">{change}</span>
      </div>
    </div>
  );
}

function StatusItem({ label, status, color }) {
  const colors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500'
  };
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${colors[color]}`}></div>
        <span className="text-sm font-bold text-slate-800">{status}</span>
      </div>
    </div>
  );
}

function SlideshowControls() {
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

function ServiceManagement() {
  const services = [
    { id: 1, name: 'Electrician', price: '499', category: 'Repair', icon: 'bolt' },
    { id: 2, name: 'Plumbing', price: '399', category: 'Repair', icon: 'droplet' },
    { id: 3, name: 'Cleaning', price: '799', category: 'Maintenance', icon: 'sparkles' },
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold text-slate-800">Master Services List</h3>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-xs font-bold tracking-widest uppercase border-b border-slate-100">
              <th className="pb-4 px-4">Service Name</th>
              <th className="pb-4 px-4">Category</th>
              <th className="pb-4 px-4">Base Price</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                      <Settings size={20} />
                    </div>
                    <span className="font-bold text-slate-800">{service.name}</span>
                  </div>
                </td>
                <td className="py-5 px-4 font-medium text-slate-500">{service.category}</td>
                <td className="py-5 px-4 font-bold text-slate-800">₹{service.price}</td>
                <td className="py-5 px-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">Active</span>
                </td>
                <td className="py-5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"><Settings size={18} /></button>
                    <button className="p-2 hover:bg-rose-100 rounded-lg text-error transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 'HSI123456', customer: 'John Doe', service: 'AC Repair', status: 'pending', date: '2024-05-10', amount: '₹1,299' },
    { id: 'HSI789012', customer: 'Jane Smith', service: 'Plumbing', status: 'accepted', date: '2024-05-09', amount: '₹599' },
  ]);

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-8">All Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
              <th className="pb-4 px-4">Booking ID</th>
              <th className="pb-4 px-4">Customer</th>
              <th className="pb-4 px-4">Service</th>
              <th className="pb-4 px-4">Date</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} className="border-b border-slate-50">
                <td className="py-4 px-4 font-bold text-primary">{booking.id}</td>
                <td className="py-4 px-4">{booking.customer}</td>
                <td className="py-4 px-4">{booking.service}</td>
                <td className="py-4 px-4">{booking.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-bold">{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProviderManagement() {
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
                  <a href={provider.idProof} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    <Image size={16} /> View ID Proof
                  </a>
                  <a href={provider.skillProof} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
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

function RevenueDashboard() {
  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value="₹12,450" change="+8%" />
        <StatCard title="Platform Fees" value="₹1,245" change="+5%" />
        <StatCard title="Technician Payouts" value="₹9,800" change="+12%" />
        <StatCard title="Net Profit" value="₹1,405" change="+4%" />
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-8">Weekly Revenue Growth</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#F1F5F9' }}
              />
              <Bar dataKey="revenue" fill="#1068A8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([
    { id: 'C101', customer: 'John Doe', subject: 'Late Arrival', status: 'pending', date: '2024-05-12' },
    { id: 'C102', customer: 'Sarah Smith', subject: 'Wrong Pricing', status: 'resolved', date: '2024-05-11' },
  ]);

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-8">Customer Complaints</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
              <th className="pb-4 px-4">Ticket ID</th>
              <th className="pb-4 px-4">Customer</th>
              <th className="pb-4 px-4">Subject</th>
              <th className="pb-4 px-4">Date</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map(complaint => (
              <tr key={complaint.id} className="border-b border-slate-50">
                <td className="py-4 px-4 font-bold text-slate-800">{complaint.id}</td>
                <td className="py-4 px-4">{complaint.customer}</td>
                <td className="py-4 px-4">{complaint.subject}</td>
                <td className="py-4 px-4">{complaint.date}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    complaint.status === 'pending' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button className="text-primary font-bold hover:underline">Resolve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
