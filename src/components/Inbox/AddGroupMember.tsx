import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { INSERT_ACCOUNT_ONE } from "../../../qql-api/account";
import { CREATE_TEAM_MEMBERS } from "../../../qql-api/team";
import { GET_APP_USERS } from "../../../qql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IAccount, IUser } from "../../../tyeps";
interface IProps {
  addUserShowModal: Boolean;
  setAddUserShowModal: Dispatch<SetStateAction<boolean>>;
  teamId: number;
  teamName: string;
  setMemberCount: Dispatch<SetStateAction<number>>;
}

interface IUserInfo {
  team_id?: number;
  name?: string;
  user_id: number | any;
}

const AddGroupMember: React.FC<IProps> = ({ addUserShowModal, setAddUserShowModal, teamId, teamName, setMemberCount }) => {
  const [addToCard, setAddToCard] = useState([] as IUserInfo[]);
  const [searchInputText, setSearchInputText] = useState<string>("");
  const [addTeamMembersData, setAddTeamMembersData] = useState([] as IUserInfo[]);
  const [pending, setPending] = useState<boolean>(false);

  console.log(searchInputText);

  console.log("addTeamMembersData", addTeamMembersData);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IAccount>();
  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(INSERT_ACCOUNT_ONE, variable);
    return data;
  };

  // Add team members
  // const { error, isError, isSuccess, mutate } = useMutation(insertData);

  // const addTeamMembers: UseMutationResult<unknown, unknown, void, unknown> = useMutation(
  //   async () => {
  //     const data = await (await getGraphQLClient()).request(CREATE_TEAM_MEMBERS, { team_members: addTeamMembersData });
  //     return data;
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["getAllUsers"]);
  //       setAddUserShowModal(false);
  //     }
  //   }
  // );

  // const createUser = (user: IUser) => {
  //   mutate(user, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["getAllUsers"]);
  //       setAddUserShowModal(false);
  //     }
  //   });
  // };

  console.log("actual", addTeamMembersData, "main", [{ team_id: 7, user_id: 77 }]);
  const insertTeamMember = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(CREATE_TEAM_MEMBERS, variable);
    return data;
  };

  const { error, isError, isSuccess, mutate } = useMutation(insertTeamMember);

  const addTeamMembers = () => {
    setPending(true);
    mutate(
      { team_members: addTeamMembersData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getAllUsers", teamId]);
          setAddUserShowModal(false);
          setAddTeamMembersData([]);
          setAddToCard([]);
          alert("User added successfully.");
          setPending(false);
        }
      }
    );
  };
  if (error) {
    console.error(error);
  }

  const { data: allUsers } = useFetch<IUser[]>(["getAllUsers", searchInputText], GET_APP_USERS, { search_item: `%${searchInputText}%` });

  const handleAddToCard = (data: IUserInfo) => {
    const isExistUser = addToCard.find((item: IUserInfo) => item.user_id === data.user_id);
    const isInclude = addToCard.includes(isExistUser as IUserInfo);
    const filterUser = addToCard.filter((item: IUserInfo) => item.user_id !== data.user_id);
    const filterAddToTeamData = addTeamMembersData.filter((item: IUserInfo) => item.user_id !== data.user_id);
    if (isInclude) {
      setAddToCard(filterUser);
      setAddTeamMembersData(filterAddToTeamData);
    } else {
      setAddToCard([...addToCard, data]);
      setAddTeamMembersData([...addTeamMembersData, { team_id: teamId, user_id: data.user_id }]);
    }
  };
  return (
    <>
      {addUserShowModal ? (
        <>
          <div className=" justify-center md:mt-40   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none md:w-[600px] sm:w-[500px] w-[350px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="text-xl text-gray-500 font-mono">{teamName}</h1>
                  <button
                    className="p-1 mb-3 ml-auto border-0 bg-red-600 rounded-full h-8 w-8 text-center  justify-center items-center  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setAddUserShowModal(false);
                      setAddToCard([]);
                      setAddTeamMembersData([]);
                    }}
                  >
                    {/* <span className="bg-transparent text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">X</span> */}
                    <ImCross className="text-sm ml-1" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-center items-center gap-3 ">
                    {addToCard.map(({ name }: IUserInfo, i: any) => (
                      <div key={i + 1}>
                        <p className="bg-gray-400 text-white px-3 py-1 h-8 rounded-full">{name?.split(" ")[0]}</p>
                      </div>
                    ))}
                  </div>
                  {addToCard.length !== 0 && pending === false && (
                    <button
                      onClick={addTeamMembers}
                      className=" add-button- cursor-pointer mr-auto text-white bg-blue-500 px-5 py-2 rounded-full text-center w-1/3 
                    
                    "
                    >
                      Save
                    </button>
                  )}
                  {pending && (
                    <button
                      className=" add-button- cursor-pointer mr-auto text-white bg-blue-300 px-5 py-2 rounded-full text-center w-1/3 
                    
                    "
                    >
                      Loading...
                    </button>
                  )}
                  <>
                    <div className="relative p-6 flex-auto -mb-6">
                      <form>
                        <div className="relative mb-6">
                          <input
                            onChange={(e) => setSearchInputText(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=" Name , Email or phone number"
                          />
                        </div>
                        {/* <div className="flex items-center justify-end p-6  border-solid rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setAddUserShowModal(false)}
                          >
                            Close
                          </button>
                          <input
                            type="submit"
                            value="Create Account"
                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                          />
                        </div> */}
                      </form>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            User Name
                          </th>

                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Role</div>
                          </th>
                          <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">Action</div>
                          </th>
                        </tr>
                      </thead> */}
                      <tbody>
                        {allUsers?.payload.map(({ id, name, email, role, image_url }, index) => (
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
                            <td className="px-6 py-4" style={{ color: role === "administrator" ? "green" : "black" }}>
                              {role}
                            </td>
                            <td className="px-6 py-4 text-left">
                              <div className=" gap-2  ">
                                <button
                                  className=" text-white px-4 py-1 rounded-md  "
                                  onClick={() => {
                                    const data = {
                                      name,
                                      user_id: id
                                    };
                                    handleAddToCard(data);
                                  }}
                                  style={{ backgroundColor: addToCard.find((item: IUserInfo) => item.user_id === id) ? "#ff4154" : "#22c55e" }}
                                >
                                  {addToCard.find((item: IUserInfo) => item.user_id === id) ? "Remove from cart" : "Add to team"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
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

export default AddGroupMember;
