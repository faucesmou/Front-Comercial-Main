import { useContext } from "react";
import ChatsContext from "../context/ChatsProvider";

export const useChats = () => {
  return useContext(ChatsContext);
};
