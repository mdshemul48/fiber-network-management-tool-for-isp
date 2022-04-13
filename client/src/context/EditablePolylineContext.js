import { createContext, useState } from 'react';

const CreatedEditablePolylineContext = createContext({
  polyline: null,
  parent: null,
  setParent: () => {},
  setPolyline: () => {},
});

const EditableContextProvider = ({ children }) => {
  const [polyline, setCurrentPolyline] = useState(null);
  const [parent, setParentPolyline] = useState(null);

  const setParent = (polyline) => {
    setParentPolyline(polyline);
  };

  const setPolyline = (polyline) => {
    setCurrentPolyline(polyline);
  };
  return (
    <CreatedEditablePolylineContext.Provider
      value={{ polyline, setParent, setPolyline, parent }}
    >
      {children}
    </CreatedEditablePolylineContext.Provider>
  );
};

export { CreatedEditablePolylineContext, EditableContextProvider };
