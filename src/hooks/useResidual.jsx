import { useContext } from "react";
import ResidualContext from "../context/ResidualProvider";

export const useResidual = () => {
  return useContext(ResidualContext);
};
