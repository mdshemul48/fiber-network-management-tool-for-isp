import React, { useRef } from "react";
import { Polyline } from "@react-google-maps/api";
import { useCallback } from "react";
import useEditablePolyline from "../../hooks/useEditablePolyline";
import useMap from "../../hooks/useMap";

const EditablePolyline = () => {
  const { map } = useMap();
  const listenersRef = useRef([]);
  const { coordinates, setCoordinates, polylineRef } = useEditablePolyline();

  const options = {
    editable: true,
    strokeColor: "#313552",
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const onEdit = useCallback(() => {
    if (polylineRef) {
      const nextPath = polylineRef.current
        .getPath()
        .getArray()
        .map((latLng) => latLng.toJSON());
      setCoordinates(nextPath);
    }
  }, [setCoordinates, polylineRef]);

  const onLoadHandler = useCallback(
    (polyline) => {
      polylineRef.current = polyline;

      const path = polyline.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit, polylineRef]
  );

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = null;
  }, [polylineRef]);

  const deleteVertexHandler = useCallback(
    (event) => {
      if (event.vertex !== undefined) {
        const path = polylineRef.current.getPath();
        path.removeAt(event.vertex);
        onEdit();
      }
    },
    [onEdit, polylineRef]
  );

  return (
    map?.renderingType === "RASTER" && (
      <Polyline
        draggable
        editable
        options={options}
        onLoad={onLoadHandler}
        onUnmount={onUnmount}
        onMouseUp={onEdit}
        path={coordinates}
        onRightClick={deleteVertexHandler}
      />
    )
  );
};

export default EditablePolyline;
