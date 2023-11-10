import { redirect } from "react-router-dom";
import { BaseEvent } from "../event";

export const createEventAction =
  (createEvent: (event: BaseEvent) => Promise<string>) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const event = Object.fromEntries(formData) as unknown as BaseEvent;
    const id = await createEvent(event);
    return redirect(`/events/${id}`);
  };
