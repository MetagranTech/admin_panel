import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardOverview from './pages/DashboardOverview';
import SlideshowControls from './pages/SlideshowControls';
import ServiceManagement from './pages/ServiceManagement';
import BookingManagement from './pages/BookingManagement';
import RevenueDashboard from './pages/RevenueDashboard';
import ComplaintsManagement from './pages/ComplaintsManagement';
import ProviderManagement from './pages/ProviderManagement';
import NotificationsManagement from './pages/NotificationsManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="slideshow" element={<SlideshowControls />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="revenue" element={<RevenueDashboard />} />
          <Route path="complaints" element={<ComplaintsManagement />} />
          <Route path="servicemen" element={<ProviderManagement />} />
          <Route path="notifications" element={<NotificationsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
