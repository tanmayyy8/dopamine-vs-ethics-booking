"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = ["Personal Details", "Event Details", "Requirements", "Confirmation"];

export default function BookEvent() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  const prev = () => setCurrentStep((p) => Math.max(p - 1, 0));

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4"
          >
            Book Your <span className="text-gradient">Event</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg">Let&apos;s craft an unforgettable experience together.</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white/10 -z-10 -translate-y-1/2" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-background p-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${i <= currentStep ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-white/10 text-white/50 border border-white/20'}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium hidden md:block ${i <= currentStep ? 'text-gold' : 'text-white/50'}`}>{step}</span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <motion.div 
          layout
          className="glass p-8 md:p-12 rounded-[2rem] relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Full Name</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Email Address</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" type="email" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Phone Number</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">WhatsApp Number</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" type="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Event Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Event Type</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" placeholder="e.g. Corporate Summit" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Event Date</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white/70">Venue/Location</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" placeholder="City, State or Specific Hotel" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Estimated Guests</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" type="number" placeholder="500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/70">Approximate Budget (INR)</label>
                      <Input className="bg-black/50 border-white/10 focus-visible:ring-gold" placeholder="e.g. 5,00,000" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-white/70">Special Requirements</label>
                      <Textarea className="bg-black/50 border-white/10 focus-visible:ring-gold min-h-[120px]" placeholder="Tell us more about your vision..." />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gradient">Ready to Submit!</h3>
                  <p className="text-white/60 mb-8 max-w-md mx-auto">Your premium event request is ready. Our executive team will review your requirements and contact you within 24 hours.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
            <Button 
              variant="outline" 
              onClick={prev} 
              disabled={currentStep === 0 || currentStep === 3}
              className="border-white/20 text-white hover:bg-white hover:text-black rounded-full px-8"
            >
              Back
            </Button>
            
            {currentStep < 3 ? (
              <Button 
                onClick={next}
                className="bg-gold hover:bg-gold-dark text-black rounded-full px-8 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                Continue
              </Button>
            ) : (
              <Button 
                className="bg-gold hover:bg-gold-dark text-black rounded-full px-8 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                onClick={() => alert("Booking submitted successfully! (Backend integration pending for demo)")}
              >
                Submit Request
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
