import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body;

    // Here you would typically send this data to your analytics service
    console.log('Web Vitals', body);

    res.status(200).json({ message: 'Web Vitals received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

