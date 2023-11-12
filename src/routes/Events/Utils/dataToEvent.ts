import { DocumentData } from "firebase/firestore";
import { EventDetails } from "../event";

export const dataToEvent = (id: string, eventData: DocumentData) => {
  return {
    ...eventData,
    id,
    startDate: eventData.startDate && new Date(eventData.startDate),
  } as EventDetails;
};
