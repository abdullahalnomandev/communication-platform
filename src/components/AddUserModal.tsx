import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { INSERT_USER_ONE } from "../../qql-api/user";
import client from "../../services/graphql";
import { IUser } from "../../tyeps";
interface IProps {
  showModal: Boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: String;
}
type FormValues = {
  name: string;
  email: string;
  mobile: string;
  role: string;
};
const AddUserModal: React.FC<IProps> = ({ showModal, setShowModal }) => {
  const [user, setUser] = useState({} as IUser);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const mutation = useMutation(async (variable: {}) => {
    const dataInfo = await client.request(INSERT_USER_ONE, variable);
    return dataInfo;
  });

  const handleSubmitUser = async () => {
    await mutation.mutate({ ...user, administrator: "administrator", email: "xyz@gmail.com" });
  };
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setUser(data);
    handleSubmitUser();
    reset();
  };

  console.log("error", mutation.isError, mutation.error, "succcess", mutation.isSuccess);

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
                  <h3 className="text-3xl font-semibold">ADD USER</h3>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                      />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                    <div className="relative mb-6">
                      <input
                        type="tel"
                        {...register("mobile")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write user name"
                      />
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Role</label>
                    <div className="relative mb-6 cursor-pointer border-blue-500">
                      <select
                        defaultValue="member"
                        {...register("role")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end p-6  border-solid rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <input
                        type="submit"
                        value="Add User"
                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                      />
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
