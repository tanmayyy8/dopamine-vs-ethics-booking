import { Router } from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/booking.controller';
import { requireAuth, requireRole } from '../middlewares/auth';

const router = Router();

// Public route for customers to book
router.post('/', createBooking);

// Protected Admin/Manager routes
router.get('/', requireAuth, requireRole(['ADMIN', 'MANAGER']), getBookings);
router.patch('/:id/status', requireAuth, requireRole(['ADMIN', 'MANAGER']), updateBookingStatus);

export default router;
