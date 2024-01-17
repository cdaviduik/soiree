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
  arrayRemove,
} from "firebase/firestore";
import app from "./Firebase";
import { dataToEvent } from "./utils";
import { BaseEvent, EventDetails } from "./event";
import { getCurrentUser } from "./Auth";
import { getImageURL } from "./Storage";

const DefaultPageSize = 20;

const db = getFirestore(app);

// TODO: catch errors
export const getEvent = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const eventRef = doc(db, "events", eventId);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) {
    throw Error(`Event ${eventId} does not exist.`);
  }

  const eventData = eventSnapshot.data();
  const imageURL = await getImageURL(eventData.imageID);

  return dataToEvent(eventSnapshot.id, eventData, user, imageURL);
};

export const getUpcomingEvents = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const today = new Date();
  const eventsRef = collection(db, "events");
  const q = query(
    eventsRef,
    // or(
    //   where("createdBy", "==", user.uid),
    //   where("attendees", "array-contains", user.uid)
    // ),
    where("attendees", "array-contains", user.uid),
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

export const leaveEvent = async (eventId: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw Error("User required.");
  }

  const eventRef = doc(db, "events", eventId);
  await updateDoc(eventRef, {
    attendees: arrayRemove(user.uid),
  });

  return await getEvent(eventId);
};
