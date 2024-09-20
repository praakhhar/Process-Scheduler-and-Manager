import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ProcessContext } from "./store/Process-store";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const DEFAULT = [
    { id: 1, name: "P1", arrivalTime: 0, burstTime: 10, priority: 2 },
    { id: 2, name: "P2", arrivalTime: 3, burstTime: 5, priority: 1 },
    { id: 3, name: "P3", arrivalTime: 6, burstTime: 8, priority: 3 },
  ];
  const [processes, setProcesses] = useState(DEFAULT);

  const AddPost = (obj) => {
    let initial = processes;
    setProcesses([obj, ...initial]);
    navigate("/");
    alert("New Process Created");
  };

  const DeletePost = (id) => {
    const newList = processes.filter((p) => p.id !== id);
    setProcesses(newList);
  };

  return (
    <>
      <ProcessContext.Provider value={{ AddPost, DeletePost, processes }}>
        <Header />
        <Outlet />
        <Footer />
      </ProcessContext.Provider>
    </>
  );
}

export default App;
