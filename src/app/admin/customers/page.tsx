"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Phone, MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockCustomers = [
  { id: "CUST-001", name: "Arjun Mehta", email: "arjun@example.com", phone: "+91 9876543210", totalBookings: 3, totalSpent: "₹15,00,000", joinedAt: "Jan 12, 2025" },
  { id: "CUST-002", name: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543211", totalBookings: 1, totalSpent: "₹12,00,000", joinedAt: "Aug 05, 2026" },
  { id: "CUST-003", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 9876543212", totalBookings: 5, totalSpent: "₹45,50,000", joinedAt: "Mar 22, 2024" },
  { id: "CUST-004", name: "Neha Gupta", email: "neha@example.com", phone: "+91 9876543213", totalBookings: 2, totalSpent: "₹8,00,000", joinedAt: "Nov 01, 2025" },
];

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Customers (CRM)</h2>
          <p className="text-white/60">View and manage your client database and their history.</p>
        </div>
        <Button className="bg-gold hover:bg-gold-dark text-black font-semibold">
          Add Customer
        </Button>
      </div>

      <div className="glass p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <Input 
              placeholder="Search customers..." 
              className="pl-10 bg-black/50 border-white/10 focus-visible:ring-gold text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-sm">
                <th className="pb-3 px-4 font-medium">Customer</th>
                <th className="pb-3 px-4 font-medium">Contact</th>
                <th className="pb-3 px-4 font-medium">Bookings</th>
                <th className="pb-3 px-4 font-medium">Total Value</th>
                <th className="pb-3 px-4 font-medium">Joined</th>
                <th className="pb-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockCustomers.map((customer, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-black font-bold text-lg">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{customer.name}</div>
                        <div className="text-white/50 text-xs">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-white/70 mb-1"><Mail size={14} /> {customer.email}</div>
                    <div className="flex items-center gap-2 text-white/70"><Phone size={14} /> {customer.phone}</div>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    <span className="bg-white/10 px-3 py-1 rounded-full">{customer.totalBookings} Events</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gold">{customer.totalSpent}</td>
                  <td className="py-4 px-4 text-white/50">{customer.joinedAt}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-white" title="View Profile"><FileText size={16} /></button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-white"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
