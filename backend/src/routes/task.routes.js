import express from 'express';
import { getTasks, createTask, updateTaskStatus } from '../controllers/task.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All task routes require the user to be logged in
router.use(authenticate);

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id/status', updateTaskStatus);

export default router;