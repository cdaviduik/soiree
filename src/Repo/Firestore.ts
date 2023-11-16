import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import app from "./Firebase";
import { dataToEvent } from "./utils";
import { BaseEvent, EventDetails } from "./event";
import { getUser } from "./Auth";

const DefaultPageSize = 20;

const db = getFirestore(app);

export const getEvent = async (eventId: string) => {
  const eventRef = doc(db, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) {
    throw Error(`Event ${eventId} does not exist.`);
  }

  const eventData = eventSnapshot.data();
  return dataToEvent(eventSnapshot.id, eventData);
};

export const getEvents = async () => {
  const user = getUser();
  if (!user) {
    throw Error("User required.");
  }

  const eventsRef = collection(db, "events");
  const q = query(
    eventsRef,
    where("createdBy", "==", user.uid),
    limit(DefaultPageSize)
  );
  const eventsSnapshot = await getDocs(q);

  const events: EventDetails[] = [];
  eventsSnapshot.forEach((doc) => {
    events.push(dataToEvent(doc.id, doc.data()));
  });

  return events as EventDetails[];
};

export const createEvent = async (baseEvent: BaseEvent) => {
  const user = getUser();
  if (!user) {
    throw Error("User required.");
  }

  const docRef = await addDoc(collection(db, "events"), {
    ...baseEvent,
    createdBy: user.uid,
    updatedBy: user.uid,
  });

  return docRef.id;
};
