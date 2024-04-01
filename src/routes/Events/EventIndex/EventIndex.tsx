import styles from "./EventIndex.module.css";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { EventDetails } from "../../../Repo";
import { NavButton } from "../../../Components";
import { EventList } from "./EventList/EventList";

export const EventIndex = () => {
  const { hostingEvents, attendingEvents, interestedEvents } =
    useLoaderData() as {
      hostingEvents: EventDetails[];
      attendingEvents: EventDetails[];
      interestedEvents: EventDetails[];
    };

  const [searchParams] = useSearchParams();
  const isPast = !!searchParams.get("past");

  return (
    <div className={styles.EventIndex}>
      <header>
        <h1>{isPast && "Past"} Events</h1>
        <NavButton to="/events/new">Add an Event</NavButton>
      </header>

      <EventList title="Hosting" events={hostingEvents} />
      <EventList title="Attending" events={attendingEvents} />
      <EventList title="Interested" events={interestedEvents} />

      <div className={styles.PastEvents}>
        {isPast && <Link to="/events">View Current Events</Link>}
        {!isPast && <Link to="/events?past=true">View Past Events</Link>}
      </div>
    </div>
  );
};
