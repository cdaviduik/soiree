import { Params } from "react-router-dom";
import { attendEvent } from "../../../Repo";

export const attendEventAction = async ({ params }: { params: Params }) => {
  if (!params.eventId) {
    throw new Error("Event required.");
  }

  return attendEvent(params.eventId);
};
