import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import useFetch from "../../../hooks/useFatch";
import { GET_TEAM_LIST } from "../../../qql-api/account";
import { ITeam } from "../../../tyeps";
import AddAccountModal from "./AddAccountModal";
const UserEntryPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const { data } = useFetch<ITeam[]>(["getTeams", 99], GET_TEAM_LIST, {});

  console.log("team", data);

  return (
    <div>
      <AddAccountModal showModal={showModal} setShowModal={setShowModal} />
      <div className="user-entry text-center py-6">
        <h1 className="text-4xl">Welcome back! You look nice today.</h1>
        <p className="text-lg pt-3 text-gray-500 pb-8">Choose a workspace below to get back to working with your team.</p>
        <div className="existing-account w-3/5 m-auto border ">
          <p className="border-b-2 text-left py-4 px-2">
            Accounts for <span className="font-bold text-blue-500"> abdullahalnoman1512@gmail.com</span>
          </p>
          <div className="account divide-y divide-solid p-6">
            {data?.payload.map(({ name }) => (
              <>
                <div className="flex justify-between items-center px-2 hover:bg-slate-300 transition py-4 cursor-pointer ">
                  <div className="flex justify-center items-center gap-4  ">
                    <h1>{name}</h1>
                  </div>
                  <BsArrowRight className="text-2xl" />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="new-account flex justify-center items-center gap-11 rounded-md border-4 w-3/5 mt-12 m-auto ">
          <img className=" h-24" src="https://interlead-experts.com/wp-content/uploads/2021/05/interlead.png" alt="Picture of the author" />
          <p>Want to use Communication Platform with a different team?</p>
          <button
            onClick={() => setShowModal(true)}
            className=" rounded-md  transition hover:bg-black text-black
                 hover:text-white bg-yellow-300 px-6 py-3"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEntryPage;
