"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RazorpayCheckout = ({ amount, customer, eventId, seats, onSuccess }: any) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) return;
    setLoading(true);

    try {
      // Create order on backend (mocked for now, needs real API)
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 1.18, eventId, seats, customer }) // Including 18% GST
      });
      
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_MOCK_KEY_XYZ123", // Use test key
        amount: order.amount, // amount in paise
        currency: "INR",
        name: "Dopamine vs Ethics",
        description: "Event Ticket Booking",
        image: "/logo.png",
        order_id: order.id,
        handler: function (response: any) {
          // Verify on backend normally
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone
        },
        theme: {
          color: "#D4AF37" // Gold
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert("Payment Failed. Reason: " + response.error.description);
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Failed to initialize payment gateway");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/50 p-8 rounded-2xl border border-white/10 text-center">
      <div className="flex justify-center items-center gap-4 mb-8">
        <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-8" />
        <span className="text-white/40 text-sm">Secured by Razorpay</span>
      </div>
      
      <div className="text-4xl font-bold text-gold mb-8">
        ₹{(amount * 1.18).toLocaleString()}
      </div>
      
      <div className="flex flex-col gap-4">
        <Button 
          onClick={handlePayment} 
          disabled={loading || !scriptLoaded}
          className="w-full bg-gold text-black hover:bg-white py-6 text-lg font-bold"
        >
          {loading ? "Processing..." : "Pay Now (Live/Test Mode)"}
        </Button>

        {/* Dummy Payment Button for Dev */}
        <Button 
          onClick={() => {
            const mockPaymentId = "pay_dev_" + Math.random().toString(36).substring(2, 9);
            onSuccess(mockPaymentId);
          }}
          variant="outline"
          className="w-full border-white/20 text-white/60 hover:bg-white/10 py-6 font-bold"
        >
          Skip Payment (Dev Mode)
        </Button>
      </div>

      <p className="text-white/40 text-xs mt-4">By clicking "Pay Now", you agree to our Terms & Conditions.</p>
    </div>
  );
};
