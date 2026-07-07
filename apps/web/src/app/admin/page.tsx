"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, CalendarCheck, DollarSign, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹24,50,000", change: "+12.5%", icon: DollarSign },
  { label: "Active Bookings", value: "145", change: "+5.2%", icon: CalendarCheck },
  { label: "Total Customers", value: "892", change: "+18.1%", icon: Users },
  { label: "Website Visitors", value: "12,400", change: "+8.4%", icon: TrendingUp },
];

const recentBookings = [
  { id: "BK-1001", customer: "Arjun Mehta", event: "Corporate Summit", date: "Aug 15, 2026", status: "Approved" },
  { id: "BK-1002", customer: "Priya Sharma", event: "Cultural Concert", date: "Sep 22, 2026", status: "Pending" },
  { id: "BK-1003", customer: "Vikram Singh", event: "Product Launch", date: "Oct 10, 2026", status: "Completed" },
  { id: "BK-1004", customer: "Neha Gupta", event: "Gala Dinner", date: "Nov 05, 2026", status: "Review" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Overview</h2>
        <p className="text-white/60">Here is what&apos;s happening with Dopamine vs Ethics today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 rounded-lg bg-gold/20 text-gold">
                <stat.icon size={24} />
              </div>
              <span className="flex items-center text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                <ArrowUpRight size={14} className="mr-1" />
                {stat.change}
              </span>
            </div>
            <h3 className="text-white/60 text-sm font-medium mb-1 relative z-10">{stat.label}</h3>
            <p className="text-3xl font-bold text-white relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings & Analytics Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Bookings</h3>
            <button className="text-gold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-sm">
                  <th className="pb-3 font-medium">Booking ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Event Type</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 font-medium">{booking.id}</td>
                    <td className="py-4">{booking.customer}</td>
                    <td className="py-4 text-white/70">{booking.event}</td>
                    <td className="py-4 text-white/70">{booking.date}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        booking.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center min-h-[300px]"
        >
          <h3 className="text-xl font-bold mb-2 self-start w-full">Revenue Growth</h3>
          <div className="flex-1 w-full flex items-center justify-center relative">
             {/* Decorative Chart Placeholder */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="w-full h-40 flex items-end justify-between px-4 gap-2">
                {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                  <div key={i} className="w-full bg-gold rounded-t-sm transition-all hover:bg-gold-light" style={{ height: `${h}%` }} />
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
