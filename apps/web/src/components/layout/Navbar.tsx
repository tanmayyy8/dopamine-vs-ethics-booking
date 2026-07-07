"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-white/40 backdrop-blur-lg border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-premiumBlack rounded-full p-2 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Image src="/logo.png" alt="Dopamine vs Ethics Logo" fill className="object-contain p-2" />
          </div>
          <span className="text-xl md:text-2xl font-heading font-bold text-gradient tracking-tight hidden sm:inline-block group-hover:brightness-110 transition-all">
            Dopamine vs Ethics
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-extrabold text-premiumBlack hover:text-gold transition-colors tracking-wider uppercase drop-shadow-sm"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/events">
            <Button className="bg-gold hover:bg-gold-dark text-black font-semibold rounded-full px-8 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-1">
              Explore Events
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl border-t border-black/10"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pb-32">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-semibold text-foreground hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/events" onClick={() => setMobileMenuOpen(false)}>
                <Button size="lg" className="bg-gold text-black mt-4 w-48">
                  Explore Events
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
