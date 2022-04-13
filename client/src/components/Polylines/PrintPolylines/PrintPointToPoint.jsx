import React, { useState } from 'react';
import { Polyline, Marker, InfoWindow } from '@react-google-maps/api';
import coreColor from '../../../utility/coreColor';

const PrintPointToPoint = ({ connection }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const [length, setLength] = useState(0);

  const {
    name,
    location,
    totalCore,
    totalConnected,
    type,
    childrens,
    _id,
    markers,
  } = connection;

  const options = {
    path: location.coordinates.map((item) => {
      return { lng: item[0], lat: item[1] };
    }),
    geodesic: true,
    strokeColor: '#142F43',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };
  const colorCores = coreColor.slice(0, totalCore);

  const CoreStatus = colorCores.map((item) => {
    const targetColor = childrens.find(
      (child) => child.color === item.colorName
    );
    if (targetColor) {
      return (
        <p className='mb-1'>
          {item.colorName} : used (Port: {targetColor.portNo})
        </p>
      );
    } else {
      return <p className='mb-1'>{item.colorName} : available</p>;
    }
  });

  const onLoad = (polyline) => {
    const lengthInMeters = window.google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    setLength(lengthInMeters);
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

      {markers.map((marker) => {
        const {
          location: { coordinates },
        } = marker;
        return (
          <Marker
            key={marker._id}
            position={{ lat: coordinates[0], lng: coordinates[1] }}
            onClick={() => {
              console.log(marker);
            }}
          />
        );
      })}

      {showInfoWindow && (
        <InfoWindow position={position}>
          <>
            <p className='mb-1 fw-bold'>{name}</p>
            <hr className='my-1' />
            <p className='mb-1'>
              <span className='fw-bold'>Connection Type:</span> {type}
            </p>
            <p className='mb-1'>
              <span className=' fw-bold'>total Used Core:</span>
              {totalConnected}/{totalCore}
            </p>
            <p className='mb-1'>
              <span className=' fw-bold'>Distance:</span> {Math.ceil(length)}m
            </p>
            <button
              className='badge mb-1 bg-danger border-0'
              //   onclick="deleteConnection('${type}', '${_id}')"
            >
              Delete
            </button>
            <p className='mb-1 fw-bold'>Core Available: </p>
            <hr className='my-1 w-50' /> {CoreStatus}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintPointToPoint;
