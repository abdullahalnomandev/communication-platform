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
import { getSession } from "next-auth/react";

interface IToken {
  accessToken: string | null | undefined | any;
}

<<<<<<< HEAD
const client = new GraphQLClient(endpoint, {
  headers: {
    // Set any required headers here, e.x Authorization token
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASURA_TOKEN}` as string
  }
});

export default client;
=======
export const getGraphQLClient = async () => {
  const session = await getSession();
  const accessToken: IToken = session?.token || null;
  if (!accessToken) {
    alert("Authentication token not found");
  }
  const endpoint = process.env.HASURA_PROJECT_ENDPOINT || "https://social-next.hasura.app/v1/graphql";
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return client;
};
>>>>>>> 46be556c64d2bd01108af5d1e4be53defa3f23be
