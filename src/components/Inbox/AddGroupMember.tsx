import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { INSERT_ACCOUNT_ONE } from "../../../qql-api/account";
import { CREATE_TEAM_MEMBERS } from "../../../qql-api/team";
import { GET_ALL_USERS } from "../../../qql-api/user";
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

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IAccount>();
  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(INSERT_ACCOUNT_ONE, variable);
    return data;
  };

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
          queryClient.invalidateQueries(["getAllUsers"]);
          setAddUserShowModal(false);
          setAddTeamMembersData([]);
          setAddToCard([]);
          alert("User added successfully.");
          setPending(false);
        },
      }
    );
  };

  useEffect(() => {
    if (isError) {
      alert("Something went wrong. Please try again. Error occured may be due to duplicate user ");
      setPending(false);
    }
  }, [isError]);

  const { data: allUsers } = useFetch<IUser[]>(["getAllUsers", searchInputText], GET_ALL_USERS, { search_item: `%${searchInputText}%` });

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
                  <h1 className="modal-header">{teamName}</h1>
                  <button
                    className=" delete-modal"
                    onClick={() => {
                      setAddUserShowModal(false);
                      setAddToCard([]);
                      setAddTeamMembersData([]);
                      setPending(false);
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
                      className=" ml-[62%] mt-4 add-button- cursor-pointer mr-auto text-white bg-blue-500 px-5 py-2 rounded-full text-center w-1/3 
                    
                    "
                    >
                      Save
                    </button>
                  )}
                  {pending && (
                    <button
                      className="ml-[62%] mt-4  add-button- cursor-pointer mr-auto text-white bg-blue-300 px-5 py-2 rounded-full text-center w-1/3 
                    
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
                      </form>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                      user_id: id,
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
