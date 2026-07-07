"use client";

import { motion } from "framer-motion";
import { Star, Music, Briefcase, Megaphone, Smartphone, Users, Video, ShoppingCart, Handshake, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Premium Event Management",
    description: "Flawless execution of luxury events tailored to your unique requirements.",
    icon: Star,
  },
  {
    title: "Devotional & Cultural Concerts",
    description: "Professionally managed Bhajan Concerts and cultural events celebrating spirituality and tradition.",
    icon: Music,
  },
  {
    title: "Corporate Event Planning",
    description: "Comprehensive management for conferences, seminars, product launches, and corporate gatherings.",
    icon: Briefcase,
  },
  {
    title: "Digital Marketing & Branding",
    description: "Strategic campaigns designed to elevate your brand presence and drive measurable growth.",
    icon: Megaphone,
  },
  {
    title: "Social Media Management",
    description: "Engaging content, community management, and data-driven strategies for all social platforms.",
    icon: Smartphone,
  },
  {
    title: "Influencer Marketing",
    description: "Connecting brands with the right voices to amplify reach and build authentic trust.",
    icon: Users,
  },
  {
    title: "Creative Content Production",
    description: "High-quality video, photography, and graphic design that tells your brand's story.",
    icon: Video,
  },
  {
    title: "E-commerce Business Solutions",
    description: "End-to-end solutions for modern online platforms, technology-driven systems, and sales strategies.",
    icon: ShoppingCart,
  },
  {
    title: "Brand Partnerships & Sponsorship Management",
    description: "Creating valuable opportunities for sponsors and business partners through high-visibility events.",
    icon: Handshake,
  },
  {
    title: "Business Consulting & Growth Strategy",
    description: "Expert guidance to help brands achieve sustainable success and market dominance.",
    icon: TrendingUp,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Services() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-premiumBlack/60">
            A fusion of rigorous data analytics and unbridled creative luxury. We provide complete solutions across event management and digital strategy.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-8 rounded-3xl border border-black/5 hover:border-gold/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-premiumBlack mb-4">{service.title}</h3>
              <p className="text-premiumBlack/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <Button size="lg" className="bg-gold text-black rounded-full px-12 h-14 text-lg font-semibold hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Book a Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
