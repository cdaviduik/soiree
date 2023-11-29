import { useFetcher } from "react-router-dom";
import { User, useAuth } from "../../../../Repo";
import { useMemo } from "react";
import { Loading, Profile } from "../../../../Components";
import styles from "./AttendeeList.module.css";

const getOptimisticAttendees = (
  eventAttendees: User[] | undefined,
  optimisticAttendee: User | null | undefined
) => {
  if (!eventAttendees) {
    return undefined;
  }

  if (optimisticAttendee) {
    return [...eventAttendees, optimisticAttendee];
  }
  return eventAttendees;
};

interface Props {
  attendees: User[] | undefined;
}

export const AttendeeList = ({ attendees: eventAttendees }: Props) => {
  const fetcher = useFetcher();
  const { user } = useAuth();

  const attendees = getOptimisticAttendees(
    eventAttendees,
    fetcher.formData?.get("attend") === "true" ? user : undefined
  );
  const isAttending = useMemo(
    () => user && attendees?.map((attendee) => attendee.uid).includes(user.uid),
    [attendees, user]
  );

  return (
    <div className={styles.AttendeeList}>
      <h2>Attendees</h2>
      {!attendees && <Loading />}
      {attendees && attendees.length === 0 && <p>No one is coming</p>}
      {attendees && attendees.length > 0 && (
        <ul>
          {attendees.map((attendee: User) => (
            <li key={attendee.uid}>
              <Profile user={attendee} />
            </li>
          ))}
        </ul>
      )}
      {!isAttending && (
        <fetcher.Form method="post">
          <button name="attend">Attend</button>
        </fetcher.Form>
      )}
    </div>
  );
};
