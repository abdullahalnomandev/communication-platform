import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { INSERT_ACCOUNT_ONE } from "../../../qql-api/account";
import { DELETE_TEAM_MEMBER, GET_TEAM_MEMBERS } from "../../../qql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IAccount, ITeamMembers } from "../../../tyeps";
interface IProps {
  showModal: Boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  teamId: number;
  teamName: string;
  setMemberCount: Dispatch<SetStateAction<number>>;
}

interface ITeam {
  team_id: number;
  user_id: number;
}

const GroupMembers: React.FC<IProps> = ({ showModal, setShowModal, teamId, teamName, setMemberCount }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IAccount>();
  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(INSERT_ACCOUNT_ONE, variable);
    return data;
  };

  const { error, isError, isSuccess, mutate } = useMutation(insertData);

  const deleteTeamMember = useMutation(
    async (team: ITeam) => {
      const data = await (await getGraphQLClient()).request(DELETE_TEAM_MEMBER, { team_id: team.team_id, user_id: team.user_id });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["geTemMembers", teamId]);
      },
    }
  );

  // const deleteTeamMemberOne = (user_id: number, team_id: number) => {
  //   console.log(user_id, team_id);
  // };

  const { data } = useFetch<ITeamMembers[]>(["geTemMembers", teamId], GET_TEAM_MEMBERS, { team_id: teamId, search_item: "%%" });

  useEffect(() => {
    setMemberCount(data?.payload.length as number);
  }, [data]);

  return (
    <>
      {showModal ? (
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
                    onClick={() => setShowModal(false)}
                  >
                    <ImCross className="text-sm ml-1" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-sm ">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        </thead>
                        <tbody>
                          {data?.payload.map(({ user_id, team_id, id, POC_user: { name, email, role, image_url } }, index) => (
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
                                    className="bg-red-500 text-white px-4 py-1 rounded-sm hover:bg-red-600 "
                                    onClick={() => {
                                      const data = {
                                        team_id,
                                        user_id,
                                      };
                                      deleteTeamMember.mutate(data);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default GroupMembers;
