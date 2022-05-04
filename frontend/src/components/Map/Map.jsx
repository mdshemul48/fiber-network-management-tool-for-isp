import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import useMap from "../../hooks/useMap";
import useEditablePolyline from "../../hooks/useEditablePolyline";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = JSON.parse(localStorage.getItem("center")) || {
  lat: 23.824374476895283,
  lng: 90.27119894947462,
};
const zoom = parseInt(localStorage.getItem("zoom")) || 12;

function Map({ children }) {
  const { isLoaded, onLoad, onUnmount } = useMap();
  const { addVertex } = useEditablePolyline();

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={addVertex}
    >
      {children}
    </GoogleMap>
  ) : (
    <>
      {" "}
      <h1>Loading</h1>
    </>
  );
}

export default React.memo(Map);
