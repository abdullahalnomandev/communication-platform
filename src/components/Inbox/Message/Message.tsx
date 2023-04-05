/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFatch";
import { CREATE_MESSAGE, DELETE_MESSAGE_BY_ID, GET_MESSAGE } from "../../../../qql-api/message";
import { GET_TEAM_ONE } from "../../../../qql-api/team";
import { getGraphQLClient } from "../../../../services/graphql";
import { IMessage, ITeam } from "../../../../tyeps";
import AddTeamMember from "../Team/AddTeamMember";
import GroupMembers from "../Team/GetAllTeamMembers";
import EditMessageModal from "./EditMessageModal";

interface IProps {
  teamId: number;
}

const Message: React.FC<IProps> = ({ teamId }) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addUserShowModal, setAddUserShowModal] = useState<boolean>(false);
  const [memberCount, setMemberCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMessage, setEditMessage] = useState<IMessage | any>({text:""} as IMessage );
  

  const { data } = useFetch<IMessage[]>(["getMessage", teamId], GET_MESSAGE, { team_id: teamId, limit: 1000, offset: 0 });
  const { data: teamDetails } = useFetch<ITeam[]>(["getTeam", teamId], GET_TEAM_ONE, { team_id: teamId });
  const { data: session }: any = useSession();

  const insertData = async (variable: {}) => {
    const data = await (await getGraphQLClient()).request(CREATE_MESSAGE, variable);
    return data;
  };

  // CREATE_MESSAGE
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

  // DELETE_MESSAGE
    const deleteMessageById = useMutation(
      async (id: number | undefined) => {
        const data = await(await getGraphQLClient()).request(DELETE_MESSAGE_BY_ID, { message_id: id });
        return data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["getMessage"]);
        }
      }
    );




  const sender = Number(session?.userId);

  const teamName = teamDetails ? teamDetails?.payload[0]?.name : "Loading....";
  const handleShowModal = () => {
    setShowModal(true);
  };

  const chatListRef = useRef<HTMLDivElement>(null);

  // Scroll the chat list to the bottom on mount and when messages update
  useEffect(() => {
    scrollToBottom();
  }, [data]);

  // Function to scroll the chat list to the bottom
  function scrollToBottom() {
    chatListRef?.current?.scrollTo({
      top: chatListRef.current.scrollHeight,
      behavior: "auto"
    });
  }
  return (
    <>
      <div style={{ display: teamId == 0 ? "block" : "none" }} className=" border-l flex h-screen  items-center justify-center">
        <div className="text-center md:pt-42 ">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2019/04/Chat-icon-by-ahlangraphic-24-580x386.jpg"
            alt="chat"
            className="w-34 text-center m-auto"
          />
          <h1 className="text-4xl font-bold mb-4">Select a team</h1>
          <p className=" text-lg text-gray-400 ">
            Send and receive message without keeping your phone online. <br /> Use Communication Platform
          </p>
        </div>
      </div>
      <div style={{ display: teamId == 0 ? "none" : "block" }} className=" border-l min-h-screen relative">
        <GroupMembers showModal={showModal} setMemberCount={setMemberCount} setShowModal={setShowModal} teamId={teamId} teamName={teamName} />
        <AddTeamMember
          setAddUserShowModal={setAddUserShowModal}
          setMemberCount={setMemberCount}
          addUserShowModal={addUserShowModal}
          teamId={teamId}
          teamName={teamName}
        />

        <div className="nav-message-header bg-[#white] py-3 shadow-md mb-4">
          <div className="nav-profile flex  justify-between gap-1 items-center">
            <div className=" flex cursor-pointer items-center justify-between  py-1 px-4  md:mr-3">
              <div className="flex items-center justify-between gap-x-3 ">
                {/* <img src="https://i.ibb.co/jLk5rtx/jpg.jpg" alt="" className="h-12 w-12 rounded-full" /> */}
                <div className="con-list-content text-left">
                  <p className=" text-lg font-semibold tracking-normal">{teamName}</p>
                  <p className=" text-gray-400">Active Now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center" onClick={() => setAddUserShowModal(true)}>
              <AiOutlineUserAdd className="text-blue-500" />
              <button className=" text-blue-500  cursor-pointer ">Add Members</button>{" "}
            </div>
            <div className="pr-8 flex justify-center items-center">
              <button className=" text-blue-500  cursor-pointer text-lg" onClick={handleShowModal}>
                Team members ({memberCount || "..."})
              </button>
            </div>
          </div>
        </div>
        <div className="message-content ">
          <EditMessageModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} editMessage={editMessage} setEditMessage={setEditMessage} />
          <div ref={chatListRef} className="content relative max-h-[700px] md:max-h-[450px]  overflow-auto ">
            {data?.payload?.map(({ id, text, sender_id, POC_user }) => (
              <>
                {!(sender === sender_id) && (
                  <p key={id} className="pl-4 text-sm cursor-pointer text-blue-500 -pt-6">
                    {POC_user?.name}
                  </p>
                )}
                {!(sender === sender_id) && <p className="my-3 mx-2  max-w-xs rounded-2xl bg-[#f0f2f5] py-2 px-3 text-black">{text}</p>}
                {sender === sender_id && (
                  <div className="my-3 mx-2 ml-auto  max-w-xs flex justify-end items-center  gap-2">
                    <div className=" rounded-2xl py-2 px-3 text-black cursor-pointer">
                      {" "}
                      <AiFillDelete onClick={()=>deleteMessageById.mutate(id)} className="cursor-pointer mb-1 text-red-400 hover:text-red-600" />
                      <FaEdit
                        onClick={() => {
                          setShowEditModal(true);
                          setEditMessage({ id, text });
                        }}
                        className="cursor-pointer  text-green-300 hover:text-green-600"
                      />
                    </div>
                    <p className="  rounded-2xl bg-blue-600 py-2 px-3 text-white">{text}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="bottom-message  bottom-0 absolute w-full mb-2 ">
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
    </>
  );
};

export default Message;
