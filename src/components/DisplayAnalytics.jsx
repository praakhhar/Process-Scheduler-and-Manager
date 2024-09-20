import { Bar } from "react-chartjs-2";
import { Gantt, ViewMode } from "gantt-task-react";

const DisplayAnalytics = ({
  ganttTasks,
  chartData,
  avgTurnaroundTime,
  avgWaitingTime,
  waitingTimes,
  sortedProcesses,
  turnaroundTimes,
}) => {
  return (
    <>
      <div className="my-flex-div">
        <div className="my-bar">
          <h3
            style={{
              backgroundColor: "#1E2A5E",
              margin: "0px",
              color: "#E1D7B7",
              padding: "5px",
            }}
          >
            Burst Time Visualization
          </h3>
          <Bar data={chartData} />
        </div>
        <hr />
        <div className="my-chart ">
          <h3
            style={{
              backgroundColor: "#1E2A5E",
              margin: "0px",
              color: "#E1D7B7",
              padding: "5px",
            }}
          >
            Gantt Chart
          </h3>
          <Gantt tasks={ganttTasks} viewMode={ViewMode.Hour} />
          <hr />
        </div>

        <div className="data-shower">
          <div className="card my-avg-time">
            <h3
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Average Times
            </h3>
            <div style={{ margin: "5px" }}>
              <p>
                {" "}
                Average Turnaround Time:
                <strong>{avgTurnaroundTime} s </strong>
              </p>

              <p>
                Average Waiting Time: <strong>{avgWaitingTime} s</strong>
              </p>
            </div>
          </div>
          <div className="card ">
            <h3
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Turnaround and Waiting Times
            </h3>
            <ul className="list-group">
              {waitingTimes.map((wt, index) => (
                <li className="list-group-item" key={index}>
                  {sortedProcesses[index].name}: Turnaround Time ={" "}
                  {turnaroundTimes[index]}, Waiting Time = {wt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default DisplayAnalytics;
