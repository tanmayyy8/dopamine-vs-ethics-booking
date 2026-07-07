"use client";

import { Plus, Calendar as CalendarIcon, MapPin, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockEvents } from "@/lib/mockData";

export default function AdminEvents() {
  const events = mockEvents;
  const loading = false;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Events Management</h2>
          <p className="text-white/60">Create and manage your upcoming events.</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-gold text-black hover:bg-white">
            <Plus className="w-4 h-4 mr-2" /> Create Event
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/50">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <CalendarIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No events found</h3>
          <p className="text-white/60 mb-6">Get started by creating your first event.</p>
          <Link href="/admin/events/new">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
              Create Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="glass p-0 rounded-2xl border border-white/10 overflow-hidden group">
              <div className="h-48 relative">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <CalendarIcon className="w-8 h-8 text-white/20" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold border border-white/10 text-white">
                    {event.category}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> 
                    {new Date(event.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> 
                    {event.venue?.name || "No venue assigned"}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gold font-semibold">Active</span>
                  <Link href={`/admin/events/${event.id}`}>
                    <Button variant="ghost" className="text-white hover:text-gold hover:bg-gold/10">Manage</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
