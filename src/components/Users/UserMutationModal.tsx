import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { INSERT_USER_ONE, UPDATE_USER_BY_ID } from "../../../gql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IUser } from "../../../tyeps";
interface IProps {
  showModal: Boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number | null | undefined;
  userInfo: IUser;
  setUserId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}
type FormValues = {
  name: string;
  email: string;
  mobile: string;
  role: string;
};
const AddUserModal: React.FC<IProps> = ({ setUserInfo, showModal, setShowModal, userId, userInfo, setUserId }) => {
  const queryClient = useQueryClient();
  const [loadding, setLoadding] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(!userId ? INSERT_USER_ONE : UPDATE_USER_BY_ID, variable);
    return data;
  };

  console.log("userId", userId);

  // CREATE
  const { error, isError, isSuccess, mutate } = useMutation(insertData);

  const createUser = (user: IUser) => {
    setLoadding(true);
    console.log("user", user);

    mutate(!userId ? user : { user_id: userId, updated_value: user }, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getUserData"]);
        setShowModal(false);
        setUserId(null);
        reset();
        setLoadding(false);
        if(!userId){
        setUserInfo({} as IUser);
        }
      }
    });
  };


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createUser(data);
    console.log("59",data);
    
  };

  console.log("userInfo", userInfo);

  return (
    <>
      {showModal ? (
        <>
          <div className=" justify-center md:mt-40   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none md:w-[500px] sm:w-[500px] w-[350px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="modal-header"> {userId ? "UPDATE USER" : "ADD USER"}</h1>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <div className="relative mb-6">
                      <input
                        {...register("name")}
                        name="name"
                        defaultValue={userInfo?.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write user name"
                      />
                    </div>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        type="email"
                        required
                        {...register("email")}
                        defaultValue={userInfo?.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                      />
                    </div>
                    <p className="text-red-500">{isError ? "Unique key violation,Change this email" : ""}</p>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                    <div className="relative mb-6">
                      <input
                        type="tel"
                        {...register("mobile")}
                        name="mobile"
                        defaultValue={userInfo?.mobile}
                        id="mobile"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write mobile number"
                      />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Role</label>
                    <div className="relative mb-6 cursor-pointer border-blue-500">
                      <select
                        defaultValue={userInfo?.role}
                        id="role"
                        {...register("role")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="administrator">Administrator</option>
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end p-6  border-solid rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setUserId(null);
                          setUserInfo({} as IUser);
                          setLoadding(false);
                          reset();
                        }}
                      >
                        Close
                      </button>
                      {!loadding && (
                        <input
                          type="submit"
                          value={`${userId ? "Update User" : "Add User"}`}
                          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                        />
                      )}
                      {loadding && (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddUserModal;
