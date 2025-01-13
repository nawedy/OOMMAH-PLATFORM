import NextAuth from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]';

export default NextAuth(authOptions);

