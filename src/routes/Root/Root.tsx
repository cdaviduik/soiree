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
import { useCreateEvent } from "../Events/CreateEvent";
import { useGetEvent } from "../Events/ViewEvent";
import { useGetEvents, eventsLoader } from "../Events/EventIndex";

export const Root = () => {
  const getEvent = useGetEvent();
  const getEvents = useGetEvents();
  const createEvent = useCreateEvent();

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
          loader: eventsLoader(getEvents),
        },
        {
          path: "new",
          element: <CreateEvent />,
          action: createEventAction(createEvent),
        },
        {
          path: ":eventId",
          element: <ViewEvent />,
          loader: eventLoader(getEvent),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
