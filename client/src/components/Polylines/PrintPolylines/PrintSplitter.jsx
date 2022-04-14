import { InfoWindow, Marker, Polyline } from '@react-google-maps/api';
import React, { useState } from 'react';

import splitterImage from '../../../assets/img/splitter.png';
import useEditablePolyline from '../../../hooks/useEditablePolyline';

import coreColor from '../../../utility/coreColor';

const PrintSplitter = ({ connection }) => {
  const { setParent } = useEditablePolyline();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const [length, setLength] = useState(0);
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
  } = connection;

  const coordinates = location.coordinates.map((item) => {
    return { lng: item[0], lat: item[1] };
  });

  const options = {
    path: coordinates,
    geodesic: true,
    strokeColor: color
      ? coreColor.find((item) => item.colorName === color)?.colorCode
      : '#24A19C',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  const ChildConnection = childrens.map((item) => {
    return (
      <p className='mb-1'>
        {item.color}: {item.connectionType}{' '}
      </p>
    );
  });

  const onLoad = (polyline) => {
    const lengthInMeters = window.google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    setLength(lengthInMeters);
  };
  const icon = {
    url: splitterImage,
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  const onClickHandler = (event) => {
    setParent(connection, event.latLng);
  };

  return (
    <>
      <Polyline
        options={options}
        onMouseOver={({ latLng }) => {
          setPosition(latLng);
          setShowInfoWindow(true);
        }}
        onMouseOut={() => setShowInfoWindow(false)}
        onLoad={onLoad}
      />

      <Marker
        position={{
          lat: coordinates[coordinates.length - 1].lat,
          lng: coordinates[coordinates.length - 1].lng,
        }}
        onClick={onClickHandler}
        icon={icon}
      />

      {showInfoWindow && (
        <InfoWindow position={position}>
          <>
            <p class='mb-1 fw-bold'>{name}</p>
            <hr class='my-1' />
            <p class='mb-1'>
              <span class='fw-bold'>Connected with:</span> {parentType}
            </p>
            <p class='mb-1'>
              <span class='fw-bold'>Splitter Type:</span> {1} is to{' '}
              {splitterLimit}
            </p>
            <p class='mb-1'>
              <span class='fw-bold'>Connection Type:</span> {type}
            </p>

            {portNo ? (
              <p class='mb-1'>
                <span class='fw-bold'>Port No:</span> {portNo}
              </p>
            ) : (
              <></>
            )}
            {color ? (
              <p class='mb-1'>
                <span class='fw-bold'>Connected Core Color:</span> {color}
              </p>
            ) : (
              <></>
            )}
            <p class='mb-1'>
              <span class=' fw-bold'>total Used Core:</span> {splitterUsed}/
              {splitterLimit}
            </p>
            <p class='mb-1'>
              <span class=' fw-bold'>Distance:</span> {Math.ceil(length)}m
            </p>
            <p class='mb-1 fw-bold'>Core Available: </p>
            <button
              class='badge mb-1 bg-danger border-0'
              //   onclick="deleteConnection('${type}', '${_id}')"
            >
              Delete
            </button>
            <hr class='my-1 w-50' />
            {ChildConnection}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintSplitter;
