import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

const useFetch = <T,>(queryKey: (string | number)[], url: string): UseQueryResult<T> => {
  return useQuery(queryKey, async () => {
    const { data } = await axios.get(url);
    return data;
  });
};

export default useFetch;
