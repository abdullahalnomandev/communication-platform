import Group from "../../components/Inbox/Group";
import Message from "../../components/Inbox/Message";

const Inbox = () => {
  return (
    <div>
      {/* <h1>Chats</h1> */}

      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-3">
          <Group />
        </div>
        <div className="col-span-12 h-28 sm:col-span-9 ">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
