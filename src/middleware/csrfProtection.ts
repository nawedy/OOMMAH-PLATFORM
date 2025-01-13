import { NextApiRequest, NextApiResponse } from 'next';
import { csrf } from 'next-csrf';

export const csrfProtection = csrf({
  secret: process.env.CSRF_SECRET,
});

