import React, { useEffect, useState } from 'react';
import { Polyline } from '@react-google-maps/api';
import { useCallback } from 'react';
import useMap from '../../hooks/useMap';
import useEditablePolyline from '../../hooks/useEditablePolyline';

const EditablePolyline = () => {
  const { setPolyline, parentCoordinate } = useEditablePolyline();
  const [coordinates, setCoordinates] = useState([]);
  const { map } = useMap();
  console.log(parentCoordinate);
  useEffect(() => {
    if (map) {
      map.addListener('click', (event) => {
        setCoordinates((prevState) => {
          return [...prevState, event.latLng];
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (parentCoordinate) {
      setCoordinates((prevState) => {
        return [parentCoordinate];
      });
    }
  }, [parentCoordinate]);

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
