import styles from "./EventList.module.css";
import { EventDetails } from "../../../../Repo";
import { EventSummary } from "../EventSummary/EventSummary";

interface Props {
  title: string;
  events: EventDetails[];
}

export const EventList = ({ title, events }: Props) => {
  return (
    <div className={styles.EventList}>
      <h2>{title}</h2>
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
