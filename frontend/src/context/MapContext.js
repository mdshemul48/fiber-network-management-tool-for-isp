import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useCallback, useState } from "react";

export const MapCreatedContext = createContext({
  map: null,
  onLoad: null,
  onUnmount: null,
});

export const MapContext = ({ children }) => {
  const [libraries] = useState(["geometry"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);

    map.addListener("zoom_changed", () => {
      const zoom = map.getZoom();
      localStorage.setItem("zoom", zoom);
    });

    map.addListener("center_changed", () => {
      const { lat: latC, lng: lngC } = map.getCenter();
      const lat = latC();
      const lng = lngC();
      localStorage.setItem(
        "center",
        JSON.stringify({
          lat: lat,
          lng: lng,
        })
      );
    });
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <MapCreatedContext.Provider value={{ map, onLoad, onUnmount, isLoaded }}>
      {isLoaded && children}
    </MapCreatedContext.Provider>
  );
};
