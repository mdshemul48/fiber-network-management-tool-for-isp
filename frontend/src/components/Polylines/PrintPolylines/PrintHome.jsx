import React, { useEffect, useState } from "react";
import { InfoWindow, Marker, Polyline } from "@react-google-maps/api";
import coreColor from "../../../utility/coreColor";
import homeIcon from "../../../assets/img/onu.png";
import toast from "react-hot-toast";
import axiosInstance from "../../../utility/axios";
import usePolylines from "../../../hooks/usePolylines";

const PrintHome = ({ connection }) => {
  const { setFetch } = usePolylines();
  const [coordinates, setCoordinates] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const { name, color, onuNo, type, locations, _id, totalCore, length } = connection;

  useEffect(() => {
    if (locations?.coordinates) {
      const coordinates = locations.coordinates.map((item) => {
        return { lat: item[0], lng: item[1] };
      });
      setCoordinates(coordinates);
    }
  }, [locations.coordinates]);

  const options = {
    path: coordinates,
    geodesic: true,
    strokeColor: coreColor.find((item) => item.colorName === color)?.colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const icon = {
    url: homeIcon,
    scaledSize: new window.google.maps.Size(35, 25),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  const deleteHandler = () => {
    toast.promise(axiosInstance.delete(`/home-connection?id=${_id}`), {
      loading: "Deleting...",
      success: () => {
        setFetch(true);
        return "Deleted successfully";
      },
      error: ({
        response: {
          data: { message },
        },
      }) => message,
    });
  };
  return (
    <>
      <Polyline
        options={options}
        onRightClick={({ latLng }) => {
          setPosition(latLng);
          setShowInfoWindow(true);
        }}
      />

      <Marker
        position={
          coordinates[coordinates.length - 1] &&
          new window.google.maps.LatLng({
            lat: coordinates[coordinates.length - 1]?.lat,
            lng: coordinates[coordinates.length - 1]?.lng,
          })
        }
        onClick={() => {
          console.log("marker");
        }}
        icon={icon}
        onRightClick={({ latLng }) => {
          setPosition(latLng);
          setShowInfoWindow(true);
        }}
      />
      {showInfoWindow && (
        <InfoWindow position={position} onCloseClick={() => setShowInfoWindow(false)}>
          <>
            <p className="mb-1 fw-bold">{name}</p>
            <hr className="my-1" />
            <p className="mb-1">
              <span className="fw-bold">Onu No:</span> {onuNo}
            </p>
            <p className="mb-1">
              <span className="fw-bold">connection Type:</span> {type}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Core Color:</span> {color}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Distance:</span> {length.toFixed(2)}m
            </p>
            <p className="mb-1">
              <span className="fw-bold">Total Core:</span> {totalCore}
            </p>
            <button className="badge mb-1 bg-danger border-0" onClick={deleteHandler}>
              Delete
            </button>
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintHome;
