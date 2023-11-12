import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../event";
import { EventSummary } from "../Components/EventSummary";

export const ViewEvent = () => {
  const event = useLoaderData() as EventDetails;

  return <EventSummary event={event} />;
};
