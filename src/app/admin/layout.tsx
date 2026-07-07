"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck, Users, Briefcase, Settings, LogOut, Menu, X, FileText, Image as ImageIcon, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Venues", href: "/admin/venues", icon: MapPin },
  { name: "Customers (CRM)", href: "/admin/customers", icon: Users },
  { name: "Events (CMS)", href: "/admin/events", icon: Briefcase },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex text-white font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[#0A0A0A] border-r border-white/10 h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-heading font-bold text-gradient">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-gold text-black font-semibold shadow-[0_0_10px_rgba(212,175,55,0.3)]" : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#0A0A0A] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <h2 className="text-xl font-heading font-bold text-gradient">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed top-0 left-0 w-64 h-full bg-[#0A0A0A] border-r border-white/10 z-50 flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold text-gradient">Admin</h2>
                <button onClick={() => setSidebarOpen(false)}><X size={24} /></button>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive ? "bg-gold text-black font-semibold" : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <link.icon size={20} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0">
        {/* Topbar */}
        <header className="hidden md:flex h-20 border-b border-white/10 bg-[#0A0A0A]/50 backdrop-blur-md items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-2xl font-semibold">Welcome back, Admin</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold">
              A
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
