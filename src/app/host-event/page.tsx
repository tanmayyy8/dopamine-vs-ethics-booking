"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, DollarSign, PartyPopper } from "lucide-react";

export default function HostEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    expectedDate: "",
    city: "",
    attendeeCount: "",
    budget: "",
    details: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/host-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit your request.");
      }

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-beige-soft flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl max-w-xl text-center shadow-xl border border-gold/30"
        >
          <div className="w-20 h-20 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper size={40} />
          </div>
          <h2 className="text-4xl font-heading font-bold text-premiumBlack mb-4">Request Received!</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Thank you for choosing Dopamine vs Ethics. Our luxury event planning team will review your requirements and contact you within 24 hours to discuss your vision.
          </p>
          <Button onClick={() => window.location.href = "/"} className="bg-gold text-black rounded-full px-8 h-12 font-bold hover:scale-105 transition-transform">
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-beige-soft">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Host Your <span className="text-gradient">Event</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partner with us to create an unforgettable, flawlessly executed experience. Please share some initial details about your vision below.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 md:p-12 rounded-3xl shadow-lg border border-black/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Personal Details */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 text-premiumBlack border-b border-black/10 pb-2">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">Full Name *</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">Email Address *</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-premiumBlack">Phone Number *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 text-premiumBlack border-b border-black/10 pb-2">Event Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">Event Type *</label>
                  <div className="relative">
                    <PartyPopper className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <select required name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-white/50 border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="" disabled>Select Event Type</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Bhajan / Devotional">Bhajan / Devotional</option>
                      <option value="Live Concert">Live Concert</option>
                      <option value="Wedding / Pre-Wedding">Wedding / Pre-Wedding</option>
                      <option value="Private Party">Private Party</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">Expected Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input name="expectedDate" value={formData.expectedDate} onChange={handleChange} type="date" className="w-full bg-white/50 border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">City / Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-white/50 border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors" placeholder="e.g. Mumbai, Pune" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-premiumBlack">Expected Attendees</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <select name="attendeeCount" value={formData.attendeeCount} onChange={handleChange} className="w-full bg-white/50 border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="" disabled>Select Guest Count</option>
                      <option value="Under 50">Under 50</option>
                      <option value="50 - 200">50 - 200</option>
                      <option value="200 - 500">200 - 500</option>
                      <option value="500 - 1000">500 - 1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-premiumBlack">Estimated Budget</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-white/50 border border-black/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none">
                      <option value="" disabled>Select Budget Range</option>
                      <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                      <option value="₹1 Lakh - ₹5 Lakhs">₹1 Lakh - ₹5 Lakhs</option>
                      <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
                      <option value="₹15 Lakhs+">₹15 Lakhs+</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-premiumBlack">Vision / Additional Details *</label>
                  <textarea required name="details" value={formData.details} onChange={handleChange} rows={5} className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about the vibe, special requirements, or any specific ideas you have..." />
                </div>
              </div>
            </div>

            {status === "error" && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <div className="pt-4 text-center">
              <Button disabled={status === "loading"} type="submit" size="lg" className="w-full md:w-auto bg-gold hover:bg-gold-dark text-black rounded-full px-12 h-14 text-lg font-bold transition-all shadow-xl hover:scale-105 disabled:opacity-70 disabled:hover:scale-100">
                {status === "loading" ? "Submitting Request..." : "Submit Event Inquiry"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
