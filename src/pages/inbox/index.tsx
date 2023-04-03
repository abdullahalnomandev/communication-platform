import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Group from "../../components/Inbox/Group";
import Message from "../../components/Inbox/Message";
import Team from "../../components/Team";

const Inbox = () => {
  const [teamId, setTeamId] = useState<number>(0);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

  const { data: session } = useSession();

  const router = useRouter();
  if (!session) {
    session && router.push("/");
  }

  return (
    <div>
      <Team showTeamModal={showTeamModal} setShowTeamModal={setShowTeamModal} teamId={teamId} />
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-3 ">
          <Group SetTeamId={setTeamId} setShowTeamModal={setShowTeamModal} />
        </div>
        <div className="col-span-12 h-28 sm:col-span-9 ">
          <Message teamId={teamId} />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
