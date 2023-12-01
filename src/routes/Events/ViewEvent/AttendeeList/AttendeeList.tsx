import { useFetcher } from "react-router-dom";
import { User, useAuth } from "../../../../Repo";
import { useMemo } from "react";
import { Loading, Profile } from "../../../../Components";
import styles from "./AttendeeList.module.css";

interface Props {
  attendees: User[] | undefined;
  createdBy: string;
}

export const AttendeeList = ({ attendees, createdBy }: Props) => {
  const fetcher = useFetcher();
  const { user } = useAuth();

  const isAttending = useMemo(
    () => user && attendees?.map((attendee) => attendee.uid).includes(user.uid),
    [attendees, user]
  );
  const isCreator = user?.uid === createdBy;

  return (
    <div className={styles.AttendeeList}>
      <h2>Attendees</h2>
      {!attendees && <Loading />}
      {attendees && (
        <>
          {attendees.length === 0 && <p>No one is coming</p>}
          {attendees.length > 0 && (
            <ul>
              {attendees.map((attendee: User) => (
                <li key={attendee.uid}>
                  <Profile user={attendee} />
                  {!isCreator && attendee.uid === user?.uid && (
                    <fetcher.Form method="post">
                      <button
                        disabled={fetcher.state !== "idle"}
                        name="action"
                        value="leave"
                      >
                        Leave
                      </button>
                    </fetcher.Form>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!isAttending && (
            <fetcher.Form method="post">
              <button
                disabled={fetcher.state !== "idle"}
                name="action"
                value="attend"
              >
                Attend
              </button>
            </fetcher.Form>
          )}
        </>
      )}
    </div>
  );
};
