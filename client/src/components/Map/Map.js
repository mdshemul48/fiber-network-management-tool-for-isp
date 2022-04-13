import React from 'react';
import { GoogleMap } from '@react-google-maps/api';
import useMap from '../../hooks/useMap';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 23.824374476895283,
  lng: 90.27119894947462,
};

function Map() {
  const { isLoaded, onLoad, onUnmount } = useMap();
  console.log(isLoaded);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
