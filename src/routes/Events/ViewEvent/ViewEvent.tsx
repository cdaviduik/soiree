import styles from "./ViewEvent.module.css";
import { useLoaderData } from "react-router-dom";
import { EventDetails, User, getUser, getUsers, useAuth } from "../../../Repo";
import { AttendeeList } from "./AttendeeList";
import { useEffect, useMemo, useState } from "react";
import { Loading, Profile } from "../../../Components";
import { InterestedList } from "./InterestedList/InterestedList";

export const ViewEvent = () => {
  const [createdByUser, setCreatedByUser] = useState<User>();
  const [attendees, setAttendees] = useState<User[] | undefined>();
  const event = useLoaderData() as EventDetails | null;
  const { user } = useAuth();

  // interested
  // TODO: remove
  const interestedIds = useMemo(() => {
    if (!event) return undefined;
    return event.interestedIds.filter((v) => !event.attendeeIds.includes(v));
  }, [event]);

  const userIsAttending = useMemo(() => {
    return Boolean(event && user && event?.attendeeIds.includes(user.uid));
  }, [event, user]);

  // TODO: move these into loaders
  useEffect(() => {
    const wrapper = async () => {
      if (!event?.createdBy) return;
      const user = await getUser(event.createdBy);
      setCreatedByUser(user);
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
            <h2>Hosting</h2>
            {!createdByUser && <Loading />}
            {createdByUser && <Profile user={createdByUser} />}
          </div>
          <AttendeeList attendees={attendees} createdBy={event.createdBy} />
          <InterestedList
            eventId={event.id}
            userIsAttending={userIsAttending}
            interestedIds={interestedIds}
            notInterestedIds={event.notInterestedIds}
            isCreatedByUser={event.isCreatedByUser}
          />
        </div>
      </main>
    </div>
  );
};
