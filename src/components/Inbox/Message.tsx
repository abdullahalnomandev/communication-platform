import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFatch";
import { CREATE_MESSAGE, GET_MESSAGE } from "../../../qql-api/message";
import { GET_TEAM_ONE } from "../../../qql-api/team";
import { getGraphQLClient } from "../../../services/graphql";
import { IMessage, ITeam } from "../../../tyeps";

interface IProps {
  teamId: number;
}

const Message: React.FC<IProps> = ({ teamId }) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>("");

  console.log("message", message);

  const { data } = useFetch<IMessage[]>(["getMessage", teamId], GET_MESSAGE, { team_id: teamId, limit: 1000, offset: 0 });
  const { data: teamDetails } = useFetch<ITeam[]>(["getTeam", teamId], GET_TEAM_ONE, { team_id: teamId });
  const { data: session }: any = useSession();

  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(CREATE_MESSAGE, variable);
    return data;
  };

  const { error, isError, isSuccess, mutate } = useMutation(insertData);

  const createUser = () => {
    mutate(
      { team_id: teamId, text: message },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getMessage", teamId]);
          setMessage("");
        }
      }
    );
  };

  console.log("SESSON", session?.userId);
  const sender = Number(session?.userId);

  // const teamDetail = team;
  const teamName = teamDetails ? teamDetails?.payload[0]?.name : "Loading....";

  return (
    <div className=" border-l">
      <div className="nav-message-header bg-[#white] py-3 shadow-md mb-4">
        <div className="nav-profile">
          <div className=" flex cursor-pointer items-center justify-between  py-1 px-2 hover:bg-[#f0f2f5] md:mr-3">
            <div className="flex items-center justify-between gap-x-3 ">
              <img src="https://i.ibb.co/jLk5rtx/jpg.jpg" alt="" className="h-12 w-12 rounded-full" />
              <div className="con-list-content text-left">
                <p className=" text-lg font-semibold tracking-normal">{teamName}</p>
                <p className=" text-gray-400">Active Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="message-content ">
        <div className="content relative h-[700px] md:h-[400px]  overflow-auto">
          {data?.payload?.map(({ id, text, sender_id, POC_user }) => (
            <>
              {!(sender === sender_id) && (
                <p key={id} className="pl-4 text-sm cursor-pointer text-blue-500 -pt-6">
                  {POC_user?.name}
                </p>
              )}
              {!(sender === sender_id) && <p className="my-3 mx-2  max-w-xs rounded-2xl bg-[#f0f2f5] py-2 px-3 text-black">{text}</p>}
              {sender === sender_id && <p className=" my-3 mx-2 ml-auto   max-w-xs rounded-2xl bg-blue-600 py-2 px-3 text-white">{text}</p>}
            </>
          ))}
        </div>
      </div>
      <div className="bottom-message  bottom-0  ">
        <div className="send flex items-center justify-start ">
          <div className="icons mx-3 flex items-center justify-start gap-4 text-2xl font-bold"></div>
          <div className=" mt-2 flex  w-full mr-2   items-center justify-between rounded-full border border-gray-500 pr-2 ">
            <input type="text" onBlur={(e) => setMessage(e.target.value)} name="" id="" placeholder="Aa" className="w-full  py-2 mx-4 outline-none   " />
            <BsFillArrowRightCircleFill
              onClick={createUser}
              className=" cursor-pointer
             text-2xl font-light  text-blue-600"
            />
          </div>
          <div
            className="like ml-2
             cursor-pointer text-2xl font-light  text-blue-600"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Message;
