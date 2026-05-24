

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// MongoDB Client
const client = new MongoClient(process.env.MONGODB_URI);

// Database
const db = client.db('Sports-Sphere');

// Better Auth Config
export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  baseURL: process.env.BETTER_AUTH_URL,

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [process.env.CLIENT_URL],
});