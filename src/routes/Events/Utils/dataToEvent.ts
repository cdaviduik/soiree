import { DocumentData } from "firebase/firestore";
import { EventDetails } from "../../../Repo";

export const dataToEvent = (id: string, eventData: DocumentData) => {
  return {
    ...eventData,
    id,
    startDate: eventData.startDate && new Date(eventData.startDate),
  } as EventDetails;
};
