"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Crown, Target, Music, Megaphone, TrendingUp, Sparkles, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef } from "react";

const pillars = [
  {
    title: "Premium Events",
    desc: "From large-scale cultural festivals to devotional Bhajan concerts and corporate galas, we execute with flawless precision.",
    icon: Star
  },
  {
    title: "Digital Dominance",
    desc: "Strategic branding, performance marketing, and social media dominance that guarantees long-term brand success.",
    icon: Megaphone
  },
  {
    title: "Business Growth",
    desc: "Complete e-commerce solutions and technology-driven strategies to elevate brands to their peak potential.",
    icon: TrendingUp
  }
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-beige-soft text-premiumBlack selection:bg-gold selection:text-white">
      
      {/* CLASSIC HERO SECTION */}
      <section ref={containerRef} className="pt-32 md:pt-48 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
                <Crown className="w-4 h-4 text-gold mr-2" />
                <span className="text-gold font-medium tracking-[0.2em] text-xs uppercase">Our Legacy</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter leading-tight">
                A Tradition of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic">Excellence</span>
              </h1>
              
              <p className="text-lg text-premiumBlack/70 font-light max-w-xl leading-relaxed">
                We are a premier event management and digital marketing agency. 
                Dedicated to crafting timeless experiences and elevating brands 
                through innovative, professional, and breathtaking execution.
              </p>
              
              <div className="flex gap-4 pt-4">
                <Link href="/services">
                  <Button size="lg" className="bg-gold text-black hover:bg-premiumBlack hover:text-white rounded-none px-8 font-medium uppercase tracking-wider">
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gold/10 mix-blend-multiply z-10" />
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                alt="Premium Events"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-white/40 z-20 pointer-events-none" />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT - CLASSIC QUOTE */}
      <section className="py-24 relative bg-beige-soft">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Sparkles className="w-8 h-8 text-gold mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-heading font-light leading-tight mb-8">
              "Satisfying consumers with <span className="text-gold italic font-semibold">less time</span> and with <span className="text-gold italic font-semibold">100 percent efficiency</span>."
            </h2>
            <div className="w-24 h-px bg-gold/30 mx-auto" />
            <p className="mt-8 text-premiumBlack/50 tracking-[0.2em] uppercase text-sm">Our Core Mission</p>
          </motion.div>
        </div>
      </section>

      {/* RICH SPLIT LAYOUT */}
      <section className="py-24 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/5 -z-10" />
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Classic Golden Frame */}
              <div className="absolute -inset-4 border border-gold/20 rounded-sm translate-x-4 translate-y-4 -z-10" />
              <div className="absolute -inset-4 border border-gold/10 rounded-sm -translate-x-2 -translate-y-2 -z-10" />
              
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative bg-black/5">
                <img 
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop" 
                  alt="Premium Event Management" 
                  className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-sm text-gold tracking-[0.2em] uppercase mb-4">Who We Are</h3>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                  Crafting Timeless <br/> <span className="italic text-premiumBlack/50">Experiences.</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-premiumBlack/70 leading-relaxed font-light">
                <p>
                  <span className="text-4xl font-heading text-gold float-left mr-3 leading-none">W</span>e are a dynamic and forward-thinking company dedicated to creating exceptional experiences through innovative event management, strategic digital marketing, and modern business solutions. 
                </p>
                <p>
                  Founded with a vision to blend creativity, technology, and sheer professionalism, our organization is committed to delivering high-quality services that inspire, engage, and create lasting value. Every project deserves a unique approach, combining innovative ideas with flawless execution.
                </p>
                <p>
                  One of our flagship initiatives is the organization of premium devotional and cultural events that celebrate spirituality and tradition. Through professionally managed Bhajan Concerts and Cultural festivals, we provide audiences with unforgettable experiences while securing valuable branding opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PILLARS OF EXCELLENCE */}
      <section className="py-32 relative bg-beige-dark border-y border-black/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Pillars of Excellence</h2>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group p-10 border border-black/10 bg-[#F5F5DC] hover:border-gold/30 transition-colors duration-500"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <pillar.icon className="w-10 h-10 text-gold mb-8 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-heading font-bold mb-4">{pillar.title}</h3>
                <p className="text-premiumBlack/60 leading-relaxed font-light">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & CONCLUSION */}
      <section className="py-32 relative bg-beige-soft">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 border border-gold/20 bg-gold/[0.02] relative"
          >
            {/* Classic top ornament */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-beige-soft px-4">
              <Star className="w-8 h-8 text-gold" />
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gold mb-8">Our Vision</h2>
            <p className="text-lg text-premiumBlack/80 leading-relaxed font-light mb-8">
              At the heart of our company lies an uncompromising commitment to excellence, transparency, and innovation. We believe in building long-term relationships with clients, partners, artists, and sponsors by consistently delivering quality.
            </p>
            <p className="text-lg text-premiumBlack/80 leading-relaxed font-light mb-12">
              Our vision is to become India's most trusted pinnacle in event management, digital marketing, and business development—creating meaningful experiences and helping brands achieve absolute, sustainable success.
            </p>

            <Link href="/contact">
              <Button size="lg" className="bg-gold text-black hover:bg-premiumBlack hover:text-white rounded-none px-12 h-14 text-lg font-medium tracking-wide uppercase transition-all duration-300">
                Partner With Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
