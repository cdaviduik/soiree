import "./Loading.css";
import { useEffect, useState } from "react";

const defaultText = "Loading";

export const Loading = () => {
  const [text, setText] = useState(defaultText);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateText = () => {
      if (index > 2) {
        setText(defaultText);
        setIndex(0);
      } else {
        setText((prev) => prev + ".");
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(updateText, 500);
    return () => clearTimeout(timer);
  }, [index]);

  return <div className="Loading">{text}</div>;
};
