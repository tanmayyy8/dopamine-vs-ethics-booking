import { Router } from 'express';
import { getEvents, createEvent, getPosts, createPost } from '../controllers/cms.controller';
import { requireAuth, requireRole } from '../middlewares/auth';

const router = Router();

// Public read routes
router.get('/events', getEvents);
router.get('/posts', getPosts);

// Protected write routes
router.use(requireAuth, requireRole(['ADMIN', 'EDITOR', 'MANAGER']));
router.post('/events', createEvent);
router.post('/posts', createPost);

export default router;
