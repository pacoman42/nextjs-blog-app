import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id, username, name } = req.query;
    try {
      if (id) {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(user);
      }
      const where: any = {};
      if (username) where.username = String(username);
      if (name) where.name = String(name);
      const users = await prisma.user.findMany({ where });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user(s)' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
