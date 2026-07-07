"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    imageUrl: "",
    venueId: ""
  });

  useEffect(() => {
    // Fetch available venues
    const fetchVenues = async () => {
      try {
        const res = await fetch("/api/venues");
        const data = await res.json();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      }
    };
    fetchVenues();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push("/admin/events");
      } else {
        const data = await res.json();
        alert("Failed to create event: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold">Create New Event</h2>
          <p className="text-white/60">Fill in the details to list a new event.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-white/10 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Event Title <span className="text-red-500">*</span></label>
          <input 
            required
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Divine Echoes Concert"
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Date & Time <span className="text-red-500">*</span></label>
            <input 
              required
              type="datetime-local" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Category <span className="text-red-500">*</span></label>
            <input 
              required
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Concert, Corporate"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Cover Image URL</label>
          <input 
            type="url" 
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
          />
          {formData.imageUrl && (
            <div className="mt-4 h-48 rounded-xl bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${formData.imageUrl})` }} />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Select Venue <span className="text-red-500">*</span></label>
          <select 
            required
            name="venueId"
            value={formData.venueId}
            onChange={handleChange}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
          >
            <option value="">-- Choose a Venue --</option>
            {venues.map(v => (
              <option key={v.id} value={v.id}>{v.name} ({v.type === 'SEAT_MAP' ? 'Seat Map' : 'Zone Based'})</option>
            ))}
          </select>
          <p className="text-xs text-white/50 mt-2">
            Selecting a venue will automatically generate the corresponding seats or zones for this event based on the venue's layout.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-6 text-lg rounded-xl">
            {loading ? "Creating..." : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save & Generate Tickets
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
