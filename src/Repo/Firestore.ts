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
  orderBy,
  Timestamp,
} from "firebase/firestore";
import app from "./Firebase";
import { dataToEvent } from "./utils";
import { BaseEvent, EventDetails } from "./event";
import { getUser } from "./Auth";

const DefaultPageSize = 20;

const db = getFirestore(app);

export const getEvent = async (eventId: string) => {
  const user = await getUser();
  const eventRef = doc(db, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) {
    throw Error(`Event ${eventId} does not exist.`);
  }

  const eventData = eventSnapshot.data();
  return dataToEvent(eventSnapshot.id, eventData, user);
};

export const getUpcomingEvents = async () => {
  const user = await getUser();
  if (!user) {
    throw Error("User required.");
  }

  const today = new Date();
  const eventsRef = collection(db, "events");
  const q = query(
    eventsRef,
    where("createdBy", "==", user.uid),
    where("startDate", ">=", today),
    orderBy("startDate", "asc"),
    limit(DefaultPageSize)
  );
  const eventsSnapshot = await getDocs(q);

  const events: EventDetails[] = [];
  eventsSnapshot.forEach((doc) => {
    events.push(dataToEvent(doc.id, doc.data(), user));
  });

  return events as EventDetails[];
};

export const createEvent = async (baseEvent: BaseEvent) => {
  const user = await getUser();
  if (!user) {
    throw Error("User required.");
  }

  console.log("baseEvent", baseEvent);

  const docRef = await addDoc(collection(db, "events"), {
    ...baseEvent,
    startDate: Timestamp.fromDate(new Date(baseEvent.startDate)),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: user.uid,
    updatedBy: user.uid,
  });

  return docRef.id;
};
