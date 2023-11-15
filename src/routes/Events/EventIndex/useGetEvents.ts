import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useFirestore } from "../../../Contexts/Firestore";
import { EventDetails } from "../event";
import { dataToEvent } from "../utils";
import { useAuth } from "../../../Contexts/Auth";

const DefaultPageSize = 20;

export const useGetEvents = () => {
  const db = useFirestore();
  const { user } = useAuth();

  return async (): Promise<EventDetails[]> => {
    const eventsRef = collection(db, "events");
    const q = await query(
      eventsRef,
      where("createdBy", "==", user?.uid),
      limit(DefaultPageSize)
    );
    const eventsSnapshot = await getDocs(q);

    const events: EventDetails[] = [];
    eventsSnapshot.forEach((doc) => {
      events.push(dataToEvent(doc.id, doc.data()));
    });

    return events as EventDetails[];
  };
};
