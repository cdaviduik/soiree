import { LoaderFunction } from "react-router";
import { getEvent } from "../../../Repo";

export const eventLoader: LoaderFunction = async ({ params }) => {
  if (!params.eventId) {
    throw Error("No Event found for undefined eventId");
  }

  return await getEvent(params.eventId);
};
