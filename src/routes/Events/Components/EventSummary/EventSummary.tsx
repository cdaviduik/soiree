import { Link } from "react-router-dom";
import { EventDetails } from "../../event";

interface Props {
  event: EventDetails;
}

export const EventSummary = ({ event }: Props) => {
  return (
    <>
      <header>
        <h1>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </h1>
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
