"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export const EventHero = ({ event }: { event: any }) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full flex items-end">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-beige-soft via-white/80 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 pb-12">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold font-bold text-sm tracking-widest uppercase mb-4 block"
        >
          {event.category}
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-heading font-bold text-premiumBlack mb-6"
        >
          {event.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6 text-premiumBlack/80"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold" />
            <span>{event.venue?.name}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
