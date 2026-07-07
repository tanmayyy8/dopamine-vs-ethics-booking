"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, Check, Ticket, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeatSelector } from "./SeatSelector";
import { RazorpayCheckout } from "./RazorpayCheckout";

export const BookingWizardFlow = ({ event }: { event: any }) => {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({ name: "", email: "", phone: "" });
  const [bookingResponse, setBookingResponse] = useState<any>(null);

  const steps = [
    { num: 1, title: "Select Seats", icon: Ticket },
    { num: 2, title: "Your Details", icon: User },
    { num: 3, title: "Payment", icon: CreditCard },
    { num: 4, title: "Confirmation", icon: Check },
  ];

  const handleSeatSelection = (seats: any[], total: number) => {
    setSelectedSeats(seats);
    setTotalAmount(total);
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          eventId: event.id,
          seats: selectedSeats,
          customer: bookingDetails,
          amount: totalAmount * 1.18
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setBookingResponse({ 
          id: data.bookingId,
          paymentId,
          status: "SUCCESS"
        });
        setStep(4);
      } else {
        alert("Booking failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to confirm booking on server.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Flow Content */}
      <div className="lg:w-2/3">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-black/10 -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gold -z-10 transition-all duration-500" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} 
            />
            {steps.map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-110" :
                    isPast ? "bg-gold text-black" : "bg-black/5 border border-black/20 text-premiumBlack/50"
                  }`}>
                    {isPast ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${isActive ? "text-gold" : "text-premiumBlack/50"}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-6 md:p-10 rounded-3xl border border-black/10"
          >
            {step === 1 && (
              <SeatSelector 
                venue={event.venue} 
                eventSeats={event.eventSeats} 
                onSelect={handleSeatSelection}
                selectedSeats={selectedSeats}
              />
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div>
                  <label className="block text-sm font-medium text-premiumBlack/70 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={bookingDetails.name}
                    onChange={e => setBookingDetails({...bookingDetails, name: e.target.value})}
                    className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-premiumBlack focus:border-gold focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-premiumBlack/70 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={bookingDetails.email}
                    onChange={e => setBookingDetails({...bookingDetails, email: e.target.value})}
                    className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-premiumBlack focus:border-gold focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-premiumBlack/70 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={bookingDetails.phone}
                    onChange={e => setBookingDetails({...bookingDetails, phone: e.target.value})}
                    className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-premiumBlack focus:border-gold focus:outline-none"
                    placeholder="+91 "
                  />
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4">Payment</h3>
                <p className="text-premiumBlack/60 mb-6">Complete your payment securely with Razorpay.</p>
                <RazorpayCheckout 
                  amount={totalAmount} 
                  customer={bookingDetails} 
                  eventId={event.id}
                  seats={selectedSeats}
                  onSuccess={handlePaymentSuccess} 
                />
              </div>
            )}
            
            {step === 4 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-premiumBlack/60 mb-8">Your tickets have been sent to {bookingDetails.email}</p>
                
                <div className="bg-black/5 border border-black/10 p-6 rounded-2xl max-w-sm mx-auto mb-8">
                  <div className="text-sm text-premiumBlack/50 mb-1">Booking ID</div>
                  <div className="text-2xl font-mono text-gold mb-6">{bookingResponse?.id}</div>
                  
                  <div className="w-full aspect-square bg-white rounded-xl mb-4 flex items-center justify-center">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingResponse?.id}`} alt="Ticket QR" />
                  </div>
                  <div className="text-xs text-premiumBlack/40">Present this QR code at the venue.</div>
                </div>
                
                <Button onClick={() => window.location.href = "/events"} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                  View More Events
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons (Bottom) */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}
              className="text-premiumBlack/60 hover:text-premiumBlack"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            {step < 3 && (
              <Button 
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && selectedSeats.length === 0}
                className="bg-gold text-black hover:bg-premiumBlack hover:text-white px-8"
              >
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:w-1/3">
        <div className="glass p-6 rounded-3xl border border-black/10 sticky top-24">
          <h3 className="text-xl font-bold mb-6 border-b border-black/10 pb-4">Order Summary</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-lg">{event.title}</h4>
            <p className="text-premiumBlack/50 text-sm mt-1">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-premiumBlack/50 text-sm">{event.venue.name}</p>
          </div>
          
          <div className="space-y-4 mb-6 border-t border-black/10 pt-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-premiumBlack/60">Selected Seats</span>
              <span className="font-semibold">{selectedSeats.length > 0 ? selectedSeats.map(s => s.label).join(", ") : "-"}</span>
            </div>
            
            {selectedSeats.length > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-premiumBlack/60">Tickets ({selectedSeats.length}x)</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-premiumBlack/60">Taxes & Fees</span>
              <span>{totalAmount > 0 ? `₹${(totalAmount * 0.18).toLocaleString()}` : "-"}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-black/10 pt-6">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-bold text-gold">
              ₹{totalAmount > 0 ? (totalAmount * 1.18).toLocaleString() : "0"}
            </span>
          </div>
          
          {step < 3 && (
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && selectedSeats.length === 0}
              className="w-full mt-8 bg-gold text-black hover:bg-premiumBlack hover:text-white h-12 text-base uppercase tracking-wider font-bold transition-all duration-300"
            >
              Continue <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
