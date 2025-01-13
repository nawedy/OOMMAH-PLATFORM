const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'REDIS_URL',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN'
] as const;

export function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  REDIS_URL: process.env.REDIS_URL!,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
  NODE_ENV: process.env.NODE_ENV!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!
} as const;

