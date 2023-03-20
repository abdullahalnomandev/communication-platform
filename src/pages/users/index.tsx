/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AddUserModal from "../../components/AddUserModal";

const Users = () => {
  const users = [
    {
      id: 1,
      avater: "https://avatars.githubusercontent.com/u/76783446?v=4",
      name: "Abdullah Al Noman",
      email: "abdullahal@gmail.com",
      role: "user",
    },
    {
      id: 2,
      avater:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCd3hMasM5X4rqIDZHTIqLkn_tLml4zHSUdw&usqp=CAU",
      name: "Rakib Hossain",
      email: "rakibhossain@gmail.com",
      role: "user",
    },
    {
      id: 3,
      avater: "",
      name: "Yeasif Ahamed",
      email: "yeasin@gmail.com",
      role: "user",
    },
  ];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="md:mx-10">
      <div className="add-user-button flex justify-end">
        <button
          className="bg-blue-500 hover:bg-pink-600  my-4 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
      </div>
      <AddUserModal
        title="NOMAN "
        showModal={showModal}
        setShowModal={setShowModal}
      />
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
            {users.map(({ name, email, role, avater }, index) => (
              <tr
                key={index + 1}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex items-center  gap-2">
                    <img
                      src={
                        avater ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6a6KfKK66Jy1eCuDau7yp2rb5dIfGvl45g&usqp=CAU"
                      }
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
                      onClick={() => setShowModal(true)}
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 w-16">
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
  );
};

export default Users;
