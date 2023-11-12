import { Form } from "react-router-dom";
import styles from "./CreateEvent.module.css";
import { useState } from "react";

export const CreateEvent = () => {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);

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
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="The Great Hall"
          />
        </div>
        <div>
          {/* TODO: init to a value */}
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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

        {/* TODO: attendees, photo, visibility */}
        <button type="submit">Create Event</button>
      </Form>
    </>
  );
};
