// import { betterAuth } from 'better-auth';
// import { mongodbAdapter } from 'better-auth/adapters/mongodb';
// import { MongoClient } from 'mongodb';

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db('Sports-Sphere');

// export const auth = betterAuth({
//   database: mongodbAdapter(db),
//   emailAndPassword: {
//     enabled: true,
//   },
// });

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// ১. ক্লায়েন্টটি গ্লোবালি না রেখে চেক করে নিন
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('Sports-Sphere');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  // ২. অবশ্যই baseURL টি এখানে ডিফাইন করে দিন
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});