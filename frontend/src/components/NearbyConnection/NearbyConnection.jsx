import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

import useEditablePolyline from "../../hooks/useEditablePolyline";
import usePolylines from "../../hooks/usePolylines";
import axiosInstance from "../../utility/axios";

import findNearbyPTP from "../../utility/findNearbyPTP";
import findNearbySplitter from "../../utility/findNearbySplitter";

const NearbyConnection = () => {
  const { coordinates: target, addVertex, setParent, reset } = useEditablePolyline();
  const { polylines } = usePolylines();

  const findNearbyPointToPointConnection = async () => {
    if (target.length === 0) {
      return toast.error("Can't find nearby point to point connection without target");
    }

    if (target.length > 1) {
      return toast.error("Can't find nearby point to point connection with more than one target");
    }

    const response = await axiosInstance.get(
      "/ptp-connection?coordinates=" +
        JSON.stringify({
          lat: target[0].lat,
          lng: target[0].lng,
        })
    );
    const {
      data: {
        data: {
          location: { coordinates },
          _id,
        },
      },
    } = response;

    findNearbyPTP(coordinates, target[0], (result) => {
      const parentPolyline = polylines.find((item) => item._id === _id);
      reset();
      setParent(parentPolyline);
      for (let i = 0; i < result.length; i++) {
        setTimeout(
          function (latLng) {
            addVertex({ latLng });
          },
          200 * i,
          result[i]
        );
      }
    });
  };

  const findNearbySplitterConnection = async () => {
    if (target.length === 0) {
      return toast.error("Can't find nearby splitter connection without target");
    }

    if (target.length > 1) {
      return toast.error("Can't find nearby splitter connection with more than one target");
    }

    const response = await axiosInstance.get(
      "/splitter-connection?coordinates=" +
        JSON.stringify({
          lat: target[0].lat,
          lng: target[0].lng,
        })
    );
    const {
      data: {
        data: {
          lastPoint: { coordinates },
          _id,
        },
      },
    } = response;

    findNearbySplitter(
      new window.google.maps.LatLng(coordinates[1], coordinates[0]),
      new window.google.maps.LatLng(target[0]),
      (result) => {
        const parentPolyline = polylines.find((item) => item._id === _id);
        reset();
        setParent(parentPolyline);
        for (let i = 0; i < result.length; i++) {
          setTimeout(
            function (latLng) {
              addVertex({ latLng });
            },
            200 * i,
            result[i]
          );
        }
      }
    );
  };

  return (
    <>
      <Button className="nearbyPTP" variant="dark" onClick={findNearbyPointToPointConnection}>
        Find Nearby PTP
      </Button>
      <Button className="nearbySplitter" variant="dark" onClick={findNearbySplitterConnection}>
        Find Nearby Splitter
      </Button>
    </>
  );
};

export default NearbyConnection;
