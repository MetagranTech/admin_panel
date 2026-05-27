import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <Sidebar />
      <main className="flex-1 ml-64 p-10">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
