import { MdDeleteOutline } from "react-icons/md";
import { ProcessContext } from "../store/Process-store";
import { useContext } from "react";

const CreateProcess = ({ process }) => {
  const { DeletePost } = useContext(ProcessContext);
  const handleClick = () => {
    DeletePost(process.id);
  };
  return (
    <>
      <div className="card my-card">
        <div className="card-header" style={{ backgroundColor: "#1E2A5E" }}>
          <div>
            <h4 style={{ color: "#E1D7B7" }}>Process</h4>
          </div>
          <span
            onClick={handleClick}
            className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle my-delete"
          >
            <MdDeleteOutline />
          </span>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Process Name: {process.name}</li>
          <li className="list-group-item">
            Arrival Time : {process.arrivalTime} s
          </li>
          <li className="list-group-item">Burst Time : {process.burstTime}</li>
          <li className="list-group-item">Priority : {process.priority}</li>
        </ul>
      </div>
    </>
  );
};

export default CreateProcess;
