import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Group = () => {
  const conversation = [
    {
      id: 1,
      name: " Abdullah Al Noman",
      url: "https://i.ibb.co/jLk5rtx/jpg.jpg",
      date: "Today",
      message: " Hi cilo"
    },
    {
      id: 2,
      name: " Rakib Hossain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
      date: "01:23PM",
      message: " Acca."
    },
    {
      id: 3,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    },
    {
      id: 4,
      name: " Abdullah Al Noman",
      url: "https://i.ibb.co/jLk5rtx/jpg.jpg",
      date: "Today",
      message: " Hi cilo"
    },
    {
      id: 5,
      name: " Rakib Hossain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
      date: "01:23PM",
      message: " Acca."
    },
    {
      id: 6,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    },
    {
      id: 7,
      name: " Abdullah Al Noman",
      url: "https://i.ibb.co/jLk5rtx/jpg.jpg",
      date: "Today",
      message: " Hi cilo"
    },
    {
      id: 8,
      name: " Rakib Hossain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
      date: "01:23PM",
      message: " Acca."
    },
    {
      id: 9,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    },
    {
      id: 10,
      name: " Abdullah Al Noman",
      url: "https://i.ibb.co/jLk5rtx/jpg.jpg",
      date: "Today",
      message: " Hi cilo"
    },
    {
      id: 11,
      name: " Rakib Hossain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
      date: "01:23PM",
      message: " Acca."
    },
    {
      id: 12,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    },
    {
      id: 9,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    },
    {
      id: 10,
      name: " Abdullah Al Noman",
      url: "https://i.ibb.co/jLk5rtx/jpg.jpg",
      date: "Today",
      message: " Hi cilo"
    },
    {
      id: 11,
      name: " Rakib Hossain",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
      date: "01:23PM",
      message: " Acca."
    },
    {
      id: 12,
      name: " Fahima Mahjabin",
      url: "https://i.ibb.co/ky5RV2S/esha.png",
      date: "Yesterday",
      message: "Mane?"
    }
  ];
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
          {conversation.map(({ name, id, message, url, date }) => (
            <div key={id} className=" flex cursor-pointer items-center justify-between  py-2 px-2 hover:bg-[#f0f2f5] md:mr-3">
              <div key={id} className="flex items-center justify-between gap-x-3 ">
                <img
                  src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg"
                  alt=""
                  className="h-16 w-16 rounded-full"
                />
                <div className="con-list-content text-left">
                  <p className="  lett  text-lg font-semibold tracking-normal">{name}</p>
                  <p className=" text-blue-500">{message}</p>
                </div>
              </div>
              <div className="con-time text-gray-500">
                <p>{date}</p>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group;
