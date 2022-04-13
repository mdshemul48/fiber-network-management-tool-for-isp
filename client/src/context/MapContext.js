import { useJsApiLoader } from '@react-google-maps/api';
import { createContext, useCallback, useState } from 'react';

export const MapCreatedContext = createContext({
  map: null,
  onLoad: null,
  onUnmount: null,
});

export const MapContext = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <MapCreatedContext.Provider value={{ map, onLoad, onUnmount, isLoaded }}>
      {children}
    </MapCreatedContext.Provider>
  );
};
