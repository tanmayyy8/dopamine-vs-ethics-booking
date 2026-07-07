import { notFound } from "next/navigation";
import { BookingWizardFlow } from "@/components/booking/BookingWizardFlow";
import { mockEvents } from "@/lib/mockData";

export default async function BookingPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find(e => e.id === params.id) as any;

  if (!event) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-beige-soft pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <BookingWizardFlow event={event} />
      </div>
    </div>
  );
}
