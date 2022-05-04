import { useContext } from "react";

import { MapCreatedContext } from "../context/MapContext";
const useMap = () => {
  return useContext(MapCreatedContext);
};

export default useMap;
