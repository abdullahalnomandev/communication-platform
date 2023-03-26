// import { GraphQLClient } from "graphql-request";

// const endpoint = process.env.HASURA_PROJECT_ENDPOINT || ("https://social-next.hasura.app/v1/graphql" as string);

// const client = new GraphQLClient(endpoint, {
//   headers: {
//     // Set any required headers here, e.g. Authorization token
//     Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASURA_TOKEN}` as string
//   }
// });

// export default client;
import { GraphQLClient } from "graphql-request";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
  token?: string;
}

export const getGraphQLClient = async () => {
  const session = await getSession();

  const accessToken = (session as CustomSession)?.token;

  console.log("CORE", accessToken);

  let headers = {};

  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`
    };
  } else {
    headers = {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "9VdpFn8uf2IIcavNlr1DL8M086Y3wqps6j7wZ72wpkhJza5I7xd6akeh6l3kA2bP"
    };
  }

  const endpoint = process.env.HASURA_PROJECT_ENDPOINT || "https://social-next.hasura.app/v1/graphql";
  const client = new GraphQLClient(endpoint, {
    headers: headers
  } as any);
  return client;
};
