import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, whatsapp, eventType, eventDate, eventTime, venue, location, guestCount, budget, requirements } = req.body;
    
    // First, find or create the customer
    let customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, email, phone, whatsapp },
      });
    }

    // Then create the booking
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        eventType,
        eventDate: new Date(eventDate),
        eventTime,
        venue,
        location,
        guestCount: parseInt(guestCount),
        budget,
        requirements,
        status: 'PENDING',
      },
    });

    res.status(201).json({ message: 'Booking submitted successfully', booking });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g. APPROVED, REJECTED, COMPLETED

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: 'Booking status updated', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
};
