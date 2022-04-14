import React, { useEffect } from 'react';
import { Polyline } from '@react-google-maps/api';
import { useCallback } from 'react';
import useMap from '../../hooks/useMap';
import useEditablePolyline from '../../hooks/useEditablePolyline';

const EditablePolyline = () => {
  const { setPolyline, parentCoordinate, coordinates, setCoordinates } =
    useEditablePolyline();

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

  useEffect(() => {
    if (parentCoordinate) {
      setCoordinates((prevState) => {
        return [parentCoordinate];
      });
    }
  }, [parentCoordinate, setCoordinates]);

  const options = {
    editable: true,
    strokeColor: '#313552',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const onLoadHandler = useCallback((polyline) => {
    polyline.addListener('contextmenu', (event) => {
      if (event.vertex !== undefined) {
        const path = polyline.getPath();
        path.removeAt(event.vertex);
        setCoordinates([...path.getArray()]);
      }
    });
    setPolyline(polyline);
  }, []);

  const unMountHandler = useCallback(() => {
    setPolyline(null);
  }, []);

  return (
    <>
      <button className='btn btn-dark add-button'>Add Connection</button>
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
