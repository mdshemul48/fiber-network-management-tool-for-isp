import { InfoWindow, Marker, Polyline } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import tjIcon from "../../../assets/img/tj.png";
import useEditablePolyline from "../../../hooks/useEditablePolyline";
import usePolylines from "../../../hooks/usePolylines";
import axiosInstance from "../../../utility/axios";

const PrintLocalFiber = ({ connection }) => {
  const [coordinates, setCoordinates] = useState([]);
  const { setFetch } = usePolylines();
  const { setParent } = useEditablePolyline();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const { _id, name, locations, type, totalCore, totalConnected, markers, childrens, mainLocalFiber, length } =
    connection;

  useEffect(() => {
    if (locations?.coordinates) {
      const coordinates = locations.coordinates.map((item) => ({ lat: item[0], lng: item[1] }));
      setCoordinates(coordinates);
    }
  }, [locations.coordinates]);

  const options = {
    geodesic: true,
    strokeColor: "#142F43",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  const localFiberChildrens = (mainLocalFiber?.childrens || childrens).map((item) => {
    return item.connectionType === "splitter" ? (
      <p className="mb-1" key={item._id}>
        {item.color}: used{" "}
      </p>
    ) : (
      <></>
    );
  });

  const onClickHandler = (event) => {
    setParent(connection, event.latLng);
  };

  const deleteHandler = () => {
    toast.promise(axiosInstance.delete(`/local-fiber-connection?id=${_id}`), {
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
        const { coordinates } = marker;

        const icon = {
          url: tjIcon,
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        };
        return (
          <Marker
            key={marker._id}
            position={{ lat: coordinates[1], lng: coordinates[0] }}
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
              {mainLocalFiber?.totalConnected || totalConnected}/{mainLocalFiber?.totalCore || totalCore}
            </p>
            <p className="mb-1">
              <span className=" fw-bold">Distance:</span> {length.toFixed(2)}m
            </p>
            <button className="badge mb-1 bg-danger border-0" onClick={deleteHandler}>
              Delete
            </button>
            <p className="mb-1 fw-bold">Core Available: </p>
            <hr className="my-1 w-50" />
            {localFiberChildrens}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintLocalFiber;
