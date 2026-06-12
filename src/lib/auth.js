import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db('Sports-Sphere');

if (!process.env.BETTER_AUTH_URL) {
  throw new Error(' BETTER_AUTH_URL is missing in environment');
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(' BETTER_AUTH_SECRET is missing in environment');
}

export const auth = betterAuth({
  database: mongodbAdapter(db),

  baseURL: process.env.BETTER_AUTH_URL,
  basePath: '/api/auth',
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    'http://localhost:3000',
    'https://sports-sphere-client-phi.vercel.app',
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    },
  },

  user: {
    allowUnsafeEmailLinking: true,
  },

  advanced: {
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  },
});
