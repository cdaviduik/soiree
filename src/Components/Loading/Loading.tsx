import "./Loading.css";
import { useEffect, useState } from "react";

interface Params {
  text?: string;
}

export const Loading = ({ text }: Params) => {
  const defaultText = text || "Loading";
  const [loadingText, setLoadingText] = useState(defaultText);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateText = () => {
      if (index > 2) {
        setLoadingText(defaultText);
        setIndex(0);
      } else {
        setLoadingText((prev) => prev + ".");
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(updateText, 500);
    return () => clearTimeout(timer);
  }, [index, defaultText]);

  return <span className="Loading">{loadingText}</span>;
};
