import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../event";

export const ViewEvent = () => {
  const event = useLoaderData() as EventDetails;
  console.log("event", event);

  return (
    <>
      <h1>{event.name}</h1>
      {event.startDate && <h3>{event.startDate.toDateString()}</h3>}
      <p>{event.description}</p>
      {/* TODO: show created by */}
    </>
  );
};
