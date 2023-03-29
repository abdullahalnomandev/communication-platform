import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useFetch from "../../../hooks/useFatch";
import { GET_TEAMS } from "../../../qql-api/team";
import { ITeam } from "../../../tyeps";

interface IProps {
  SetTeamId: Dispatch<SetStateAction<number>>;
}

const Group: React.FC<IProps> = ({ SetTeamId }) => {
  const { data } = useFetch<ITeam[]>(["getTeams", 99], GET_TEAMS, { limit: 20, offset: 0 });
  const [isSearch, setIsSearch] = useState(true);

  return (
    <div>
      <div className="chat-header" onClick={() => setIsSearch(true)}>
        <div className=" search mx-2 my-2 flex cursor-pointer items-center justify-start gap-2 rounded-full bg-slate-100 py-2 pl-3">
          <AiOutlineSearch />
          <input type="text" name="" id="" placeholder="Search Message" className=" border-none bg-slate-100 bg-none outline-none" />
        </div>
      </div>

      {/* Conversations  */}
      {isSearch && (
        <ul className=" mb-[-6] max-h-[430px] divide-y divide-gray-700 divide-inherit overflow-auto overflow-y-auto sm:max-h-[440px]">
          {data?.payload?.map(({ name, id, created_at, POC_messages }) => (
            <div key={id} onClick={() => SetTeamId(id)} className=" flex cursor-pointer items-center justify-between  py-2 px-2 hover:bg-[#f0f2f5] md:mr-3">
              <div key={id} className="flex items-center justify-between gap-x-3 ">
                <img
                  src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg"
                  alt=""
                  className="h-16 w-16 rounded-full"
                />
                <div className="con-list-content text-left">
                  <p className="  lett  text-lg font-semibold tracking-normal">{name}</p>
                  <p className=" text-blue-500">{POC_messages[0]["text"]}</p>
                </div>
              </div>
              <div className="con-time text-gray-500">
                {/* <p>{new Date(new Date("2023-03-24T05:08:55.82267+00:00").toDateString(created_at)}</p> */}
                <p>{new Date(created_at).toDateString()}</p>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group;
