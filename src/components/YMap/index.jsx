import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const { REACT_APP_GoogleApiKey: key } = process.env;
export const Karta = ({ setData, data }) => {
  const location = useLocation();
  const [Mposition, setPosition] = useState({ lat: 41.311081, lng: 69.240562 });
  const { isLoaded } = useJsApiLoader({
    id: location === 'profile/add' ? 'addItem' : 'editItem',
    googleMapsApiKey: key,
    region: 'Uzbekistan',
  });
  const containerStyle = {
    width: '100%',
    height: '600px',
  };
  const center = {
    lat: 41.311083854164,
    lng: 69.24062134387444,
  };
  // eslint-disable-next-line
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    // eslint-disable-next-line
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log(data.locations, 'data');
  return (
    isLoaded && (
      <GoogleMap
        center={center}
        zoom={1000}
        onClick={(e) => {
          setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });

          setData({
            ...data,
            locations: {
              ...data.locations,
              latitude: e.latLng.lat(),
              longitude: e.latLng.lng(),
            },
          });
        }}
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          onDragEnd={(e) => {
            setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            setData({
              ...data,
              locations: {
                ...data.locations,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng(),
              },
            });
          }}
          draggable={true}
          position={Mposition}
        />
      </GoogleMap>
    )
  );
};

export default Karta;
