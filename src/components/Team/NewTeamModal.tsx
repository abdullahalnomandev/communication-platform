import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { CREATE_TEAM_ONE } from "../../../qql-api/team";
import { GET_APP_USERS } from "../../../qql-api/user";
import { getGraphQLClient } from "../../../services/graphql";
import { IUser } from "../../../tyeps";

interface IProps {
  showTeamModal: Boolean;
  setShowTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
  teamId: number;
}

interface ITeam {
  team_name: string;
}

const NewTeamModal: React.FC<IProps> = ({ showTeamModal, setShowTeamModal, teamId }) => {
  const [addAdminSatat, setAddAdminSatat] = useState([] as any);
  const [stopLoof, setStopLoof] = useState(true);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ITeam>();
  const { data: getAdmins } = useFetch<IUser[]>(["getAllUsers", teamId], GET_APP_USERS, { search_item: `%administrator%` });
  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(CREATE_TEAM_ONE, variable);
    return data;
  };

  const { error, isError, isSuccess, mutate } = useMutation(insertData);
  const createUser = (team_data: ITeam) => {
    mutate(team_data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getTeams"]);
        setShowTeamModal(false);
        alert("Team created successfully");
      },
    });
  };

  const onSubmit: SubmitHandler<ITeam> = (data) => {
    createUser(data);
  };

  console.log("ADMIN_State", addAdminSatat);

  useEffect(() => {
    // midifyData;
  }, [showTeamModal]);
  return (
    <>
      {showTeamModal ? (
        <>
          <div className=" justify-center md:mt-40   flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none md:w-[500px] sm:w-[500px] w-[350px]">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h1 className="modal-header">Let&apos;s Creat a new team.</h1>
                  <button
                    className="delete-modal"
                    onClick={() => {
                      setShowTeamModal(false);
                    }}
                  >
                    {/* <span className="bg-transparent text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">X</span> */}
                    <ImCross className="text-sm ml-1" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload a team cover photo</label>
                    <input type="file" name="image" id="image" /> <br /> <br />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                    <div className="relative mb-6">
                      <input
                        required={true}
                        {...register("team_name")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter a team name"
                      />
                    </div>
                    <div className="flex items-center justify-end p-6  border-solid rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowTeamModal(false)}
                      >
                        Close
                      </button>
                      <input
                        type="submit"
                        value="Create Team"
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

export default NewTeamModal;
