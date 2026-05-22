import express from 'express';
import { getProjects, createProject } from '../controllers/project.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getProjects);
router.post('/', requireAdmin, createProject); // Only admins can create projects

export default router;