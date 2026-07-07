import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { date: 'desc' } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, images, date, isFeatured } = req.body;
    const event = await prisma.event.create({
      data: { title, description, images, date: new Date(date), isFeatured },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, slug, content, excerpt, coverImage, published } = req.body;
    const post = await prisma.post.create({
      data: { title, slug, content, excerpt, coverImage, published },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};
