"use client";

import Link from "next/link";
import Image from "next/image";
import { Link2, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-black/10 bg-beige-soft pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-6 mb-6 group inline-flex">
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-premiumBlack rounded-full p-3 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Image src="/logo.png" alt="Dopamine vs Ethics Logo" fill className="object-contain p-3" />
              </div>
              <span className="text-2xl md:text-3xl font-heading font-bold text-gradient tracking-tight group-hover:brightness-110 transition-all">
                Dopamine vs Ethics
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Satisfying consumers with minimum time and maximum efficiency. We are a premium event management and digital marketing agency dedicated to creating unforgettable experiences.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="https://www.instagram.com/dopamine_vs_ethics?igsh=c28zNmE0NzJpdmE1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-gold hover:border-gold/50 transition-all">
                <Link2 size={18} />
              </a>
              <a href="mailto:bookings@dopaminevsethics.com" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-gold hover:border-gold/50 transition-all">
                <Mail size={18} />
              </a>
              <a href="tel:+919623942569" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-gold hover:border-gold/50 transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6 text-premiumBlack">Quick Links</h4>
            <ul className="space-y-4">
              {["About", "Services", "Events", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-gold transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/host-event" className="text-gold font-bold hover:text-premiumBlack transition-colors text-sm flex items-center gap-2">
                  Host Your Event With Us &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-6 text-premiumBlack">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>bookings@dopaminevsethics.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+91 9623942569</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>India (Nationwide Services)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Dopamine vs Ethics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
