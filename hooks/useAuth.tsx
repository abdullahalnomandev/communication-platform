import { useSession } from "next-auth/react";

const useAuth = () => {
  const { data: session } = useSession();

  const { name, email, image, userRole, accountId }: any = session?.user;

  return {
    name,
    email,
    image,
    role: userRole,
    accountId,
    session,
  };
};

export default useAuth;
