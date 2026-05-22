import { prisma } from '../server.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        _count: { select: { tasks: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) { next(error); }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: { name, description }
    });
    res.status(201).json(project);
  } catch (error) { next(error); }
};