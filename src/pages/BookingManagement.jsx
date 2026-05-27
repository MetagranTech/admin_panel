import React, { useState } from 'react';

export default function BookingManagement() {
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
