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
});

const EditableContextProvider = ({ children }) => {
  const polylineRef = useRef(null);
  const [parent, setParentPolyline] = useState(null);
  const [parentCoordinate, setParentCoordinate] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const setParent = (polyline, latLng) => {
    setParentPolyline(polyline);
    setParentCoordinate(latLng);
  };

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
      }}
    >
      {children}
    </CreatedEditablePolylineContext.Provider>
  );
};

export { CreatedEditablePolylineContext, EditableContextProvider };
