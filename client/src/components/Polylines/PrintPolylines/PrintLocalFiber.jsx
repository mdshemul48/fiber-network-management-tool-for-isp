import { InfoWindow, Marker, Polyline } from '@react-google-maps/api';
import React, { useState } from 'react';

import tjIcon from '../../../assets/img/tj.png';

const PrintLocalFiber = ({ connection }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const [length, setLength] = useState(0);
  const {
    _id,
    name,
    locations,
    type,
    totalCore,
    totalConnected,
    markers,
    childrens,
    mainLocalFiber,
  } = connection;

  const coordinates = locations.coordinates.map((item) => {
    return { lat: item[0], lng: item[1] };
  });

  const options = {
    path: coordinates,
    geodesic: true,
    strokeColor: '#142F43',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  const onLoad = (polyline) => {
    const lengthInMeters = window.google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    setLength(lengthInMeters);
  };

  const localFiberChildrens = (mainLocalFiber?.childrens || childrens).map(
    (item) => {
      return item.connectionType === 'splitter' ? (
        <p className='mb-1' key={item._id}>
          {item.color}: used{' '}
        </p>
      ) : (
        <></>
      );
    }
  );

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
        const { coordinates } = marker;

        const icon = {
          url: tjIcon,
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        };
        return (
          <Marker
            key={marker._id}
            position={{ lat: coordinates[1], lng: coordinates[0] }}
            onClick={() => {
              console.log(marker);
            }}
            icon={icon}
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
              {mainLocalFiber?.totalConnected || totalConnected}/
              {mainLocalFiber?.totalCore || totalCore}
            </p>
            <p className='mb-1'>
              <span className=' fw-bold'>Distance:</span> {Math.ceil(length)}m
            </p>
            <button
              className='badge mb-1 bg-danger border-0'
              //   onclick="deleteConnection('${type}', '${_id}', '${
              //   location._id
              // }')"
            >
              Delete
            </button>
            <p className='mb-1 fw-bold'>Core Available: </p>
            <hr className='my-1 w-50' />
            {localFiberChildrens}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintLocalFiber;
