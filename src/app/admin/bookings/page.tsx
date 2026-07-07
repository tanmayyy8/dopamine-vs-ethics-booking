"use client";

import { useState, useEffect } from "react";
import { Ticket, Search, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Bookings & Orders</h2>
          <p className="text-white/60">View all ticket sales and customer orders.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-white/50" />
          <input 
            type="text" 
            placeholder="Search booking ID..."
            className="bg-transparent border-none focus:outline-none text-sm text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/50 text-sm mb-2 uppercase tracking-wider">Total Revenue</h3>
          <div className="text-3xl font-bold text-gold">
            ₹{bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/50 text-sm mb-2 uppercase tracking-wider">Total Tickets</h3>
          <div className="text-3xl font-bold">
            {bookings.reduce((sum, b) => sum + (b._count?.tickets || 0), 0)}
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/10">
          <h3 className="text-white/50 text-sm mb-2 uppercase tracking-wider">Total Orders</h3>
          <div className="text-3xl font-bold">{bookings.length}</div>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Booking ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Customer</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Event</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Tickets</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Amount</th>
              <th className="px-6 py-4 text-sm font-semibold text-white/70">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-12 text-white/50">Loading orders...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-white/50">No bookings found.</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-gold text-sm">{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{booking.customerName}</div>
                    <div className="text-xs text-white/50">{booking.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm">{booking.event?.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {booking._count?.tickets} <Ticket className="w-3 h-3 inline ml-1 text-white/50" />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">₹{booking.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      booking.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {booking.status === 'CONFIRMED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
