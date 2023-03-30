/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { DELETE_USER_BY_ID, GET_USERS_DATA } from "../../../qql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IUser } from "../../../tyeps";
import AddUserModal from "../../components/AddUserModal";
const Users = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number | null | undefined>(null);

  const deleteUserById = useMutation(
    async (id: number | undefined) => {
      const data = await (await getGraphQLClient()).request(DELETE_USER_BY_ID, { user_id: id });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getUserData", 11]);
      },
    }
  );

  const { data } = useFetch<IUser[]>(["getUserData", 11], GET_USERS_DATA, { limit: 20, offset: 0 });
  // const { data: getUser } = useFetch<IUser[]>(["findUserData", 11], FIND_USER_ONE, { email: "abdullahalnoman1512@gmail.com" });

  return (
    <>
      <Head>
        <title>C.P | USERS</title>
      </Head>

      <div className="md:mx-10">
        <div className="add-user-button flex justify-end">
          <button
            className="bg-blue-500 hover:bg-pink-600  my-4 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              setShowModal(true);
              setUserId(null);
            }}
          >
            Add User
          </button>
        </div>
        <AddUserModal title="NOMAN " showModal={showModal} setShowModal={setShowModal} userId={userId} />
        <div className="relative overflow-x-auto shadow-md sm:rounded-sm ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">E-mail</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Role</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.payload.map(({ id, name, email, role, image_url }, index) => (
                <tr key={index + 1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center  gap-2">
                      <img
                        src={image_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"}
                        alt="user image"
                        className="w-11 h-11  rounded-full object-cover"
                      />
                      <p>{name}</p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{role}</td>
                  <td className="px-6 py-4 text-left">
                    <div className="flex gap-2  ">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded-sm hover:bg-green-600 w-16"
                        onClick={() => {
                          setShowModal(true);
                          setUserId(id);
                        }}
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 w-16" onClick={() => deleteUserById.mutate(id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
