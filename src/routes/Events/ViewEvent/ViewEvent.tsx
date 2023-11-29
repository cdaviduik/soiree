import styles from "./ViewEvent.module.css";
import { useLoaderData } from "react-router-dom";
import { EventDetails } from "../../../Repo";
import { AttendeeList } from "./AttendeeList";

export const ViewEvent = () => {
  const event = useLoaderData() as EventDetails;

  return (
    <div className={styles.ViewEvent}>
      <header>
        <h1>{event.name}</h1>
      </header>
      <main className={styles.EventContent}>
        <div>
          <h2>{event.location}</h2>
          {event.startDate && (
            <h3>
              <time>{event.startDate.toDateString()}</time>
            </h3>
          )}
          <p>{event.description}</p>
          {/* TODO: show created by */}
        </div>
        <AttendeeList attendees={event.attendees} />
      </main>
    </div>
  );
};
