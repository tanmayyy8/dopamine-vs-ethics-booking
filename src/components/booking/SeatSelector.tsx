"use client";

import React, { useState } from "react";
import { LayoutGrid, Layers, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const SeatSelector = ({ venue, eventSeats, onSelect, selectedSeats }: any) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedSeats.map((s:any) => s.id));
  
  // Base price per ticket (should come from eventZones/sections in DB, simplified here)
  const TICKET_PRICE = 2500;

  const toggleSeat = (seat: any) => {
    // Check if booked
    const isBooked = eventSeats?.find((es: any) => es.seatId === seat.id)?.status === "BOOKED";
    if (isBooked) return;

    let newSelected: string[] = [];
    let newFullSeats: any[] = [];
    
    if (selectedIds.includes(seat.id)) {
      newSelected = selectedIds.filter(id => id !== seat.id);
      newFullSeats = selectedSeats.filter((s:any) => s.id !== seat.id);
    } else {
      if (selectedIds.length >= 6) {
        alert("You can only select up to 6 seats at once.");
        return;
      }
      newSelected = [...selectedIds, seat.id];
      newFullSeats = [...selectedSeats, seat];
    }
    
    setSelectedIds(newSelected);
    onSelect(newFullSeats, newSelected.length * TICKET_PRICE);
  };

  if (venue.type === "ZONE_BASED") {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-4">Select Zone</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {venue.sections.map((sec: any) => (
            <div 
              key={sec.id}
              onClick={() => toggleSeat({ id: sec.id, label: sec.name, isZone: true })}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                selectedIds.includes(sec.id) 
                  ? "border-gold bg-gold/10" 
                  : "border-black/10 bg-black/5 hover:border-gold/50"
              }`}
            >
              <Layers className="w-8 h-8 mb-4 text-gold" />
              <h4 className="text-xl font-bold mb-1">{sec.name}</h4>
              <p className="text-premiumBlack/50 text-sm">General Admission • ₹{TICKET_PRICE.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SEAT MAP View
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-4">Select Your Seats</h3>
      
      {/* Legend */}
      <div className="flex gap-6 justify-center mb-8 text-sm">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-black/5 border border-black/20 rounded-sm"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gold rounded-sm shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div> Selected</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500/20 border border-red-500/50 rounded-sm"></div> Booked</div>
      </div>

      <TransformWrapper
        initialScale={0.9}
        minScale={0.3}
        maxScale={2.5}
        centerOnInit={true}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="relative rounded-xl border border-black/10 bg-white/40 shadow-sm overflow-hidden h-[60vh] min-h-[500px]">
            {/* Custom Zoom Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-md border border-black/10">
              <button onClick={() => zoomIn()} className="p-2 hover:bg-black/5 rounded-lg text-premiumBlack/70 hover:text-gold transition-colors" title="Zoom In">
                <ZoomIn size={20}/>
              </button>
              <button onClick={() => zoomOut()} className="p-2 hover:bg-black/5 rounded-lg text-premiumBlack/70 hover:text-gold transition-colors" title="Zoom Out">
                <ZoomOut size={20}/>
              </button>
              <button onClick={() => resetTransform()} className="p-2 hover:bg-black/5 rounded-lg text-premiumBlack/70 hover:text-gold transition-colors" title="Reset View">
                <Maximize size={20}/>
              </button>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!p-12 md:!p-24">
              <div className="min-w-max">
                <div className="text-center text-premiumBlack/30 text-xs tracking-[0.5em] mb-24 uppercase font-bold border-b border-black/10 pb-4">Stage Direction</div>
                
                {venue.sections.map((sec: any) => {
                  if (!sec.seats || sec.seats.length === 0) return null;

                  const maxCol = Math.max(...sec.seats.map((s:any) => s.column));
                  const uniqueRows = Array.from(new Set(sec.seats.map((s:any) => s.row))).sort();
                  const sectionPrice = eventSeats?.find((es: any) => sec.seats.some((s:any) => s.id === es.seatId))?.price || TICKET_PRICE;

                  return (
                    <div key={sec.id} className="mb-24 last:mb-0 relative">
                      <h4 className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-center text-premiumBlack/40 font-bold tracking-widest uppercase text-sm whitespace-nowrap">
                        {sec.name} <span className="text-gold ml-2">₹{sectionPrice.toLocaleString()}</span>
                      </h4>
                      
                      <div 
                        className="grid gap-2 md:gap-3 mx-auto w-max items-center pb-4" 
                        style={{ gridTemplateColumns: `auto repeat(${maxCol}, minmax(0, 1fr))` }}
                      >
                        {uniqueRows.map((rowChar: any, rIdx) => {
                           return (
                             <React.Fragment key={`row-wrapper-${rowChar}`}>
                               {/* Row Label */}
                               <div className="flex items-center justify-center font-bold text-premiumBlack/40 text-xs w-8 h-8 md:w-10 md:h-10 pr-4">
                                 {rowChar}
                               </div>
                               
                               {/* Seats */}
                               {Array.from({ length: maxCol }).map((_, cIdx) => {
                                  const colNum = cIdx + 1;
                                  const seat = sec.seats.find((s:any) => s.row === rowChar && s.column === colNum);
                                  
                                  if (!seat) {
                                    return <div key={`${rIdx}-${cIdx}`} className="w-8 h-8 md:w-10 md:h-10" />;
                                  }

                                  const isSelected = selectedIds.includes(seat.id);
                                  const isBooked = eventSeats?.find((es: any) => es.seatId === seat.id)?.status !== "AVAILABLE";

                                  return (
                                    <button
                                      key={seat.id}
                                      disabled={isBooked}
                                      onClick={() => toggleSeat(seat)}
                                      className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-t-xl rounded-b-md text-[10px] md:text-xs flex items-center justify-center transition-all ${
                                        isBooked ? "bg-red-500/20 border border-red-500/50 text-premiumBlack/20 cursor-not-allowed" :
                                        isSelected ? "bg-gold text-black shadow-[0_0_12px_rgba(212,175,55,0.8)] font-bold scale-110 z-0" : 
                                        "bg-black/5 text-premiumBlack/70 border border-black/20 hover:border-gold hover:bg-gold/20 hover:text-gold active:scale-95"
                                      }`}
                                      title={`${seat.label} - ₹${sectionPrice.toLocaleString()}`}
                                    >
                                      {seat.column}
                                    </button>
                                  );
                               })}
                             </React.Fragment>
                           );
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};
