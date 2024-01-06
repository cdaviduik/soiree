import { DocumentData } from "firebase/firestore";
import { EventDetails } from "./event";
import { User } from "firebase/auth";

export const dataToEvent = (
  id: string,
  eventData: DocumentData,
  user: User | null,
  imageURL?: string
) => {
  return {
    ...eventData,
    id,
    imageURL,
    startDate: eventData.startDate?.toDate(),
    isCreatedByUser: eventData.createdBy === user?.uid,
  } as EventDetails;
};
