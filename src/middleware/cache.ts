import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '../lib/redis';

export default function cache(duration: number) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    if (req.method === 'GET') {
      const key = `__express__${req.originalUrl || req.url}`;
      const cachedBody = await redisClient.get(key);

      if (cachedBody) {
        res.setHeader('X-Cache', 'HIT');
        res.send(JSON.parse(cachedBody));
        return;
      } else {
        res.originalJson = res.json;
        res.json = (body) => {
          redisClient.set(key, JSON.stringify(body), {
            EX: duration
          });
          return res.originalJson(body);
        };
      }
    }
    next();
  };
}

