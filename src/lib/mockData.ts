export const mockVenues = [
  {
    id: "ven_1",
    name: "Symphony Arena",
    type: "SEAT_MAP",
    address: "Downtown Mumbai",
    sections: [
      {
        id: "sec_1",
        name: "VIP",
        seats: [
          { id: "s_1", row: "A", column: 1, label: "A-1" },
          { id: "s_2", row: "A", column: 2, label: "A-2" },
          { id: "s_3", row: "A", column: 3, label: "A-3" },
          { id: "s_4", row: "A", column: 4, label: "A-4" },
        ]
      },
      {
        id: "sec_2",
        name: "Balcony",
        seats: [
          { id: "s_5", row: "B", column: 1, label: "B-1" },
          { id: "s_6", row: "B", column: 2, label: "B-2" },
          { id: "s_7", row: "B", column: 3, label: "B-3" },
          { id: "s_8", row: "B", column: 4, label: "B-4" },
        ]
      }
    ]
  }
];

export const mockEvents = [
  {
    id: "evt_marathi_1",
    title: "Abhangwani: Marathi Devotional Night",
    date: new Date("2026-10-15T19:00:00Z"),
    category: "Concerts",
    imageUrl: "https://images.unsplash.com/photo-1540039155732-6762b51cc131?q=80&w=2070&auto=format&fit=crop",
    venueId: "ven_1",
    venue: mockVenues[0],
    eventZones: [],
    eventSeats: [
      { id: "es_1", eventId: "evt_marathi_1", seatId: "s_1", status: "AVAILABLE", price: 2500, seat: mockVenues[0].sections[0].seats[0] },
      { id: "es_2", eventId: "evt_marathi_1", seatId: "s_2", status: "AVAILABLE", price: 2500, seat: mockVenues[0].sections[0].seats[1] },
      { id: "es_3", eventId: "evt_marathi_1", seatId: "s_3", status: "SOLD", price: 2500, seat: mockVenues[0].sections[0].seats[2] },
      { id: "es_4", eventId: "evt_marathi_1", seatId: "s_4", status: "AVAILABLE", price: 2500, seat: mockVenues[0].sections[0].seats[3] },
      { id: "es_5", eventId: "evt_marathi_1", seatId: "s_5", status: "AVAILABLE", price: 1000, seat: mockVenues[0].sections[1].seats[0] },
      { id: "es_6", eventId: "evt_marathi_1", seatId: "s_6", status: "AVAILABLE", price: 1000, seat: mockVenues[0].sections[1].seats[1] },
      { id: "es_7", eventId: "evt_marathi_1", seatId: "s_7", status: "AVAILABLE", price: 1000, seat: mockVenues[0].sections[1].seats[2] },
      { id: "es_8", eventId: "evt_marathi_1", seatId: "s_8", status: "AVAILABLE", price: 1000, seat: mockVenues[0].sections[1].seats[3] },
    ]
  },
  {
    id: "evt_marathi_2",
    title: "Natya Sangeet Mahotsav",
    date: new Date("2026-11-20T18:00:00Z"),
    category: "Theatre",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=2069&auto=format&fit=crop",
    venueId: "ven_1",
    venue: mockVenues[0],
    eventZones: [],
    eventSeats: [
      { id: "es_1", eventId: "evt_marathi_2", seatId: "s_1", status: "AVAILABLE", price: 1500, seat: mockVenues[0].sections[0].seats[0] },
      { id: "es_2", eventId: "evt_marathi_2", seatId: "s_2", status: "AVAILABLE", price: 1500, seat: mockVenues[0].sections[0].seats[1] },
      { id: "es_5", eventId: "evt_marathi_2", seatId: "s_5", status: "AVAILABLE", price: 800, seat: mockVenues[0].sections[1].seats[0] },
    ]
  },
  {
    id: "evt_3",
    title: "Global Tech Summit 2026",
    date: new Date("2026-12-05T09:00:00Z"),
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    venueId: "ven_1",
    venue: mockVenues[0],
    eventZones: [],
    eventSeats: []
  }
];
