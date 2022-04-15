import React, { useState } from 'react';
import { InfoWindow, Marker, Polyline } from '@react-google-maps/api';
import coreColor from '../../../utility/coreColor';
import homeIcon from '../../../assets/img/onu.png';
const PrintHome = ({ connection }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const [length, setLength] = useState(0);
  const { name, color, onuNo, type, locations } = connection;

  const coordinates = locations.coordinates.map((item) => {
    return { lat: item[0], lng: item[1] };
  });

  const options = {
    path: coordinates,
    geodesic: true,
    strokeColor: coreColor.find((item) => item.colorName === color)?.colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  const onLoad = (polyline) => {
    const lengthInMeters = window.google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    setLength(lengthInMeters);
  };

  const icon = {
    url: homeIcon,
    scaledSize: new window.google.maps.Size(35, 25),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
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
        onClick={() => {
          console.log('marker');
        }}
        icon={icon}
      />

      {showInfoWindow && (
        <InfoWindow position={position}>
          <>
            <p className='mb-1 fw-bold'>{name}</p>
            <hr className='my-1' />
            <p className='mb-1'>
              <span className='fw-bold'>Onu No:</span> {onuNo}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'>connection Type:</span> {type}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'>Core Color:</span> {color}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'>Distance:</span> {Math.ceil(length)}m
            </p>
            <button
              className='badge mb-1 bg-danger border-0'
              //   onclick="deleteConnection('${type}', '${_id}')"
            >
              Delete
            </button>
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintHome;
