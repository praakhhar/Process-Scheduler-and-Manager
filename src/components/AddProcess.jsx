import { useContext, useRef } from "react";
import { ProcessContext } from "../store/Process-store";

const AddProcess = () => {
  const { AddPost } = useContext(ProcessContext);
  const Name = useRef();
  const ArrivalTime = useRef();
  const BurstTime = useRef();
  const PriorityTime = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = Name.current.value;
    const arrivalTime = ArrivalTime.current.value;
    const burstTime = BurstTime.current.value;
    const priority = PriorityTime.current.value;

    if (!name || !arrivalTime || !burstTime || !priority) {
      alert("Please fill in all fields.");
      return;
    }

    const id = Date.now();
    AddPost({ id, name, arrivalTime, burstTime, priority });

    Name.current.value = "";
    ArrivalTime.current.value = "";
    BurstTime.current.value = "";
    PriorityTime.current.value = "";
  };
  return (
    <>
      <div className="my-cont">
        <form className="my-form" onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              ref={Name}
              type="name"
              class="form-control"
              id="pName"
              aria-describedby="emailHelp"
              placeholder="Enter Process Name"
            />
          </div>

          <div class="mb-3">
            <input
              ref={ArrivalTime}
              type="number"
              class="form-control"
              id="atime"
              aria-describedby="emailHelp"
              placeholder="Enter Arrival Time"
            />
          </div>

          <div class="mb-3">
            <input
              ref={BurstTime}
              type="number"
              class="form-control"
              id="bTime"
              aria-describedby="emailHelp"
              placeholder="Enter Burst Time"
            />
          </div>

          <div class="mb-3">
            <input
              ref={PriorityTime}
              type="number"
              class="form-control"
              id="atime"
              aria-describedby="emailHelp"
              placeholder="Enter Priority"
            />
          </div>
          <button
            style={{ backgroundColor: "#1E2A5E", border: "none" }}
            type="submit"
            class="btn btn-primary"
          >
            <div style={{ color: "#E1D7B7" }}>
              {" "}
              <b>Add</b>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProcess;
