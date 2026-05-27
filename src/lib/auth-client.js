import { createAuthClient } from 'better-auth/react';

const isProduction = process.env.NODE_ENV === 'production';

export const authClient = createAuthClient({
  baseURL: isProduction
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:5001',

  fetchOptions: {
    credentials: 'include',
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
