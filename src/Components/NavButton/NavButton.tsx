import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  children: ReactNode;
}

export const NavButton = ({ to, children }: Props) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(to);
  };

  return <button onClick={navigateTo}>{children}</button>;
};
