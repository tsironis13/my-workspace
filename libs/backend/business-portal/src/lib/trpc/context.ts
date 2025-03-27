import { AuthClient } from '@supabase/supabase-js';
import { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

const AUTH_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpa2Z4bGp1dmpxY3FlaWJiZ2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NDkyMjEsImV4cCI6MjA1NzUyNTIyMX0.gxyZ4GYluzzDmxJetiYreckbHzDTtsLbCP-nVIvNep0';
const AUTH_URL = 'https://tikfxljuvjqcqeibbgey.supabase.co/auth/v1';

const authClient = new AuthClient({
  headers: {
    Authorization: `Bearer ${AUTH_KEY}`,
    apikey: `${AUTH_KEY}`,
  },
  url: AUTH_URL,
  fetch: fetch,
});

const verifyAndDecodeJwtToken = async (token: string) => {
  // verify and decode token from supabase
  if (!token) {
    console.error('No token');
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await authClient.getUser(token);

    if (!user) {
      console.error('No user');
      return null;
    }

    if (error) {
      console.error('Token verification failed:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req }: CreateNextContextOptions) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await verifyAndDecodeJwtToken(
        req.headers.authorization.split(' ')[1]
      );
      return user;
    }
    return null;
  }

  const user = await getUserFromHeader();
  return {
    user,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
