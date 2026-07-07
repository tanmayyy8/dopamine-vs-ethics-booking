import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventHero } from "@/components/booking/EventHero";
import { mockEvents } from "@/lib/mockData";

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  // Find the event in our mock data instead of DB
  const event = mockEvents.find(e => e.id === params.id) as any;

  if (!event) {
    // For now, if no event is in DB, we'll render a 404.
    // The user needs to seed the DB or create an event in the admin panel.
    return notFound();
  }

  return (
    <div className="min-h-screen bg-beige-soft">
      <EventHero event={event} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-2xl border border-black/10">
              <h3 className="text-2xl font-heading font-bold mb-4">About The Event</h3>
              <p className="text-premiumBlack/70 leading-relaxed mb-6">
                Join us for an unforgettable experience at {event.title}. 
                Hosted at the prestigious {event.venue.name}, this event promises 
                to be a highlight of the year.
              </p>
            </div>
          </div>

          {/* Booking Sidebar / Wizard Trigger */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-2xl border border-black/10 sticky top-32">
              <h3 className="text-xl font-heading font-bold mb-2">Book Tickets</h3>
              <p className="text-premiumBlack/50 text-sm mb-6">Secure your spot before they sell out.</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b border-black/10">
                  <span className="text-premiumBlack/70">Date</span>
                  <span className="font-semibold">{event.date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-black/10">
                  <span className="text-premiumBlack/70">Venue</span>
                  <span className="font-semibold">{event.venue.name}</span>
                </div>
              </div>

              <Link href={`/events/${event.id}/book`}>
                <Button className="w-full bg-gold text-black hover:bg-premiumBlack hover:text-white py-6 text-lg font-bold">
                  Continue to Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
