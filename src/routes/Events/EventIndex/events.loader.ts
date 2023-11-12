import { EventDetails } from "../event";

export const eventsLoader = (getEvents: () => Promise<EventDetails[]>) => {
  return getEvents;
};
