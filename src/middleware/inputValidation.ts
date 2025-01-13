import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export function validateInput(schema: z.ZodSchema) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid input' });
    }
  };
}

