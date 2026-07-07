"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      console.error("Contact error:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-beige-soft pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold to-white">
            Get in Touch
          </h1>
          <p className="text-premiumBlack/60 max-w-2xl mx-auto text-lg">
            Have a question, want to host an event with us, or need support with your booking? 
            Our team is here to help you create unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-2xl border border-black/10 flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Our Office</h3>
                  <p className="text-premiumBlack/60 leading-relaxed">
                    123 Innovation Drive<br />
                    Tech Park, Mumbai<br />
                    India 400001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-premiumBlack/60">hello@dopaminevsethics.com</p>
                  <p className="text-premiumBlack/60">support@dopaminevsethics.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-premiumBlack/60">+91 98765 43210</p>
                  <p className="text-sm text-premiumBlack/40 mt-1">Mon-Fri, 9AM to 6PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass p-8 md:p-10 rounded-2xl border border-black/10 relative overflow-hidden">
              
              {status === "success" ? (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-premiumBlack/60 max-w-md mb-8">
                    Thank you for reaching out to Dopamine vs Ethics. Our team will get back to you within 24-48 hours.
                  </p>
                  <Button 
                    onClick={() => setStatus("idle")}
                    className="bg-black/5 hover:bg-black/10 text-premiumBlack border border-black/20"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : null}

              <h2 className="font-heading text-2xl font-bold mb-8">Send us a Message</h2>
              
              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-premiumBlack/80">Your Name <span className="text-gold">*</span></label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-premiumBlack focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-premiumBlack/80">Email Address <span className="text-gold">*</span></label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-premiumBlack focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-premiumBlack/80">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-premiumBlack focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-premiumBlack/80">Subject <span className="text-gold">*</span></label>
                    <input 
                      required
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-premiumBlack focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-premiumBlack/80">Your Message <span className="text-gold">*</span></label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-premiumBlack focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-6 rounded-xl text-base"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
