const ButtonShower = ({ handleAlgorithm }) => {
  return (
    <>
      <div className="my-button-shower">
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("FCFS")}
          >
            FCFS
          </button>
        </div>
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("RR")}
          >
            Round Robin
          </button>
        </div>
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("SJF")}
          >
            Shortest Job First
          </button>
        </div>
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("PS")}
          >
            Priority Scheduling
          </button>
        </div>
      </div>
    </>
  );
};
export default ButtonShower;
