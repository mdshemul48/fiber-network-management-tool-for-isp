import React from 'react';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

import useEditablePolyline from '../../hooks/useEditablePolyline';
import usePolylines from '../../hooks/usePolylines';
import axiosInstance from '../../utility/axios';
import findNearbyPTP from '../../utility/findNearbyPTP';

const NearbyConnection = () => {
  const {
    coordinates: target,
    addVertex,
    setParent,
    reset,
  } = useEditablePolyline();
  const { polylines } = usePolylines();

  const findNearbyPointToPointConnection = async () => {
    if (target.length === 0) {
      return toast.error(
        "Can't find nearby point to point connection without target"
      );
    }

    if (target.length > 1) {
      return toast.error(
        "Can't find nearby point to point connection with more than one target"
      );
    }

    const response = await axiosInstance.get(
      '/ptp-connection?coordinates=' +
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

  return (
    <>
      <Button
        className='nearbyPTP'
        variant='dark'
        onClick={findNearbyPointToPointConnection}
      >
        Find Nearby PTP
      </Button>
    </>
  );
};

export default NearbyConnection;
