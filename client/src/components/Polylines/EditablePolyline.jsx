import React, { useEffect, useRef } from 'react';
import { Polyline } from '@react-google-maps/api';
import { useCallback } from 'react';
import useMap from '../../hooks/useMap';
import useEditablePolyline from '../../hooks/useEditablePolyline';

const EditablePolyline = () => {
  const listenersRef = useRef([]);

  const { parentCoordinate, coordinates, setCoordinates, polylineRef } =
    useEditablePolyline();

  const { map } = useMap();

  useEffect(() => {
    if (parentCoordinate) {
      setCoordinates(() => {
        return [parentCoordinate.toJSON()];
      });
    }
  }, [parentCoordinate, setCoordinates]);

  const options = {
    editable: true,
    strokeColor: '#313552',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const onEdit = useCallback(
    (event) => {
      console.log(event);
      if (polylineRef) {
        const nextPath = polylineRef.current
          .getPath()
          .getArray()
          .map((latLng) => latLng.toJSON());
        setCoordinates(nextPath);
      }
    },
    [setCoordinates, polylineRef]
  );

  const onLoadHandler = useCallback(
    (polyline) => {
      polylineRef.current = polyline;

      const path = polyline.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', (event) => {
          console.log(event, '101');
        })
      );
      polyline.addListener('rightclick', (event) => {
        if (event.vertex !== undefined) {
          const path = polylineRef.current.getPath();
          path.removeAt(event.vertex);
          onEdit(event);
        }
      });
    },
    [onEdit, polylineRef]
  );

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = null;
  }, [polylineRef]);

  return (
    <>
      <Polyline
        draggable
        editable
        options={options}
        onLoad={onLoadHandler}
        onUnmount={onUnmount}
        onMouseUp={onEdit}
        path={coordinates}
      />
    </>
  );
};

export default EditablePolyline;
