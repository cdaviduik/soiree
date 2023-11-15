import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "../../../Contexts/Firestore";
import { EventDetails } from "../event";
import { dataToEvent } from "../utils";

export const useGetEvent = () => {
  const db = useFirestore();

  return async (eventId: string): Promise<EventDetails> => {
    const eventRef = doc(db, "events", eventId);
    const eventSnapshot = await getDoc(eventRef);

    if (!eventSnapshot.exists()) {
      throw Error(`Event ${eventId} does not exist.`);
    }

    const eventData = eventSnapshot.data();
    return dataToEvent(eventSnapshot.id, eventData);
  };
};
