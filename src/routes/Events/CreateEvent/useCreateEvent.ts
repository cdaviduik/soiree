import { addDoc, collection } from "firebase/firestore";
import { useFirestore } from "../../../Contexts/Firestore";
import { BaseEvent } from "../event";
import { useAuth } from "../../../Contexts/Auth";

export const useCreateEvent = () => {
  const db = useFirestore();
  const { user } = useAuth();

  return async (baseEvent: BaseEvent) => {
    if (!user) {
      throw Error("No user available");
    }
    const docRef = await addDoc(collection(db, "events"), {
      ...baseEvent,
      createdBy: user.uid,
      updatedBy: user.uid,
    });

    return docRef.id;
  };
};
