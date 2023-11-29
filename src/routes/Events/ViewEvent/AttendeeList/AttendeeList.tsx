import { useFetcher } from "react-router-dom";
import { User, useAuth } from "../../../../Repo";
import { useMemo } from "react";

const getOptimisticAttendees = (
  eventAttendees: string[],
  optimisticAttendee: User | null | undefined
) => {
  if (optimisticAttendee) {
    return [...eventAttendees, optimisticAttendee.uid];
  }
  return eventAttendees;
};

export const AttendeeList = ({
  attendees: eventAttendees,
}: {
  attendees: string[];
}) => {
  // TODO: fetch users for attendee uids
  const fetcher = useFetcher();
  const { user } = useAuth();

  const attendees = getOptimisticAttendees(
    eventAttendees,
    fetcher.formData?.get("attend") === "true" ? user : undefined
  );
  const isAttending = useMemo(
    () => user && attendees.includes(user.uid),
    [attendees, user]
  );

  return (
    <div>
      <h2>Attendees</h2>
      {attendees.length === 0 && <p>No one is coming</p>}
      {attendees.length > 0 && (
        <ul>
          {attendees.map((attendee: string) => (
            <li key={attendee}>{attendee}</li>
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
