import { DocumentNode } from "graphql";
import { useQuery, UseQueryResult } from "react-query";
import client from "../services/graphql";

const useFetch = <T,>(queryKey: (string | number)[], query: DocumentNode, variable: {}): UseQueryResult<{ payload: T }> => {
  return useQuery(queryKey, async () => {
    const data = await client.request<T>(query, variable);
    console.log("called", query, variable);
    return data;
  });
};
export default useFetch;
