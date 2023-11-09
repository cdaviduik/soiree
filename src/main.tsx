import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Events } from "./routes/Events";
import { Public } from "./routes/Public";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
  },
  {
    path: "/events",
    element: <Events />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
