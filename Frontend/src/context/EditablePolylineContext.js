import { useCallback } from "react";
import toast from "react-hot-toast";
import { createContext, useRef, useState } from "react";

const CreatedEditablePolylineContext = createContext({
  polylineRef: {},
  parent: {},
  parentCoordinate: {},
  coordinates: [],
  setParent: () => {},
  setPolyline: () => {},
  setParentCoordinate: () => {},
  setCoordinates: () => {},
  addVertex: () => {},
  reset: () => {},
});

const EditableContextProvider = ({ children }) => {
  const polylineRef = useRef(null);
  const [parent, setParentPolyline] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const setParent = useCallback((polyline, latLng) => {
    setParentPolyline(polyline);
    if (latLng) {
      setCoordinates([latLng.toJSON()]);
    }
    toast.success(`${polyline.type} selected`);
  }, []);

  const addVertex = useCallback((event) => {
    setCoordinates((prevState) => {
      return [...prevState, event.latLng.toJSON()];
    });
  }, []);

  const reset = useCallback(() => {
    setParentPolyline(null);
    setCoordinates([]);
  }, []);

  return (
    <CreatedEditablePolylineContext.Provider
      value={{
        polylineRef,
        setParent,
        parent,
        coordinates,
        setCoordinates,
        addVertex,
        reset,
      }}
    >
      {children}
    </CreatedEditablePolylineContext.Provider>
  );
};

export { CreatedEditablePolylineContext, EditableContextProvider };
