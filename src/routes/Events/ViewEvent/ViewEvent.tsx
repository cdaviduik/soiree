import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../event";

export const ViewEvent = () => {
  const event = useLoaderData() as EventDetails;

  return (
    <>
      <header>
        <h1>{event.name}</h1>
        <h2>{event.location}</h2>
        {event.startDate && (
          <h3>
            <time>{event.startDate.toDateString()}</time>
          </h3>
        )}
      </header>
      <p>{event.description}</p>
      {/* TODO: show created by */}
    </>
  );
};
