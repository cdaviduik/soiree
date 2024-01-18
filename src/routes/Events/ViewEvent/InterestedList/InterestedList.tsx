import { User, getUsers } from "../../../../Repo";
import { useEffect, useState } from "react";
import { Loading, Profile } from "../../../../Components";
import styles from "./InterestedList.module.css";

interface Props {
  interestedIds: string[];
}

export const InterestedList = ({ interestedIds }: Props) => {
  const [interested, setInterested] = useState<User[] | undefined>();

  useEffect(() => {
    const wrapper = async () => {
      if (!interestedIds) return;
      const users = await getUsers(interestedIds);
      setInterested(users);
    };
    wrapper();
  }, [interestedIds]);

  return (
    <div className={styles.InterestedList}>
      <h2>Interested</h2>
      {!interested && <Loading />}
      {interested?.length === 0 && <p>No one is interested</p>}
      {interested && interested.length > 0 && (
        <>
          <ul>
            {interested.map((user: User) => (
              <li key={user.uid}>
                <Profile user={user} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
