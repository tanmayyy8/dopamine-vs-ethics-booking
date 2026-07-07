import { Router } from 'express';
import { getCustomers, getCustomerById } from '../controllers/customer.controller';
import { requireAuth, requireRole } from '../middlewares/auth';

const router = Router();

// Protected CRM routes
router.use(requireAuth, requireRole(['ADMIN', 'MANAGER']));
router.get('/', getCustomers);
router.get('/:id', getCustomerById);

export default router;
