import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// ১. মঙ্গোডিবি ক্লায়েন্ট কানেকশন
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('Sports-Sphere'); // আপনার ডাটাবেজ নাম

// ২. অথেন্টিকেশন কনফিগারেশন
export const auth = betterAuth({
  database: mongodbAdapter(db),

  // ইমেইল এবং পাসওয়ার্ড অথেন্টিকেশন চালু করা
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
