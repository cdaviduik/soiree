import styles from "./ViewEvent.module.css";
import { useLoaderData } from "react-router-dom";
import { EventDetails, User, getUser, getUsers } from "../../../Repo";
import { AttendeeList } from "./AttendeeList";
import { useEffect, useState } from "react";
import { Loading, Profile } from "../../../Components";

export const ViewEvent = () => {
  const [createdBy, setCreatedBy] = useState<User>();
  const [attendees, setAttendees] = useState<User[] | undefined>();
  const event = useLoaderData() as EventDetails | null;

  // TODO: move these into loaders
  useEffect(() => {
    const wrapper = async () => {
      if (!event?.createdBy) return;
      const user = await getUser(event.createdBy);
      setCreatedBy(user);
    };
    wrapper();
  }, [event?.createdBy]);

  useEffect(() => {
    const wrapper = async () => {
      if (!event?.attendees) return;
      const users = await getUsers(event.attendees);
      setAttendees(users);
    };
    wrapper();
  }, [event?.attendees]);

  if (!event) {
    return "Nothing yet";
  }

  return (
    <div className={styles.ViewEvent}>
      {event.imageURL && (
        <img className={styles.EventImage} src={event.imageURL} />
      )}
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
        </div>
        <div>
          <div>
            <h2>Created By</h2>
            {!createdBy && <Loading />}
            {createdBy && <Profile user={createdBy} />}
          </div>
          <AttendeeList attendees={attendees} createdBy={event.createdBy} />
        </div>
      </main>
    </div>
  );
};
