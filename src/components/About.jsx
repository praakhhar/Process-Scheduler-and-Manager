const About = () => {
  return (
    <>
      <div className="my-flex-container">
        <div className="my-about">
          <div>
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Operating System
            </h1>
            <p style={{ padding: "5px" }}>
              An Operating System (OS) is essential software that manages
              computer hardware and provides a platform for applications. It
              handles tasks such as process management, memory allocation, file
              system organization, and device control, ensuring efficient
              operation. The OS also provides security through access control
              and manages user interfaces, allowing interaction via graphical or
              command-line interfaces. Additionally, it facilitates networking,
              enabling data exchange and resource sharing between computers.
              Common types of operating systems include Windows, macOS, Linux,
              and mobile systems like Android and iOS, each designed to meet
              specific user and hardware needs.
            </p>
          </div>

          <div>
            {" "}
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Types Of Scheduling Algorithms
            </h1>
          </div>
          <div style={{ padding: "5px" }}>
            <ul>
              <li>FCFS</li>
              <li>Round Robin</li>
              <li>Shortest Job First</li>
              <li>Priority Scheduling</li>
            </ul>
          </div>

          <div>
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              First Come First Serve
            </h1>
            <p style={{ padding: "5px" }}>
              The First-Come, First-Serve (FCFS) scheduling algorithm is one of
              the simplest types of process scheduling in operating systems. It
              processes requests in the order they arrive, without preemption.
              When a process enters the ready queue, it is added to the end and
              executed once all prior tasks have completed. FCFS is easy to
              implement but can lead to inefficiencies, such as the "convoy
              effect," where short processes wait for long ones to finish. While
              fair in terms of process order, it may not optimize for response
              time or system throughput, making it less ideal for interactive
              systems.
            </p>
          </div>

          <div>
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Round Robin
            </h1>
            <p style={{ padding: "5px" }}>
              The Round Robin (RR) scheduling algorithm is a widely used method
              for process scheduling in operating systems. It allocates a fixed
              time slice, or quantum, to each process in the ready queue in a
              cyclic order. When a process’s time quantum expires, it is moved
              to the back of the queue, and the next process is given the CPU.
              This continues in a circular fashion. Round Robin is
              straightforward to implement and ensures that all processes
              receive a fair share of CPU time, making it ideal for time-sharing
              systems. However, its performance can be affected by the choice of
              time quantum; too large a quantum can degrade to FCFS, while too
              small a quantum can increase context switching overhead.
            </p>
          </div>

          <div>
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Shortest Job First
            </h1>
            <p style={{ padding: "5px" }}>
              Shortest Job First (SJF) is a process scheduling algorithm that
              selects the process with the shortest execution time next. It can
              be preemptive or non-preemptive. In the non-preemptive version,
              once a process starts executing, it runs to completion before the
              next process begins. In the preemptive version, known as Shortest
              Remaining Time First (SRTF), the currently running process can be
              preempted if a new process arrives with a shorter remaining time.
              SJF aims to minimize the average waiting time and is efficient for
              batch systems where job lengths are known in advance. However, it
              requires accurate knowledge of job durations and can lead to the
              "starvation" of longer processes if shorter jobs keep arriving.
            </p>
          </div>
          <div>
            <h1
              style={{
                backgroundColor: "#1E2A5E",
                margin: "0px",
                color: "#E1D7B7",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Priority Scheduling
            </h1>
            <p style={{ padding: "5px" }}>
              Priority scheduling is a CPU scheduling algorithm where each
              process is assigned a priority, and the CPU is allocated to the
              process with the highest priority. Priorities can be static
              (assigned at creation) or dynamic (changing over time). In
              preemptive priority scheduling, a running process can be
              interrupted if a higher-priority process arrives. In
              non-preemptive priority scheduling, the CPU completes the current
              process before switching. This method is effective for handling
              critical tasks but can lead to starvation, where lower-priority
              processes are indefinitely delayed. To mitigate this, techniques
              like aging gradually increase the priority of waiting processes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
