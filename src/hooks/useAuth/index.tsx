import { useContext } from "react";
import { AppContext } from "..";

export const useApp = () => {
  return useContext(AppContext);
}