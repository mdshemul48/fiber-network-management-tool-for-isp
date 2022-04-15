import { useCallback, useEffect } from 'react';
import { createContext, useRef, useState } from 'react';

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
  const [parentCoordinate, setParentCoordinate] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (parentCoordinate) {
      setCoordinates(() => {
        return [parentCoordinate.toJSON()];
      });
    }
  }, [parentCoordinate, setCoordinates]);

  const setParent = useCallback((polyline, latLng) => {
    setParentPolyline(polyline);
    setParentCoordinate(latLng);
  }, []);

  const addVertex = useCallback((event) => {
    setCoordinates((prevState) => {
      return [...prevState, event.latLng.toJSON()];
    });
  }, []);

  const reset = useCallback(() => {
    setParentPolyline(null);
    setParentCoordinate(null);
    setCoordinates([]);
  }, []);

  return (
    <CreatedEditablePolylineContext.Provider
      value={{
        polylineRef,
        setParent,
        parent,
        parentCoordinate,
        setParentCoordinate,
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
