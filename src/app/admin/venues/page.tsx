"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MapPin, LayoutGrid, Layers, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockVenues } from "@/lib/mockData";

export default function AdminVenues() {
  const router = useRouter();
  const venues = mockVenues;
  const loading = false;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVenue, setNewVenue] = useState({ name: "", type: "SEAT_MAP", address: "" });

  const handleCreate = async () => {
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Venues & Seat Maps</h2>
          <p className="text-white/60">Manage your event locations, seating grids, and zones.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-gold text-black hover:bg-white">
          <Plus className="w-4 h-4 mr-2" /> Create Venue
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/50">Loading venues...</div>
      ) : venues.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <MapPin className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No venues found</h3>
          <p className="text-white/60 mb-6">Create your first venue to start designing seat maps.</p>
          <Button onClick={() => setShowCreateModal(true)} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
            Create Venue
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="glass p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all cursor-pointer group" onClick={() => router.push(`/admin/venues/${venue.id}`)}>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                  {venue.type === "SEAT_MAP" ? <LayoutGrid className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full">
                  {venue.type === "SEAT_MAP" ? "Grid Layout" : "Zone Layout"}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{venue.name}</h3>
              <p className="text-white/50 text-sm mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {venue.address || "No address provided"}
              </p>
              <div className="flex gap-4 text-sm border-t border-white/10 pt-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-white/40">Sections</span>
                  <span className="font-bold">{venue.sections?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-md p-8 rounded-2xl border border-white/20 relative">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-6">Create New Venue</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Venue Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold text-white"
                  placeholder="e.g. Madison Square Garden"
                  value={newVenue.name}
                  onChange={e => setNewVenue({...newVenue, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Layout Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className={`p-4 rounded-xl border text-center transition-all ${newVenue.type === 'SEAT_MAP' ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                    onClick={() => setNewVenue({...newVenue, type: 'SEAT_MAP'})}
                  >
                    <LayoutGrid className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium text-sm">Seat Grid Map</span>
                  </button>
                  <button 
                    className={`p-4 rounded-xl border text-center transition-all ${newVenue.type === 'ZONE_BASED' ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                    onClick={() => setNewVenue({...newVenue, type: 'ZONE_BASED'})}
                  >
                    <Layers className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium text-sm">Zone Based</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Address (Optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-gold text-white"
                  placeholder="Venue location"
                  value={newVenue.address}
                  onChange={e => setNewVenue({...newVenue, address: e.target.value})}
                />
              </div>
              
              <Button onClick={handleCreate} className="w-full bg-gold text-black hover:bg-white mt-4 py-6" disabled={!newVenue.name}>
                Create & Design Layout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
