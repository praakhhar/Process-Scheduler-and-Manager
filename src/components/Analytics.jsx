import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ProcessContext } from "../store/Process-store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { processes } = useContext(ProcessContext);
  const [sortedProcesses, setSortedProcesses] = useState(processes);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState(0);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);

  const handleAlgorithm = (algo) => {
    setAlgorithm(algo);
    let sorted = [];

    if (algo === "FCFS") {
      sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    } else if (algo === "SJF") {
      sorted = [...processes].sort((a, b) => a.burstTime - b.burstTime);
    } else if (algo === "Priority") {
      sorted = [...processes].sort((a, b) => a.priority - b.priority);
    } else if (algo === "RoundRobin") {
      const timeQuantum = 2;
      let currentTime = 0;
      let queue = [];
      let rrSorted = [];

      let remainingProcesses = [...processes].sort(
        (a, b) => a.arrivalTime - b.arrivalTime
      );

      while (remainingProcesses.length > 0 || queue.length > 0) {
        while (
          remainingProcesses.length > 0 &&
          remainingProcesses[0].arrivalTime <= currentTime
        ) {
          queue.push(remainingProcesses.shift());
        }

        if (queue.length > 0) {
          let process = queue.shift();
          if (process.burstTime > timeQuantum) {
            rrSorted.push({
              ...process,
              burstTime: timeQuantum,
              executedTime: currentTime,
            });
            currentTime += timeQuantum;
            queue.push({
              ...process,
              burstTime: process.burstTime - timeQuantum,
              arrivalTime: currentTime,
            });
          } else {
            rrSorted.push({
              ...process,
              burstTime: process.burstTime,
              executedTime: currentTime,
            });
            currentTime += process.burstTime;
          }
        } else {
          currentTime++;
        }
      }

      sorted = rrSorted;
    }

    setSortedProcesses(sorted);
  };

  const calculateTimes = (processes) => {
    let currentTime = 0;
    let turnaroundTimes = [];
    let waitingTimes = [];
    let completionTimes = new Map();

    processes.forEach((process, index) => {
      const processStart = Math.max(currentTime, process.arrivalTime);
      const waitingTime = processStart - process.arrivalTime;
      const turnaroundTime = waitingTime + process.burstTime;

      waitingTimes.push(waitingTime);
      turnaroundTimes.push(turnaroundTime);

      currentTime = processStart + process.burstTime;

      completionTimes.set(process.name, currentTime);
    });

    processes.forEach((process, index) => {
      if (completionTimes.has(process.name)) {
        turnaroundTimes[index] =
          completionTimes.get(process.name) - process.arrivalTime;
      }
    });

    return { waitingTimes, turnaroundTimes };
  };

  const { waitingTimes, turnaroundTimes } = calculateTimes(sortedProcesses);

  useEffect(() => {
    const avgTurnaround =
      turnaroundTimes.reduce((a, b) => a + b, 0) / sortedProcesses.length;
    const avgWaiting =
      waitingTimes.reduce((a, b) => a + b, 0) / sortedProcesses.length;

    setAvgTurnaroundTime(avgTurnaround.toFixed(2));
    setAvgWaitingTime(avgWaiting.toFixed(2));
  }, [sortedProcesses, turnaroundTimes, waitingTimes]);

  const chartData = {
    labels: sortedProcesses.map((p) => p.name),
    datasets: [
      {
        label: "Burst Time",
        data: sortedProcesses.map((p) => p.burstTime),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Turnaround Time",
        data: turnaroundTimes,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Waiting Time",
        data: waitingTimes,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const ganttTasks = sortedProcesses.map((process, index) => ({
    id: index + 1,
    name: process.name,
    start: new Date(2024, 0, 1, 0, process.arrivalTime),
    end: new Date(2024, 0, 1, 0, process.arrivalTime + process.burstTime),
    type: "task",
    progress: 100,
    dependencies: [],
  }));

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
            type="button"
            className="btn btn-secondary "
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            onClick={() => handleAlgorithm("SJF")}
          >
            SJF
          </button>
        </div>
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("Priority")}
          >
            Priority
          </button>
        </div>
        <div className="my-button">
          <button
            style={{ backgroundColor: "#1E2A5E", color: "#E1D7B7" }}
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAlgorithm("RoundRobin")}
          >
            Round Robin
          </button>
        </div>
      </div>
      <div className="my-burst-time my-flex-container">
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
      </div>
      <div className="my-flex-container">
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
      </div>

      <div className="my-data-shower">
        <div class="card my-card2 col-2">
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
          <div className="my-avg-time">
            <p>Average Turnaround Time: {avgTurnaroundTime}</p>
            <p>Average Waiting Time: {avgWaitingTime}</p>
          </div>
        </div>

        <div class="card my-card2 col-9">
          <div>
            {" "}
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
              {sortedProcesses.map((process, index) => (
                <li className="list-group-item" key={index}>
                  {process.name}: Turnaround Time = {turnaroundTimes[index]},
                  Waiting Time = {waitingTimes[index]}
                </li>
              ))}
            </ul>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
