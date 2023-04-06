import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "react-query";
import { CREATE_NEW_TEAM } from "../../../gql-api/team";
import { GET_USERS_DATA } from "../../../gql-api/user";
import useFetch from "../../../hooks/useFatch";
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

interface IuserData {
  push(filterUserAdmin: any): unknown;
  user_id: number;
}

interface IInputField {
  creatingData: {
    teamName: string;
    userIds: IuserData;
  };
}
const NewTeamModal: React.FC<IProps> = ({ showTeamModal, setShowTeamModal }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ITeam>();
  const [loading, setLoading] = useState(false);

  const { data: userDataInfo } = useFetch<IUser[]>(["getUserData", 11], GET_USERS_DATA, { limit: 20, offset: 0 });
  const filterAdmin: any = userDataInfo?.payload.filter(({ role }) => role === "administrator");
  const filterUserAdmin = filterAdmin?.map((user: { id: any }) => ({ user_id: user.id }));

  const create_new_team = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(CREATE_NEW_TEAM, variable);
    return data;
  };

  const { mutate } = useMutation(create_new_team);
  const createUser = (team_data: IInputField) => {
    setLoading(true);
    mutate(team_data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getTeams"]);
        setShowTeamModal(false);
        setLoading(false);
      },
    });
  };

  const onSubmit: SubmitHandler<ITeam> = (data) => {
    const creatingData = {
      teamName: data.team_name,
      userIds: filterUserAdmin,
    };

    createUser(creatingData as any);
  };

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
                      {!loading && (
                        <input
                          type="submit"
                          value="Create Team"
                          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                        />
                      )}
                      {loading && (
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

export default NewTeamModal;
