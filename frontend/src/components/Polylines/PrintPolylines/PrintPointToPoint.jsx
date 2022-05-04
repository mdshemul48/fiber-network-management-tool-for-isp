import React, { useEffect, useState } from "react";
import { Polyline, Marker, InfoWindow } from "@react-google-maps/api";

import coreColor from "../../../utility/coreColor";
import tjIcon from "../../../assets/img/tj.png";
import useEditablePolyline from "../../../hooks/useEditablePolyline";
import toast from "react-hot-toast";
import axiosInstance from "../../../utility/axios";
import usePolylines from "../../../hooks/usePolylines";

const PrintPointToPoint = ({ connection }) => {
  const [coordinates, setCoordinates] = useState([]);
  const { setFetch } = usePolylines();
  const { setParent } = useEditablePolyline();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);

  const { _id, name, location, totalCore, totalConnected, type, childrens, markers, length } = connection;

  useEffect(() => {
    if (location?.coordinates) {
      const coordinates = location.coordinates.map((item) => {
        return { lat: item[1], lng: item[0] };
      });
      setCoordinates(coordinates);
    }
  }, [location.coordinates]);

  const options = {
    geodesic: true,
    strokeColor: "#142F43",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };
  const colorCores = coreColor.slice(0, totalCore);

  const CoreStatus = colorCores.map((item) => {
    const targetColor = childrens.find((child) => child.color === item.colorName);
    if (targetColor) {
      return (
        <p className="mb-1">
          {item.colorName} : used (Port: {targetColor.portNo})
        </p>
      );
    } else {
      return <p className="mb-1">{item.colorName} : available</p>;
    }
  });

  const onClickHandler = (event) => {
    setParent(connection, event.latLng);
  };

  const deleteHandler = () => {
    toast.promise(axiosInstance.delete(`/ptp-connection?id=${_id}`), {
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
        path={coordinates}
        options={options}
        onRightClick={({ latLng }) => {
          setPosition(latLng);
          setShowInfoWindow(true);
        }}
        onClick={onClickHandler}
      />

      {markers.map((marker) => {
        const {
          location: { coordinates },
        } = marker;

        const icon = {
          url: tjIcon,
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        };
        return (
          <Marker
            key={marker._id}
            position={{ lat: coordinates[0], lng: coordinates[1] }}
            onClick={onClickHandler}
            icon={icon}
            onRightClick={({ latLng }) => {
              setPosition(latLng);
              setShowInfoWindow(true);
            }}
          />
        );
      })}

      {showInfoWindow && (
        <InfoWindow position={position} onCloseClick={() => setShowInfoWindow(false)}>
          <>
            <p className="mb-1 fw-bold">{name}</p>
            <hr className="my-1" />
            <p className="mb-1">
              <span className="fw-bold">Connection Type:</span> {type}
            </p>
            <p className="mb-1">
              <span className=" fw-bold">total Used Core:</span>
              {totalConnected}/{totalCore}
            </p>
            <p className="mb-1">
              <span className=" fw-bold">Distance:</span> {length.toFixed(2)}m
            </p>
            <button className="badge mb-1 bg-danger border-0" onClick={deleteHandler}>
              Delete
            </button>
            <p className="mb-1 fw-bold">Core Available: </p>
            <hr className="my-1 w-50" /> {CoreStatus}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintPointToPoint;
