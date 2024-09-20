import React, { useState, useEffect, useContext } from "react";
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
import DisplayAnalytics from "./DisplayAnalytics";
import ButtonShower from "./ButtonShower";

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
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState(0);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);

  const handleAlgorithm = (algo) => {
    let sorted = [];
    let waitingTimes = [];
    let turnaroundTimes = [];

    if (algo === "FCFS") {
      sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
      const { wt, tat } = findWaitingTimeFCFS(
        sorted.length,
        sorted.map((p) => p.burstTime),
        sorted.map((p) => p.arrivalTime)
      );
      waitingTimes = wt;
      turnaroundTimes = tat;
    }

    if (algo === "RR") {
      const quantum = 2; // or any other value you want
      sorted = [...processes];
      waitingTimes = findWaitingTimeRR(
        sorted.length,
        sorted.map((p) => p.burstTime),
        quantum
      );
      turnaroundTimes = sorted.map((bt, i) => bt + waitingTimes[i]);
    }

    if (algo === "SJF") {
      sorted = [...processes].sort((a, b) => a.burstTime - b.burstTime);
      const { wt, tat } = findWaitingTimeSJF(
        sorted.length,
        sorted.map((p) => p.burstTime)
      );
      waitingTimes = wt;
      turnaroundTimes = tat;
    }

    if (algo === "PS") {
      sorted = [...processes].sort((a, b) => a.priority - b.priority);
      const { wt, tat } = findWaitingTimeFCFS(
        sorted.length,
        sorted.map((p) => p.burstTime),
        sorted.map((p) => p.arrivalTime)
      );
      waitingTimes = wt;
      turnaroundTimes = tat;
    }

    setSortedProcesses(sorted);
    setWaitingTimes(waitingTimes);
    setTurnaroundTimes(turnaroundTimes);
  };

  const findWaitingTimeSJF = (n, bt) => {
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);

    for (let i = 1; i < n; i++) {
      wt[i] = bt.slice(0, i).reduce((a, b) => a + b, 0);
    }

    for (let i = 0; i < n; i++) {
      tat[i] = bt[i] + wt[i];
    }

    return { wt, tat };
  };

  const findWaitingTimeFCFS = (n, bt, at) => {
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const serviceTime = new Array(n).fill(0);

    serviceTime[0] = at[0];
    for (let i = 0; i < n; i++) {
      if (i > 0) {
        serviceTime[i] = serviceTime[i - 1] + bt[i - 1];
      }
      wt[i] = Math.max(0, serviceTime[i] - at[i]);
      tat[i] = bt[i] + wt[i];
    }
    return { wt, tat };
  };

  const findWaitingTimeRR = (n, bt, quantum) => {
    const wt = new Array(n).fill(0);
    const rem_bt = [...bt];
    let t = 0;

    while (true) {
      let done = true;
      for (let i = 0; i < n; i++) {
        if (rem_bt[i] > 0) {
          done = false;
          if (rem_bt[i] > quantum) {
            t += quantum;
            rem_bt[i] -= quantum;
          } else {
            t += rem_bt[i];
            wt[i] = t - bt[i];
            rem_bt[i] = 0;
          }
        }
      }
      if (done) break;
    }
    return wt;
  };

  const calculateTimes = (processes) => {
    const n = processes.length;
    const bt = processes.map((p) => p.burstTime);
    const at = processes.map((p) => p.arrivalTime);
    const wt = Array(n).fill(0);
    const tat = Array(n).fill(0);
    const completionTime = Array(n).fill(0);

    let service_time = 0;

    for (let i = 0; i < n; i++) {
      if (service_time < at[i]) {
        service_time = at[i];
      }
      service_time += bt[i];
      completionTime[i] = service_time;
      wt[i] = completionTime[i] - at[i] - bt[i];
      tat[i] = completionTime[i] - at[i];
    }

    return { waitingTimes: wt, turnaroundTimes: tat };
  };

  useEffect(() => {
    if (sortedProcesses.length) {
      const { waitingTimes, turnaroundTimes } = calculateTimes(sortedProcesses);
      const avgWaiting =
        waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length;
      const avgTurnaround =
        turnaroundTimes.reduce((a, b) => a + b, 0) / turnaroundTimes.length;

      setWaitingTimes(waitingTimes);
      setTurnaroundTimes(turnaroundTimes);
      setAvgWaitingTime(avgWaiting.toFixed(2)); // Use avgWaiting here
      setAvgTurnaroundTime(avgTurnaround.toFixed(2)); // Use avgTurnaround here
    }
  }, [sortedProcesses]);

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
        data: sortedProcesses.map(
          (p, i) => p.burstTime + (waitingTimes[i] || 0)
        ),
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
    start: new Date(2024, 0, 1, 0, process.arrivalTime), // Ensure arrivalTime is in seconds
    end: new Date(2024, 0, 1, 0, process.arrivalTime + process.burstTime), // Ensure burstTime is in seconds
    type: "task",
    progress: 100,
    dependencies: [],
  }));

  return (
    <>
      <ButtonShower handleAlgorithm={handleAlgorithm} />
      <DisplayAnalytics
        handleAlgorithm={handleAlgorithm}
        ganttTasks={ganttTasks}
        chartData={chartData}
        avgTurnaroundTime={avgTurnaroundTime}
        avgWaitingTime={avgWaitingTime}
        waitingTimes={waitingTimes}
        sortedProcesses={sortedProcesses}
        turnaroundTimes={turnaroundTimes}
      />
    </>
  );
};

export default Analytics;
