import React from 'react';
import { Button } from 'react-bootstrap';

import useEditablePolyline from '../../hooks/useEditablePolyline';
import axiosInstance from '../../utility/axios';
import findNearbyPTP from '../../utility/findNearbyPTP';

const NearbyConnection = () => {
  const {
    coordinates: target,
    setCoordinates,
    addVertex,
    reset,
  } = useEditablePolyline();

  const findNearbyPointToPointConnection = async () => {
    if (target.length === 0) {
      return alert('Please click on the map first');
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
        },
      },
    } = response;

    findNearbyPTP(coordinates, target[0], (result) => {
      console.log(result);
      reset();
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
