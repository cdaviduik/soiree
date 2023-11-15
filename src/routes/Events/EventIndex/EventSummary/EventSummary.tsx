import { Link, useNavigate } from "react-router-dom";
import styles from "./EventSummary.module.css";
import { EventDetails } from "../../event";

interface Props {
  event: EventDetails;
}

export const EventSummary = ({ event }: Props) => {
  const navigate = useNavigate();
  const eventPath = `/events/${event.id}`;

  const goToEvent = () => {
    navigate(eventPath);
  };

  return (
    <div onClick={goToEvent} className={styles.EventSummary}>
      <div>
        <Link to={eventPath}>{event.name}</Link>
      </div>
      <div>{event.location}</div>
      {event.startDate && (
        <div>
          <time>{event.startDate.toDateString()}</time>
        </div>
      )}

      {/* <header>
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
      <p>{event.description}</p> */}
      {/* TODO: show created by */}
    </div>
  );
};
