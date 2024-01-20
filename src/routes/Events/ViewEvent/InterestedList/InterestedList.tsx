import { User, getUsers, interestedInEvent, useAuth } from "../../../../Repo";
import { useEffect, useMemo, useState } from "react";
import { Loading, Profile } from "../../../../Components";
import styles from "./InterestedList.module.css";
import { useFetcher, useNavigate } from "react-router-dom";

interface Props {
  eventId: string;
  interestedIds: string[] | undefined;
  notInterestedIds: string[] | undefined;
  isCreatedByUser: boolean;
  userIsAttending: boolean;
}

export const InterestedList = ({
  eventId,
  interestedIds,
  notInterestedIds,
  isCreatedByUser,
  userIsAttending,
}: Props) => {
  const fetcher = useFetcher();
  const { user } = useAuth();
  const [interestedUsers, setInterestedUsers] = useState<User[] | undefined>();
  const navigate = useNavigate();

  const isInterested = useMemo(
    () => interestedIds && user && interestedIds.includes(user.uid),
    [interestedIds, user]
  );

  const isNotInterested = useMemo(
    () => notInterestedIds && user && notInterestedIds.includes(user.uid),
    [notInterestedIds, user]
  );

  useEffect(() => {
    if (
      !eventId ||
      isCreatedByUser ||
      userIsAttending ||
      isInterested ||
      isNotInterested
    )
      return;

    const wrapper = async () => {
      await interestedInEvent(eventId);
      navigate(0);
    };
    wrapper();
  }, [
    eventId,
    isCreatedByUser,
    navigate,
    isInterested,
    isNotInterested,
    userIsAttending,
  ]);

  useEffect(() => {
    const wrapper = async () => {
      if (!interestedIds) return;
      const users = await getUsers(interestedIds);
      setInterestedUsers(users);
    };
    wrapper();
  }, [interestedIds]);

  return (
    <div className={styles.InterestedList}>
      <h2>Interested</h2>
      {!interestedUsers && <Loading />}
      {interestedUsers?.length === 0 && <p>No one is interested</p>}
      {interestedUsers && interestedUsers.length > 0 && (
        <ul>
          {interestedUsers.map((interestedUser: User) => (
            <li key={interestedUser.uid}>
              <Profile user={interestedUser} />
              {interestedUser.uid === user?.uid && (
                <fetcher.Form method="post">
                  <button
                    disabled={fetcher.state !== "idle"}
                    name="action"
                    value="not-interested"
                  >
                    Not Interested
                  </button>
                </fetcher.Form>
              )}
            </li>
          ))}
        </ul>
      )}
      {!isCreatedByUser && !isInterested && !userIsAttending && (
        <fetcher.Form method="post">
          <button
            disabled={fetcher.state !== "idle"}
            name="action"
            value="interested"
          >
            Interested
          </button>
        </fetcher.Form>
      )}
    </div>
  );
};
