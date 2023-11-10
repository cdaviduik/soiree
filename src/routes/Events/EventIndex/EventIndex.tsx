import { Link } from "react-router-dom";

export const EventIndex = () => {
  return (
    <>
      <h1>Events</h1>
      <Link to="/events/new">Add an Event</Link>
    </>
  );
};
