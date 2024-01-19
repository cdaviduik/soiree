import styles from "./ViewEvent.module.css";
import { useLoaderData } from "react-router-dom";
import {
  EventDetails,
  User,
  getUser,
  getUsers,
  interestedInEvent,
  useAuth,
} from "../../../Repo";
import { AttendeeList } from "./AttendeeList";
import { useEffect, useMemo, useState } from "react";
import { Loading, Profile } from "../../../Components";
import { InterestedList } from "./InterestedList/InterestedList";

export const ViewEvent = () => {
  const [createdBy, setCreatedBy] = useState<User>();
  const [attendees, setAttendees] = useState<User[] | undefined>();
  const event = useLoaderData() as EventDetails | null;
  const { user } = useAuth();

  const isCreator = useMemo(
    () => event?.createdBy === user?.uid,
    [event, user]
  );

  // TODO: move these into loaders
  useEffect(() => {
    const wrapper = async () => {
      if (!event?.createdBy) return;
      const user = await getUser(event.createdBy);
      setCreatedBy(user);
    };
    wrapper();
  }, [event?.createdBy]);

  // attendees
  useEffect(() => {
    const wrapper = async () => {
      if (!event) return;
      if (!event.attendeeIds) {
        setAttendees([]);
        return;
      }
      const users = await getUsers(event.attendeeIds);
      setAttendees(users);
    };
    wrapper();
  }, [event]);

  // interested
  const interestedIds = useMemo(() => {
    if (!event) return undefined;
    return event.interestedIds.filter((v) => !event.attendeeIds.includes(v));
  }, [event]);

  useEffect(() => {
    if (!event || isCreator) return;

    interestedInEvent(event.id);
  }, [event, isCreator]);

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
          <h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}
              target="_blank"
            >
              {event.location}
            </a>
          </h2>
          {event.startDate && (
            <h3>
              <time>
                {event.startDate.toDateString()}{" "}
                {event.startDate.toLocaleTimeString()}
              </time>
            </h3>
          )}
          <p className={styles.Description}>{event.description}</p>
        </div>
        <div>
          <div>
            <h2>Created By</h2>
            {!createdBy && <Loading />}
            {createdBy && <Profile user={createdBy} />}
          </div>
          <AttendeeList attendees={attendees} createdBy={event.createdBy} />
          <InterestedList interestedIds={interestedIds} />
        </div>
      </main>
    </div>
  );
};
