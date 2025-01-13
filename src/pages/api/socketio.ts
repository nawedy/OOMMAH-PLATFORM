import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import type { NextApiResponseServerIO } from '@/types/next';

export default function SocketHandler(_: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }
  res.end();
}

