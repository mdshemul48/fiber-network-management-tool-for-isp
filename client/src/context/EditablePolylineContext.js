import { createContext, useState } from 'react';

const CreatedEditablePolylineContext = createContext({
  polyline: null,
  parent: null,
  parentCoordinate: null,
  setParent: () => {},
  setPolyline: () => {},
  setParentCoordinate: () => {},
});

const EditableContextProvider = ({ children }) => {
  const [polyline, setCurrentPolyline] = useState(null);
  const [parent, setParentPolyline] = useState(null);
  const [parentCoordinate, setParentCoordinate] = useState(null);

  const setParent = (polyline, latLng) => {
    setParentPolyline(polyline);
    setParentCoordinate(latLng);
  };

  const setPolyline = (polyline) => {
    setCurrentPolyline(polyline);
  };
  return (
    <CreatedEditablePolylineContext.Provider
      value={{
        polyline,
        setParent,
        setPolyline,
        parent,
        parentCoordinate,
        setParentCoordinate,
      }}
    >
      {children}
    </CreatedEditablePolylineContext.Provider>
  );
};

export { CreatedEditablePolylineContext, EditableContextProvider };
