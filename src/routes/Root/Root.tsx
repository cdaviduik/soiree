import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  CreateEvent,
  ViewEvent,
  attendeeAction,
  eventLoader,
  Events,
  EventIndex,
  eventsLoader,
  createEventAction,
} from "../Events";
import { Public } from "../Public";
import { AuthProvider } from "../../Repo";
import { PrivacyPolicy } from "../PrivacyPolicy/PrivacyPolicy";

export const Root = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
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
          action: attendeeAction,
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
