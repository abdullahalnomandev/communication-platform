import Jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FIND_USER_ONE } from "../../../../qql-api/user";
import { getGraphQLClient } from "../../../../services/graphql";
type IUser = {
  payload: {
    id: 54;
    email: string;
    name: string;
    role: string;
    image_url: null;
    created_at: string;
    updated_at: string;
  }[];
};
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,

  session: {
    strategy: "jwt"
  } as any,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === "google") {
        const userInfo = await (await getGraphQLClient()).request(FIND_USER_ONE, { email: user.email });
        const logInUser = (userInfo as IUser)?.payload as any;
        if (logInUser.length === 1) {
          return true;
        }
      }
      return false;
    },
    async jwt({ token, user, account, profile }: any) {
      const findDbUser: IUser = await (await getGraphQLClient()).request(FIND_USER_ONE, { email: token?.email });
      const { role, id, email, name } = findDbUser.payload[0];

      const ifUserSignedIn = user ? true : false;
      if (ifUserSignedIn) {
        (token.userId = id), (token.role = role), (token.accountId = "5");
      }

      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["administrator", "manager", "member"],
          "x-hasura-Default-Role": role,
          "x-hasura-User-Role": role,
          "x-hasura-user-Id": String(id),
          "X-Hasura-Account-Id": "1"
        }
      };
    },
    async session({ session, token, user }: any) {
      const encodedToken = Jwt.sign(token, process.env.JWT_SECRET as string, {
        algorithm: "HS256"
      });
      // console.log(session);

      session.token = encodedToken;
      session.userId = String(token.userId);
      session.userRole = token.role;
      session.accountId = token.accountId;
      return Promise.resolve(session);
    }
  },
  pages: {
    signIn: "/",
    signOut: "/auth/signout",
    error: "/error"
  }
};
export default NextAuth(authOptions);
