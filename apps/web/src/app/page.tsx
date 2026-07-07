"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Music, Megaphone, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const highlightServices = [
  {
    title: "Premium Event Management",
    description: "Flawless execution of luxury events, corporate gatherings, and private celebrations tailored to your vision.",
    icon: Calendar,
  },
  {
    title: "Devotional & Cultural Concerts",
    description: "Professionally managed Bhajan Concerts featuring renowned artists and high-quality production.",
    icon: Music,
  },
  {
    title: "Digital Marketing & Branding",
    description: "Strategic campaigns, social media management, and performance marketing to elevate your brand presence.",
    icon: Megaphone,
  },
  {
    title: "Business Consulting",
    description: "Expert e-commerce solutions and growth strategies to help brands achieve sustainable success.",
    icon: TrendingUp,
  },
];

const faqs = [
  {
    question: "1. What does your company do?",
    answer: "We specialize in event management, devotional and cultural concerts, digital marketing, branding, influencer collaborations, and e-commerce business solutions.",
  },
  {
    question: "2. Do you organize only Bhajan concerts?",
    answer: "No. While devotional events are one of our specialties, we also organize corporate events, cultural programs, brand activations, and private events.",
  },
  {
    question: "3. Do you provide sponsorship opportunities?",
    answer: "Yes. We offer customized sponsorship packages that provide businesses with extensive brand visibility through our events and digital platforms.",
  },
  {
    question: "4. Do you offer digital marketing services?",
    answer: "Yes. Our services include social media management, branding, content creation, paid advertising, influencer marketing, and performance marketing.",
  },
  {
    question: "5. Can small businesses work with your company?",
    answer: "Absolutely. We work with startups, SMEs, and established brands, tailoring our services to their goals and budgets.",
  },
  {
    question: "6. Where do you operate?",
    answer: "We are based in India and provide services across multiple cities, with the ability to manage projects nationwide.",
  },
  {
    question: "7. How can I collaborate with your company?",
    answer: "You can contact us through our phone number (+91 9623942569), email (bookings@dopaminevsethics.com), or social media channels to discuss partnerships, sponsorships, or service requirements.",
  },
  {
    question: "8. Do you provide customized event solutions?",
    answer: "Yes. Every event is planned and executed according to the client's objectives, budget, and audience.",
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-[url('/images/custom_hero_bg.png')] bg-cover bg-center"
          style={{ y, opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-beige-soft/90 via-transparent to-beige-soft" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/95 via-white/40 to-transparent opacity-90 scale-150 md:scale-100" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-6 py-2 rounded-full border border-gold/30 bg-white/40 backdrop-blur-md"
          >
            <span className="text-gold font-medium tracking-wide text-sm uppercase">Established 2026</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight tracking-tighter"
          >
            Experience <br/>
            <span className="text-gradient italic">Perfection.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-premiumBlack/80 max-w-2xl mx-auto mb-12 font-light"
          >
            Satisfying consumers with minimum time and maximum efficiency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/events">
              <Button size="lg" className="bg-gold hover:bg-gold-dark text-black rounded-full px-10 h-14 text-lg font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Explore Events
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-semibold border-black/20 hover:bg-black/10 transition-all text-premiumBlack">
                Our Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-32 relative bg-beige-soft overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Delivering high-quality services that inspire, engage, and create lasting value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {highlightServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl group hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="link" className="text-gold text-lg">
                View All 10 Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative bg-black/5 border-t border-black/5 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about partnering with us.</p>
          </div>

          <Accordion className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-black/10 rounded-2xl px-6 bg-black/5 data-[state=open]:bg-black/10 data-[state=open]:border-gold/30 transition-all">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-premiumBlack/70 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
