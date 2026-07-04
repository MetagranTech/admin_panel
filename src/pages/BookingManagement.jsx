import React, { useEffect, useState } from 'react';
import { getBookings } from '../api';

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    getBookings()
      .then((r) => setBookings(Array.isArray(r.data?.bookings) ? r.data.bookings : []))
      .catch((e) => setError(e.response?.data?.message || e.message));
  }, []);
  return <div className="card overflow-x-auto">
    <h3 className="text-2xl font-bold mb-6">All Bookings</h3>{error && <p className="text-red-600">{error}</p>}
    <table className="w-full"><thead><tr className="text-left border-b"><th className="p-3">Booking</th><th>Customer</th><th>Service</th><th>Provider</th><th>Status</th><th>Payment</th><th className="text-right">Total</th></tr></thead>
      <tbody>{bookings.map((booking) => <tr key={booking._id} className="border-b">
        <td className="p-3 font-bold">{booking.bookingId}</td><td>{booking.customer?.name}<small className="block">{booking.customer?.phone}</small></td>
        <td>{booking.service?.name}</td><td>{booking.provider?.name || 'Unassigned'}</td><td>{booking.status}</td><td>{booking.paymentStatus}</td>
        <td className="text-right">₹{booking.pricing?.totalAmount || 0}</td>
      </tr>)}</tbody></table>
    {!bookings.length && !error && <p className="py-16 text-center text-slate-500">No bookings found.</p>}
  </div>;
}
