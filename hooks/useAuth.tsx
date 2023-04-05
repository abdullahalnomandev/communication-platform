import { useSession } from "next-auth/react";
import { GET_USER_BY_ID } from "../qql-api/user";
import { IUser } from "../tyeps";
import useFetch from "./useFatch";

const useAuth = () => {
  const { data: session }: any = useSession();

  const { data: userProfile }: any = useFetch<IUser[]>(["getUserData", session?.userId], GET_USER_BY_ID, { user_id: session?.userId });

  console.log("userProfile", userProfile?.payload);
  if(userProfile){
  return {
    id:userProfile?.payload?.id ,
    name:userProfile?.payload?.name ,
    email:userProfile?.payload?.email ,

  };
  }

};

export default useAuth;
