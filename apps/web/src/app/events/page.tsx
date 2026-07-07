"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        
        if (res.ok && Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]); // Fallback to empty array on error
          console.error("API returned an error or invalid data:", data);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
        setEvents([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-heading font-bold mb-4"
            >
              Featured <span className="text-gradient">Events</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-premiumBlack/70 max-w-xl"
            >
              Explore our portfolio of meticulously crafted experiences.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 md:mt-0">
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full border-black/20 text-premiumBlack hover:bg-black/5">All Events</Button>
              <Button variant="outline" className="rounded-full border-black/20 text-premiumBlack hover:bg-black/5">Corporate</Button>
              <Button variant="outline" className="rounded-full border-black/20 text-premiumBlack hover:bg-black/5">Concerts</Button>
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 rounded-full border-4 border-gold/30 border-t-gold animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-32 text-premiumBlack/50">
            No events found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, i) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer relative overflow-hidden rounded-[2rem] aspect-[4/3]"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'})` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/90 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="inline-block px-4 py-1.5 bg-gold text-premiumBlack rounded-full font-extrabold text-[10px] tracking-widest uppercase mb-4 shadow-md">
                      {event.category}
                    </span>
                    <h3 className="text-3xl font-heading font-bold text-premiumBlack mb-4 group-hover:text-gold transition-colors">{event.title}</h3>
                    
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <div className="flex items-center gap-2 text-premiumBlack/80">
                        <Calendar className="w-4 h-4 text-gold" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-premiumBlack/80">
                        <MapPin className="w-4 h-4 text-gold" />
                        {event.venue?.name || "TBA"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
