import { LoaderFunctionArgs } from "react-router-dom";
import {
  getHostedEvents,
  getInterestedEvents,
  getAttendingEvents,
} from "../../../Repo";

export const eventsLoader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const isPast = !!url.searchParams.get("past");

  return Promise.all([
    getHostedEvents(isPast),
    getAttendingEvents(isPast),
    getInterestedEvents(isPast),
  ]).then(([hostingEvents, attendingEvents, interestedEvents]) => ({
    hostingEvents,
    attendingEvents,
    interestedEvents,
  }));
};
