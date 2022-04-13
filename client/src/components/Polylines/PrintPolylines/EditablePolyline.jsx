import React, { useEffect, useState } from 'react';
import { Polyline } from '@react-google-maps/api';
import { useCallback } from 'react';
import useMap from '../../../hooks/useMap';
import useEditablePolyline from '../../../hooks/useEditablePolyline';

const EditablePolyline = () => {
  const { setPolyline } = useEditablePolyline();
  const [coordinates, setCoordinates] = useState([]);
  const { map } = useMap();

  useEffect(() => {
    if (map) {
      map.addListener('click', (event) => {
        setCoordinates((prevState) => {
          return [...prevState, event.latLng];
        });
      });
    }
  }, [map]);

  const options = {
    editable: true,
    strokeColor: '#313552',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const onLoadHandler = useCallback((polyline) => {
    setPolyline(polyline);
  }, []);

  const unMountHandler = useCallback(() => {
    setPolyline(null);
  }, []);

  return (
    <>
      <Polyline
        options={options}
        onLoad={onLoadHandler}
        onUnmount={unMountHandler}
        path={coordinates}
      />
    </>
  );
};

export default EditablePolyline;
