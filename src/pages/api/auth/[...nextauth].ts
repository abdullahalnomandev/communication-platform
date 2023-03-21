import Jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  session: {
    strategy: "jwt"
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
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub
        }
      };
    },
    async session({ session, token, user }: any) {
      const encodedToken = Jwt.sign(token, process.env.JWT_SECRET as string, {
        algorithm: "HS256"
      });

      session.id = token.id;
      session.token = encodedToken;
      return Promise.resolve(session);
    }
  }
};
export default NextAuth(authOptions);

// import JWT from "jsonwebtoken";
// import NextAuth from "next-auth";
// import { HasuraAdapter } from "next-auth-hasura-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import { JWT } from 'next-auth/jwt';
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//     })
//   ],
//   adapter: HasuraAdapter({
//     endpoint: process.env.HASURA_PROJECT_ENDPOINT as string,
//     adminSecret: process.env.HASURA_ADMIN_SECRET as string
//   }),
//   session: {
//     strategy: "jwt"
//   } as {},
//   jwt: {
//     encode: ({ secret, token }: any) => {
//       const encodedToken = JWT.sign(token, secret, {
//         algorithm: "HS256"
//       });
//       return encodedToken;
//     },
//     decode: async ({ secret, token }: any) => {
//       const decodedToken = JWT.verify(token, secret, {
//         algorithms: ["HS256"]
//       });
//       return decodedToken as any;
//     }
//   },

//   callbacks: {
//     async jwt({ token }: any) {
//       return {
//         ...token,
//         "https://hasura.io/jwt/claims": {
//           "x-hasura-allowed-roles": ["user"],
//           "x-hasura-default-role": "user",
//           "x-hasura-role": "user",
//           "x-hasura-user-id": token.sub
//         }
//       };
//     },
//     async session({ session, token }: any) {
//       console.log("session", session, "token", token);

//       if (session?.user) {
//         session.user.id = token.sub!;
//       }
//       return session;
//     }
//   }
// };
// export default NextAuth(authOptions);
