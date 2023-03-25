import useFetch from "../hooks/useFatch";
import { IUser } from "../tyeps";
import { FIND_USER_ONE } from "./user";

const HasuraApi = async (email: string) => {
  const { data } = useFetch<IUser[]>(["getUserOne", 19], FIND_USER_ONE, { email });
  console.log("hit_one", data);

  return { data };
};

export default HasuraApi;
