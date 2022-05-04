import { useContext } from "react";

import { PolylinesContext } from "../context/PolylinesContext";

const usePolylines = () => {
  return useContext(PolylinesContext);
};

export default usePolylines;
