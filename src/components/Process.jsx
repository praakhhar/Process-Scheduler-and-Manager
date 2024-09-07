import { useContext } from "react";
import { ProcessContext } from "../store/Process-store";
import CreateProcess from "./CreateProcess";

const Process = () => {
  const { processes } = useContext(ProcessContext);
  return (
    <>
      <div className="my-process-container">
        {processes.map((process) => {
          return (
            <CreateProcess key={process.id} process={process}></CreateProcess>
          );
        })}
      </div>
    </>
  );
};

export default Process;
