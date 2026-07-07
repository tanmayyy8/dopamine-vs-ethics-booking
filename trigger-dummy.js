async function main() {
  try {
    console.log("Fetching venues...");
    const venuesRes = await fetch("http://localhost:3000/api/venues");
    const venues = await venuesRes.json();
    
    if (venues.length === 0) {
      console.log("No venues found. Please create one in Admin Panel first.");
      return;
    }
    
    // Pick the first SEAT_MAP venue
    const seatMapVenue = venues.find(v => v.type === "SEAT_MAP") || venues[0];
    
    console.log(`Creating dummy event using venue: ${seatMapVenue.name}...`);
    
    const eventPayload = {
      title: "Coldplay: Music of the Spheres",
      date: new Date("2026-12-31T20:00:00Z").toISOString(),
      category: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1540039155732-d68a05c6d3bf?q=80&w=2070",
      venueId: seatMapVenue.id
    };

    const createRes = await fetch("http://localhost:3000/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload)
    });
    
    const createData = await createRes.json();
    
    if (createRes.ok) {
      console.log(`✅ Success! Created dummy event ID: ${createData.eventId}`);
      console.log("Seats have been automatically generated based on the venue layout!");
    } else {
      console.error("Failed to create event:", createData);
    }
    
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
