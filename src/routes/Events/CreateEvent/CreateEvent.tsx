import { ChangeEvent, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import { Image, uploadImage } from "../../../Repo/Storage";
import { useUser } from "../../../Repo";
import styles from "./CreateEvent.module.css";

export const CreateEvent = () => {
  const navigation = useNavigation();
  const user = useUser();
  const [image, setImage] = useState<Image>({ id: "" });

  const today = new Date().toISOString().split("T")[0];

  const fileChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      console.warn("No image to upload.");
      return;
    }
    const result = await uploadImage(user.uid, file);
    setImage(result);
  };

  return (
    <>
      <h1>Create an Event</h1>
      <div className={styles.Container}>
        <Form method="post" className={styles.Form}>
          <div>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={fileChanged}
            />
          </div>
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

          {/* TODO: attendees, visibility */}
          <button disabled={navigation.state === "loading"} type="submit">
            Create Event
          </button>
        </Form>
        {image?.url && <img className={styles.ImagePreview} src={image?.url} />}
      </div>
    </>
  );
};
