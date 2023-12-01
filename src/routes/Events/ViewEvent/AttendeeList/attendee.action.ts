import { Params } from "react-router-dom";
import { attendEvent, leaveEvent } from "../../../../Repo";

export const attendeeAction = async ({
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
  if (action === "leave") {
    return leaveEvent(params.eventId);
  }
};
