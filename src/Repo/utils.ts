import { DocumentData } from "firebase/firestore";
import { EventDetails } from "./event";
import { getUser } from "./Auth";

export const dataToEvent = (id: string, eventData: DocumentData) => {
  const user = getUser();
  return {
    ...eventData,
    id,
    startDate: eventData.startDate && new Date(eventData.startDate),
    createdByUser: eventData.createdBy === user?.uid,
  } as EventDetails;
};
