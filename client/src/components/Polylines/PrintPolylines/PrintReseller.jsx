import { InfoWindow, Marker, Polyline } from '@react-google-maps/api';
import React, { useState } from 'react';
import coreColor from '../../../utility/coreColor';

import resellerIcon from '../../../assets/img/olt.png';
import useEditablePolyline from '../../../hooks/useEditablePolyline';

const PrintReseller = ({ connection }) => {
  const { setParent } = useEditablePolyline();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [position, setPosition] = useState(null);
  const [length, setLength] = useState(0);

  const {
    _id,
    parent,
    name,
    type,
    portNo,
    oltType,
    oltSerialNumber,
    color,
    connectionLimit,
    location,
    childrens,
    connectionUsed,
  } = connection;
  const coordinates = location.coordinates.map((item) => {
    return { lat: item[0], lng: item[1] };
  });
  const options = {
    path: coordinates,
    geodesic: true,
    strokeColor: coreColor.find((item) => item.colorName === color).colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  const childConnection = childrens.map((child, index) => {
    if (child.connectionType === 'splitter') {
      return (
        <p className='mb-1' key={index}>
          Port: {child.portNo}: {child.connectionUsed}/{connectionLimit}
        </p>
      );
    }
    return <></>;
  });

  const onLoad = (polyline) => {
    const lengthInMeters = window.google.maps.geometry.spherical.computeLength(
      polyline.getPath()
    );
    setLength(lengthInMeters);
  };

  const icon = {
    url: resellerIcon,
    scaledSize: new window.google.maps.Size(35, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  const onClickHandler = () => {
    setParent(connection);
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
            <p className='mb-1 fw-bold'>{name}</p>
            <hr className='my-1' />
            <p className='mb-1'>
              <span className='fw-bold'>Connection Type:</span> {type}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'>Core Color:</span> {color}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'>Port No:</span> {portNo}
            </p>
            <p className='mb-1'>
              <span className=' fw-bold'>Distance:</span> {Math.ceil(length)}m
            </p>
            <p className='mb-1'>
              <span className='fw-bold'> Olt Type:</span> {oltType}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'> total Connection Used:</span>
              {connectionUsed}
            </p>
            <p className='mb-1'>
              <span className='fw-bold'> oltSwitchNumber:</span>
              {oltSerialNumber}
            </p>
            <button
              className='badge mb-1 bg-danger border-0'
              //   onclick="deleteConnection('${type}', '${_id}')"
            >
              Delete
            </button>
            <p className='mb-1 fw-bold'>Port Used: </p>
            <hr className='my-1 w-50' />
            {childConnection}
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default PrintReseller;
