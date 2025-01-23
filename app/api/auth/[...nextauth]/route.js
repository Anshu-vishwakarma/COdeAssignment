import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email', // Ensure profile and email are included
        },
      },
      redirectUri: 'http://localhost:3000/api/auth/callback/google', // Ensure this is correct
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials); // Log the credentials for debugging
        await dbConnect();
        let user = await User.findOne({ email: credentials.email });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          user = await User.create({
            name: credentials.name || 'New User',
            email: credentials.email,
            password: hashedPassword,
            role: 'student', // Default role for new users
          });
        } else {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // Only for Google login
      if (account.provider === 'google') {
        // Check if the user already exists in the database
        let user = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new user with a default role
        if (!user) {
          user = await User.create({
            name: profile.name,
            email: profile.email,
            role: 'student', // Default role for Google users
          });
        }
      }
      return true; // Always return true to indicate that sign-in is allowed
    },
    async session({ session, token }) {
     

      // Include user information (like name and email) in the session
      if (token?.email) {
        session.user.email = token.email;
        session.user.name = token.name; // Add name if it's available
        session.user.role = token.role; // Add name if it's available

    }

      return session;
    },
    async jwt({ token, user }) {
      // Attach user information to the JWT token (this will be available in the session)
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Attach role to JWT token
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login', // Path to your custom login page
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
