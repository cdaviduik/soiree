import { Link, useLoaderData } from "react-router-dom";
import { EventDetails } from "../event";
import { EventSummary } from "../Components/EventSummary";

export const EventIndex = () => {
  const events = useLoaderData() as EventDetails[];

  return (
    <>
      <h1>Events</h1>
      <Link to="/events/new">Add an Event</Link>

      {events.map((event) => {
        return <EventSummary key={event.id} event={event} />;
      })}
    </>
  );
};
