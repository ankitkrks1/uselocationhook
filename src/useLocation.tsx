import React, { useEffect, useState } from "react";

/**
 * @author Ankit K Kashyap
 * @description This hook captures the location data once the user grants permission
 * and then sends the Google Maps link to the provided `sendUrl`. It also returns
 * the location object.
 *
 * @param sendUrl
 *  The backend link where the data needs to be sent using a POST request.
 *  The data is sent as a JSON object: { gMap: link to Google Maps }.
 *
 * @returns The location object containing { latitude, longitude, accuracy }.
 *
 */

interface Ilocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}
const useLocation = (sendUrl: string):Ilocation|undefined => {
  const [location, setLocation] = useState<Ilocation>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      console.log("inside navigator");
      navigator.geolocation.getCurrentPosition(
        (posi) => {
          if (posi) {
            setLocation({
              latitude: posi.coords.latitude,
              longitude: posi.coords.longitude,
              accuracy: posi.coords.accuracy,
            });
          }
          fetch(sendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gMap: `https://maps.google.com/?q=${posi.coords.latitude},${posi.coords.longitude}`,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((jsonResponse) => {
              console.log("Response from server:", jsonResponse);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    } else {
      console.log("NOT SUPPORTED GEO LOCATION");
    }
    console.log("logged");
  }, []);

  if (location.latitude !== 0 && location.longitude !== 0) {
    return location;
  } else {
    return undefined;
  }
};

export default useLocation;
