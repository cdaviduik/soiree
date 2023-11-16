import styles from "./EventIndex.module.css";
import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../../../Repo";
import { NavButton } from "../../../Components";
import { EventSummary } from "./EventSummary";

export const EventIndex = () => {
  const events = useLoaderData() as EventDetails[];

  return (
    <div className={styles.EventIndex}>
      <header>
        <h1>Events</h1>
        <NavButton to="/events/new">Add an Event</NavButton>
      </header>

      <div className={styles.EventList}>
        {events.map((event) => (
          <EventSummary key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
