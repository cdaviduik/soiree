import styles from "./ViewEvent.module.css";
import { Form, useLoaderData } from "react-router-dom";
import { EventDetails } from "../../../Repo";

export const ViewEvent = () => {
  const event = useLoaderData() as EventDetails;

  /*
  - show "attend" button if not created by this user
  - show list of attendees
  */

  const attendEvent = () => {
    console.log("attend event");
  };

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
        <div>
          <h2>Attendees</h2>
          <p>No one is coming</p>
          {/* <ul>
            <li>List of people</li>
          </ul> */}
          {!event.isCreatedByUser && (
            <Form method="post">
              <button onClick={attendEvent}>Attend</button>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};
