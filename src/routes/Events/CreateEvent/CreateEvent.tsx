import { Form, useNavigation } from "react-router-dom";
import styles from "./CreateEvent.module.css";

export const CreateEvent = () => {
  const navigation = useNavigation();
  const today = new Date().toISOString().split("T")[0];

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
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="The Beach"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={today}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Time to soak up some sun 🏝️"
            required
          ></textarea>
        </div>

        {/* TODO: attendees, photo, visibility */}
        <button disabled={navigation.state === "loading"} type="submit">
          Create Event
        </button>
      </Form>
    </>
  );
};
