import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HASURA_PROJECT_ENDPOINT || ("https://social-next.hasura.app/v1/graphql" as string);

const client = new GraphQLClient(endpoint, {
  headers: {
    // Set any required headers here, e.g. Authorization token
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASURA_TOKEN}` as string,
  },
});

export default client;
