import { doc, getDoc } from "firebase/firestore";
import { useFirestore } from "../../../Contexts/Firestore";
import { EventDetails } from "../event";

export const useGetEvent = () => {
  const db = useFirestore();

  return async (eventId: string): Promise<EventDetails> => {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw Error(`Event ${eventId} does not exist.`);
    }

    const eventData = docSnap.data();
    return {
      ...eventData,
      startDate: eventData.startDate && new Date(eventData.startDate),
    } as EventDetails;
  };
};
