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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import app from "./Firebase";
import { dataToEvent } from "./utils";
import { BaseEvent, EventDetails } from "./event";
import { getCurrentUser } from "./Auth";

const DefaultPageSize = 20;

const db = getFirestore(app);

export const getEvent = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User required.");
  }

  const eventRef = doc(db, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) {
    throw Error(`Event ${eventId} does not exist.`);
  }

  const eventData = eventSnapshot.data();
  return dataToEvent(eventSnapshot.id, eventData, user);
};

export const getUpcomingEvents = async () => {
  const user = await getCurrentUser();
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
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User required.");
  }

  const docRef = await addDoc(collection(db, "events"), {
    ...baseEvent,
    startDate: Timestamp.fromDate(new Date(baseEvent.startDate)),
    attendees: [user.uid],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdBy: user.uid,
    updatedBy: user.uid,
  });

  return docRef.id;
};

export const attendEvent = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User required.");
  }

  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, {
    attendees: arrayUnion(user.uid),
  });

  return await getEvent(eventId);
};

/*
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});
*/
