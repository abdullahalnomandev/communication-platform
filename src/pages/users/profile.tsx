import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { GET_USER_BY_ID, UPDATE_USER_BY_ID } from "../../../qql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IUser } from "../../../tyeps";

interface IProfile {
  name: String;
  email: String;
  mobile: any;
}

type Inputs = {
  name: string;
  email: string;
  mobile: string;
};
function Profile() {
  const { data: session }: any = useSession();
  const { data: userProfile }: any = useFetch<IUser[]>(["getUserData", session?.userId], GET_USER_BY_ID, { user_id: 54 });

  console.log("userProfile", userProfile?.payload);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();

  const updateUser = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(UPDATE_USER_BY_ID, variable);
    return data;
  };

  const { error, isError, isSuccess, mutate } = useMutation(updateUser);

  const updateUserData = (user: Inputs) => {
    mutate(
      { user_id: userProfile?.payload?.id, updated_value: user },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getUserData", session?.userId]);
          alert("User updated successfully..");
        }
      }
    );
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUserData(data);
  };

  if (!userProfile?.payload?.id) {
    return <img className=" w-62 m-auto" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="" />;
  }
  return (
    <>
      <div>
        <div className="image-url w-40 m-auto mt-12 ">
          <img
            src={session?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"}
            alt="user image"
            className=" w-32 h-32  rounded-full object-cover"
          />
        </div>
        <div className="w-full max-w-2xl m-auto -mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                defaultValue={userProfile?.payload?.name}
                {...register("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
              <input
                defaultValue={userProfile?.payload?.email}
                disabled
                {...register("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mobile</label>
              <input
                defaultValue={userProfile?.payload?.mobile}
                {...register("mobile")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              <input
                type="submit"
                value="Update "
                className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">&copy;2023 Acme Corp. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
