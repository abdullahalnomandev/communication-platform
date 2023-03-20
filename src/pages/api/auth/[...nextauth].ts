import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.accessToken = account.access_token;
        token.jwtTokenInfo = account.id_token;
      }
      return token;
    },
    async session({ session, token, use, account }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.jwtTOKEKN = token.jwtTokenInfo;
      console.log("session", session);

      return session;
    },
  },
};
export default NextAuth(authOptions);
