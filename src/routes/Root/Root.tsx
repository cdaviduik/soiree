import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  CreateEvent,
  ViewEvent,
  eventLoader,
  Events,
  EventIndex,
  createEventAction,
} from "../Events";
import { Public } from "../Public";
import { eventsLoader } from "../Events/EventIndex";
import { AuthProvider } from "../../Repo";

export const Root = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
    },
    {
      path: "/events",
      element: <Events />,
      children: [
        {
          index: true,
          element: <EventIndex />,
          loader: eventsLoader,
        },
        {
          path: ":eventId",
          element: <ViewEvent />,
          loader: eventLoader,
          // action: attendEvent,
        },
        {
          path: "new",
          element: <CreateEvent />,
          action: createEventAction,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
