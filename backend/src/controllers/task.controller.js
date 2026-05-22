import { prisma } from '../server.js';

export const getTasks = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const where = {};
    
    // Members only see their tasks, Admins see all
    if (req.user.role === 'MEMBER') where.assigneeId = req.user.id;
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const tasks = await prisma.task.findMany({
      where,
      include: { project: true, assignee: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) { next(error); }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await prisma.task.create({ data: req.body });
    res.status(201).json(task);
  } catch (error) { next(error); }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await prisma.task.update({
      where: { id },
      data: { status }
    });
    res.json(task);
  } catch (error) { next(error); }
};