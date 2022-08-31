import React from 'react'
import { useGoogleMaps } from "react-hook-google-maps";

function Locker({ lat, lng }) {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyD1cmCkjEPXyHkBySmvNVBEWXwr0To1PBU",
    {
      zoom: 4,
      center: { lat, lng },
    },
  );
  console.log("render MapWithMarkers");

  if (map) {
    // execute when map object is ready
    new google.maps.Marker({ position: { lat, lng }, map });
  }

  return (
    <div>

      <div ref={ref} style={{ width: 400, height: 300 }} />
    </div>
  );
}

export default Locker