import NewTeamModal from "./NewTeamModal";

interface IProps {
  showTeamModal: boolean;
  setShowTeamModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Team: React.FC<IProps> = ({ setShowTeamModal, showTeamModal }) => {
  return (
    <div>
      <NewTeamModal setShowTeamModal={setShowTeamModal} showTeamModal={showTeamModal} />
    </div>
  );
};

export default Team;
