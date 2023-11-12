import { collection, getDocs, limit, query } from "firebase/firestore";
import { useFirestore } from "../../../Contexts/Firestore";
import { EventDetails } from "../event";
import { dataToEvent } from "../Utils";

const DefaultPageSize = 20;

export const useGetEvents = () => {
  const db = useFirestore();

  return async (): Promise<EventDetails[]> => {
    const eventsRef = collection(db, "events");
    const q = await query(eventsRef, limit(DefaultPageSize));
    const eventsSnapshot = await getDocs(q);

    const events: EventDetails[] = [];
    eventsSnapshot.forEach((doc) => {
      events.push(dataToEvent(doc.id, doc.data()));
    });

    return events as EventDetails[];
  };
};
