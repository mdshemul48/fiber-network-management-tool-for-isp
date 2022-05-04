import { InfoWindow, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import splitterImage from "../../../assets/img/splitter.png";
import useEditablePolyline from "../../../hooks/useEditablePolyline";
import usePolylines from "../../../hooks/usePolylines";
import axiosInstance from "../../../utility/axios";
import coreColor from "../../../utility/coreColor";

const PrintSplitter = ({ connection }) => {
  const [coordinates, setCoordinates] = useState([]);
  const { setFetch } = usePolylines();

  const { setParent } = useEditablePolyline();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const {
    _id,
    name,
    parentType,
    color,
    location,
    splitterLimit,
    splitterUsed,
    portNo,
    type,
    childrens,
    totalCore,
    length,
  } = connection;

  useEffect(() => {
    if (location?.coordinates) {
      const coordinates = location.coordinates.map((item) => {
        return { lng: item[0], lat: item[1] };
      });
      setCoordinates(coordinates);
    }
  }, [location.coordinates]);

  const options = {
    geodesic: true,
    strokeColor: color ? coreColor.find((item) => item.colorName === color)?.colorCode : "#24A19C",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  const ChildConnection = childrens.map((item) => {
    return (
      <p className="mb-1">
        {item.color}: {item.connectionType}{" "}
      </p>
    );
  });

  const icon = {
    url: splitterImage,
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  const onClickHandler = (event) => {
    setParent(connection, event.latLng);
  };

  const deleteHandler = () => {
    toast.promise(axiosInstance.delete(`/splitter-connection?id=${_id}`), {
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
      />

      <Marker
        position={
          coordinates[coordinates.length - 1] &&
          new window.google.maps.LatLng({
            lat: coordinates[coordinates.length - 1]?.lat,
            lng: coordinates[coordinates.length - 1]?.lng,
          })
        }
        onClick={onClickHandler}
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
              <span className="fw-bold">Connected with:</span> {parentType}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Splitter Type:</span> {1} is to {splitterLimit}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Connection Type:</span> {type}
            </p>

            {portNo ? (
              <p className="mb-1">
                <span className="fw-bold">Port No:</span> {portNo}
              </p>
            ) : (
              <></>
            )}
            {color ? (
              <p className="mb-1">
                <span className="fw-bold">Connected Core Color:</span> {color}
              </p>
            ) : (
              <></>
            )}
            <p className="mb-1">
              <span className=" fw-bold">total Used Core:</span> {splitterUsed}/{splitterLimit}
            </p>
            <p className="mb-1">
              <span className=" fw-bold">Distance:</span> {length.toFixed(2)}m
            </p>
            <p className="mb-1">
              <span className=" fw-bold">Total Core:</span> {totalCore}
            </p>
            <button className="badge mb-1 bg-danger border-0" onClick={deleteHandler}>
              Delete
            </button>
            <p className="mb-1 fw-bold">Core Available: </p>
            <hr className="my-1 w-50" />
            {ChildConnection}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintSplitter;
