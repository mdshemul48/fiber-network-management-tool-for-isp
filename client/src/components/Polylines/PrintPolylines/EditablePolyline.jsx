import React, { useState } from 'react';
import { Polyline } from '@react-google-maps/api';
const EditablePolyline = () => {
  const options = {
    path: [
      {
        lat: 23.911264098683475,
        lng: 90.24986370343332,
      },
      {
        lat: 23.911260000000002,
        lng: 90.24984,
      },
      {
        lat: 23.911220000000004,
        lng: 90.24985000000001,
      },
      {
        lat: 23.911187164057004,
        lng: 90.24984416931153,
      },
      {
        lat: 23.91119452008073,
        lng: 90.24931145767212,
      },
      {
        lat: 23.911450000000002,
        lng: 90.24912,
      },
      {
        lat: 23.911471876037403,
        lng: 90.24911341104506,
      },
      {
        lat: 23.9115316746007,
        lng: 90.24908577014693,
      },
    ],
    geodesic: true,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  return (
    <>
      <Polyline options={options} />
    </>
  );
};

export default EditablePolyline;
