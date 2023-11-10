import { Form } from "react-router-dom";
import styles from "./CreateEvent.module.css";

export const CreateEvent = () => {
  return (
    <>
      <h1>Create an Event</h1>
      <Form method="post" className={styles.Form}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Best Friends FiveEver"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Time to soak up some sun on the beaches."
          ></textarea>
        </div>
        <div>
          {/* TODO: init to a value */}
          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" name="startDate" type="date" />
        </div>
        {/* TODO: attendees, photo, visibility */}
        <button type="submit">Create Event</button>
      </Form>
    </>
  );
};
