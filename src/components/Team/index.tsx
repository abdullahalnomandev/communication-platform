import NewTeamModal from "./NewTeamModal";

interface IProps {
  showTeamModal: boolean;
  setShowTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
  teamId: number;
}

const Team: React.FC<IProps> = ({ setShowTeamModal, showTeamModal, teamId }) => {
  return (
    <div>
      <NewTeamModal setShowTeamModal={setShowTeamModal} showTeamModal={showTeamModal} teamId={teamId} />
    </div>
  );
};

export default Team;
