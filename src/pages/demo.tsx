import { updateSession } from "./../../utils/updateSession";

const Demo = () => {
  return (
    <div>
      <h1>Update Session</h1>
      <button onClick={() => updateSession("420")}>UPDATE SESSION</button>
    </div>
  );
};

export default Demo;
