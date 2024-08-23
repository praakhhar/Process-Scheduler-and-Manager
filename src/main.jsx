import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProcess from "./components/AddProcess.jsx";
import Process from "./components/Process.jsx";
import Analytics from "./components/Analytics.jsx";
import About from "./components/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Process /> },
      { path: "/add-process", element: <AddProcess /> },
      { path: "/analytics", element: <Analytics /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
