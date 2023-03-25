import { DocumentNode } from "graphql";
import { useQuery, UseQueryResult } from "react-query";
import { getGraphQLClient } from "../services/graphql";

const useFetch = <T,>(queryKey: (string | number)[], query: DocumentNode, variable: {}): UseQueryResult<{ payload: T }> => {
  return useQuery(queryKey, async () => {
    // const data = await client.request<T>(query, variable);
    const data = await (await getGraphQLClient()).request<T>(query, variable);
    return data;
  });
};
export default useFetch;
