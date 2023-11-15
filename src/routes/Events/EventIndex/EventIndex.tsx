import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../event";
import { EventSummary } from "./EventSummary";
import { NavButton } from "../../../Components/NavButton/NavButton";

export const EventIndex = () => {
  const events = useLoaderData() as EventDetails[];

  return (
    <>
      <h1>Events</h1>
      <NavButton to="/events/new">Add an Event</NavButton>

      {events.map((event) => (
        <EventSummary key={event.id} event={event} />
      ))}
    </>
  );
};
