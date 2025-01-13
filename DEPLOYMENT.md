# Deployment Guide

## Prerequisites

1. Vercel account
2. PostgreSQL database (e.g., Supabase, Railway)
3. Redis instance (e.g., Upstash)
4. Environment variables configured

## Environment Variables

Ensure all required environment variables are set in your Vercel project:

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Production URL
- `NEXTAUTH_SECRET`: JWT secret
- `REDIS_URL`: Redis connection string
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token

## Deployment Steps

1. **Connect to Vercel**
   ```bash
   vercel link

