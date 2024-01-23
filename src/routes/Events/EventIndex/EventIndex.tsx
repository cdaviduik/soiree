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
      {/* <h2>Hosting</h2>
      TBD
      <h2>Attending</h2>
      TBD
      <h2>Interested</h2>
      TBD
      <h2>Invited</h2>
      TBD */}
      <h2>Attending</h2>
      {events.length === 0 && "Nothing yet"}
      {events.length > 0 && (
        <ul className={styles.EventList}>
          {events.map((event) => (
            <li key={event.id}>
              <EventSummary key={event.id} event={event} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
