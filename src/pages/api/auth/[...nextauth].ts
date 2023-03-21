import Jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  } as {},

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      const ifUserSignedIn = user ? true : false;

      if (ifUserSignedIn) {
        token.id = user.id;
      }

      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["administrator", "manager", "member"],
          "x-hasura-Default-Role": "member",
          "x-hasura-User-Role": "member",
          "x-hasura-user-Id": "2",
          "X-Hasura-Account-Id": "1",
        },
      };
    },
    async session({ session, token, user }: any) {
      const encodedToken = Jwt.sign(token, process.env.JWT_SECRET as string, {
        algorithm: "HS256",
      });

      session.id = token.id;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
  },
};
export default NextAuth(authOptions);
