import { useContext } from "react";
import { CreatedEditablePolylineContext } from "../context/EditablePolylineContext";

const useEditablePolyline = () => {
  return useContext(CreatedEditablePolylineContext);
};

export default useEditablePolyline;
