import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState } from 'react';
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
  
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <div className="relative">
          <div
            className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            Options
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10.707 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                  Option 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                  Option 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                  Option 3
                </a>
              </div>
            </div>
          </Transition>
        </div>

        <div className="image-url w-40 m-auto mt-12 ">
          <img
            src={session?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"}
            alt="user image"
            className=" w-32 h-32  rounded-full object-cover"
          />
          <p className="capitalize pt-3 ">
            Role: <span className=" text-red-600 text-lg">{userProfile?.payload?.role}</span>{" "}
          </p>
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
