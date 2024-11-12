import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
      profile(profile) {
        // Logging the profile to inspect the contents
        console.log("Google Profile:", profile);

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture, // Explicitly retrieving the picture
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          name: 'User',
          email: credentials?.email,
          image: null, // Placeholder for custom user image
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;

        // Logging to check what's in the token
        console.log("JWT Callback - Token:", token);

        // Ensure we capture the profile picture from Google or Facebook
        if (account.provider === 'google') {
          token.picture = profile.picture;
        } else if (account.provider === 'facebook') {
          token.picture = profile.picture?.data?.url;
        } else {
          token.picture = user.image || null;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Logging session to verify the data passed into session
      console.log("Session Callback - Token:", token);

      session.user.id = token.id;
      session.user.image = token.picture || session.user.image || null;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
