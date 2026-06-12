// import { createAuthClient } from 'better-auth/react';

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL + '/api/auth',
//   fetchOptions: {
//     credentials: 'include',
//   },
// });

// export const { signIn, signUp, signOut, useSession } = authClient;

import { createAuthClient } from 'better-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL missing');
}

export const authClient = createAuthClient({
  baseURL: `${baseURL}/api/auth`,
  fetchOptions: {
    credentials: 'include',
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
