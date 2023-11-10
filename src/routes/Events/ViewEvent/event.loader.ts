import { LoaderFunction } from "react-router";
import { EventDetails } from "../event";

export const eventLoader = (
  getEvent: (eventId: string) => Promise<EventDetails>
) => {
  const loader: LoaderFunction = async ({ params }) => {
    if (!params.eventId) {
      throw Error("No Event found for undefined eventId");
    }

    return await getEvent(params.eventId);
  };
  return loader;
};
