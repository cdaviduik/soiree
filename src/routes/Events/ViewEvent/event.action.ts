import { Params } from "react-router-dom";
import {
  attendEvent,
  interestedInEvent,
  dontAttendEvent,
  notInterestedInEvent,
} from "../../../Repo";

export const eventAction = async ({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) => {
  if (!params.eventId) {
    throw new Error("Event required.");
  }

  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "attend") {
    return attendEvent(params.eventId);
  }
  if (action === "dont-attend") {
    return dontAttendEvent(params.eventId);
  }
  if (action === "interested") {
    return interestedInEvent(params.eventId);
  }
  if (action === "not-interested") {
    return notInterestedInEvent(params.eventId);
  }
};
