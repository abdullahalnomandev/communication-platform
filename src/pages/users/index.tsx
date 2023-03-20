const Users = () => {
  const users = [
    {
      id: 1,
      avater: "",
      name: "Abdullah Al Noman",
      email: "abdullahal@gmail.com",
      role: "user",
    },
    {
      id: 2,
      avater: "",
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
  return (
    <div className="md:mx-10">
      <div className="add-user-button flex justify-end">
        <button
          className=" bg-blue-600 text-white px-4 py-2 mb-2 rounded-sm  mt-4 hover:bg-blue-800 transition mr-2
        "
        >
          Add User
        </button>
      </div>
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
            {users.map(({ name, email, role }, index) => (
              <tr
                key={index + 1}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">{role}</td>
                <td className="px-6 py-4 text-left">
                  <div className="flex gap-2  ">
                    <button className="bg-green-500 text-white px-4 py-1 rounded-sm hover:bg-green-600 w-16">
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
