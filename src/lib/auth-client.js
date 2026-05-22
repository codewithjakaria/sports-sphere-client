// import { createAuthClient } from 'better-auth/react';

// export const authClient = createAuthClient({

//   baseURL: 'http://localhost:5000',
// });

// export const { signIn, signUp, signOut, useSession } = authClient;

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:5001',
});

export const { signIn, signUp, signOut, useSession } = authClient;