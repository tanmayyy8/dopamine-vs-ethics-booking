"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VenueBuilder() {
  const router = useRouter();
  const params = useParams();
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Local state for builder
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    fetchVenue();
  }, []);

  const fetchVenue = async () => {
    try {
      const res = await fetch(`/api/venues/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setVenue(data);
        setSections(data.sections || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveLayout = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/venues/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: venue.name,
          address: venue.address,
          sections: sections
        })
      });
      if (res.ok) {
        alert("Layout saved successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const addZoneSection = () => {
    setSections([...sections, { name: "New Zone", capacity: 100, seats: [] }]);
  };

  const addGridSection = () => {
    const rows = 10;
    const cols = 20;
    const newSeats = [];
    
    // Generate A-Z rows
    for (let r = 0; r < rows; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      for (let c = 0; c < cols; c++) {
        newSeats.push({
          row: rowLabel,
          column: c + 1,
          label: `${rowLabel}-${c + 1}`,
          active: true // active flag for UI only (to hide seats for aisles)
        });
      }
    }

    setSections([...sections, { 
      name: "New Block", 
      uiRows: rows, 
      uiCols: cols,
      seats: newSeats 
    }]);
  };

  const toggleSeat = (sectionIndex: number, seatIndex: number) => {
    const newSections = [...sections];
    const seat = newSections[sectionIndex].seats[seatIndex];
    
    // If we want to simulate removing a seat for an aisle, we toggle 'active'
    // This assumes we will only save 'active' seats to the DB.
    seat.active = !seat.active;
    setSections(newSections);
  };

  if (loading) return <div className="p-20 text-center">Loading Venue Builder...</div>;
  if (!venue) return <div className="p-20 text-center">Venue not found</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/admin/venues")} className="text-white/50 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{venue.name} Builder</h2>
            <span className="text-sm text-gold bg-gold/10 px-2 py-1 rounded mt-1 inline-block">
              {venue.type === "SEAT_MAP" ? "Seat Grid Mode" : "Zone Mode"}
            </span>
          </div>
        </div>
        <Button onClick={saveLayout} disabled={saving} className="bg-gold text-black hover:bg-white">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Layout"}
        </Button>
      </div>

      {/* Builder Workspace */}
      <div className="space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="glass p-6 rounded-2xl border border-white/10 relative group">
            <button 
              onClick={() => {
                const newSecs = [...sections];
                newSecs.splice(sIdx, 1);
                setSections(newSecs);
              }}
              className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="flex gap-4 mb-6">
              <div>
                <label className="text-xs text-white/50 uppercase tracking-wider block mb-1">Section Name</label>
                <input 
                  type="text" 
                  value={section.name} 
                  onChange={(e) => {
                    const newSecs = [...sections];
                    newSecs[sIdx].name = e.target.value;
                    setSections(newSecs);
                  }}
                  className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white font-bold"
                />
              </div>

              {venue.type === "ZONE_BASED" && (
                <div>
                  <label className="text-xs text-white/50 uppercase tracking-wider block mb-1">Max Capacity</label>
                  <input 
                    type="number" 
                    value={section.capacity || 0} 
                    onChange={(e) => {
                      const newSecs = [...sections];
                      newSecs[sIdx].capacity = parseInt(e.target.value);
                      setSections(newSecs);
                    }}
                    className="bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                  />
                </div>
              )}
            </div>

            {/* SEAT GRID RENDERER */}
            {venue.type === "SEAT_MAP" && section.seats && (
              <div className="overflow-x-auto bg-black/40 p-4 md:p-8 rounded-xl border border-white/5">
                <div className="text-center text-white/30 text-xs tracking-[0.5em] mb-8 uppercase font-bold border-b border-white/10 pb-4">Stage Direction</div>
                
                <div 
                  className="grid gap-2 md:gap-3 mx-auto w-max items-center pb-4" 
                  style={{ gridTemplateColumns: `auto repeat(${section.uiCols || Math.max(...section.seats.map((s:any) => s.column))}, minmax(0, 1fr))` }}
                >
                  {Array.from(new Set(section.seats.map((s:any) => s.row))).map((rowChar: any) => (
                    <React.Fragment key={`row-wrapper-${rowChar}`}>
                      <div className="sticky left-0 z-10 bg-[#161616] md:bg-transparent flex items-center justify-center font-bold text-white/60 text-xs w-8 h-8 md:w-10 md:h-10 shadow-[4px_0_10px_rgba(0,0,0,0.5)] md:shadow-none border-r border-white/5 md:border-none">
                         {rowChar}
                      </div>
                      {section.seats.filter((s:any) => s.row === rowChar).map((seat: any) => {
                        const seatIdx = section.seats.indexOf(seat);
                        const isActive = seat.active !== false;
                        
                        return (
                          <button
                            key={seatIdx}
                            onClick={() => toggleSeat(sIdx, seatIdx)}
                            className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-t-lg rounded-b-sm text-[10px] md:text-xs flex items-center justify-center transition-all ${
                              isActive 
                                ? "bg-gold text-black hover:bg-white" 
                                : "bg-white/5 text-transparent border border-white/10 border-dashed hover:border-gold/50"
                            }`}
                            title={seat.label}
                          >
                            {isActive && seat.column}
                          </button>
                        )
                      })}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-center text-white/40 text-xs mt-6">Click seats to remove them (create aisles) or add them back.</p>
              </div>
            )}
          </div>
        ))}

        <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl hover:border-gold/50 transition-colors">
          <Button 
            onClick={venue.type === "SEAT_MAP" ? addGridSection : addZoneSection}
            variant="outline" 
            className="border-gold text-gold hover:bg-gold hover:text-black"
          >
            <Plus className="w-4 h-4 mr-2" /> 
            Add {venue.type === "SEAT_MAP" ? "Seating Block" : "Zone"}
          </Button>
        </div>
      </div>
    </div>
  );
}
