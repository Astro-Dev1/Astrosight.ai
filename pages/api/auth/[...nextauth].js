// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { MongoClient } from 'mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        // Connect to MongoDB
        const client = await MongoClient.connect(
          'mongodb+srv://astrosightadmin:Astro%407268@astrosightdb.jfsndsk.mongodb.net/astrodb?retryWrites=true&w=majority&appName=AstroSight',
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const db = client.db('astrodb');
        const users = db.collection('users');
        // Find the user by email
        const user = await users.findOne({ email: credentials.email });
        await client.close();

        if (!user) {
          throw new Error('No user found with this email');
        }

        // Verify the password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        // Return all user fields except password
        const { password, ...userWithoutPassword } = user;
        console.log('User authenticated:', password, userWithoutPassword);
        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login', // Customize the sign-in page if necessary
  },
});