import React, { useEffect, useState } from "react";

/**
 * @author Ankit K Kashyap
 * @description This hook captures the location data once the user grants permission
 * and then sends the Google Maps link to the provided `sendUrl`. It also returns
 * the location object.
 * If the user denies permission, it will use the IP address to get the location.
 *
 * @param sendUrl
 *  The backend link where the data needs to be sent using a POST request.
 *  The data is sent as a JSON object: { gMap: link to Google Maps with stringified geoData }.
 *
 * @returns The location object containing { latitude, longitude, accuracy }.
 */

interface Ilocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const useLocation = (sendUrl: string): Ilocation | undefined => {
  const [location, setLocation] = useState<Ilocation>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  });

  // Function to fetch geolocation using IP address
  const fetchGeoLocation = async () => {
    try {
      // Step 1: Get the user's IP address
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      if (!ipResponse.ok) {
        throw new Error(`IP Fetch Error: ${ipResponse.status}`);
      }
      const ipData: { ip: string } = await ipResponse.json();

      // Step 2: Get Geolocation details using IP address
      const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
      if (!geoResponse.ok) {
        throw new Error(`Geo Fetch Error: ${geoResponse.status}`);
      }
      const geoData = await geoResponse.json();
      // console.log(
      //   "🚀 ~ fetchGeoLocation ~ geoData:",
      //   geoData,
      //   `https://maps.google.com/?q=${geoData.latitude},${geoData.longitude}`
      // );

      // Combine stringified geoData with Google Maps link
      const gMapString = `Location: https://maps.google.com/?q=${geoData.latitude},${geoData.longitude},${JSON.stringify(
        geoData
      )}`;

      console.log("🚀 ~ fetchGeoLocation ~ gMapString:", gMapString)

      // Send combined data to the backend
      fetch(sendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gMap: gMapString }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((jsonResponse) => {
          console.log("Response from server:", "ok");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      console.error(err);
    }
  };

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
          // Combine stringified geoData with Google Maps link
          const gMapString = `${JSON.stringify(
            {
              latitude: posi.coords.latitude,
              longitude: posi.coords.longitude,
              accuracy: posi.coords.accuracy,
            }
          )}, Location: https://maps.google.com/?q=${posi.coords.latitude},${posi.coords.longitude}`;

          // Send combined data to the backend
          fetch(sendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gMap: gMapString }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((jsonResponse) => {
              console.log("Response from server:", "ok");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (err) => {
          // Check if the error is due to permission denial
          if (err.code === err.PERMISSION_DENIED) {
            console.log("Permission denied by user. Using IP for geolocation.");
            fetchGeoLocation();
          } else {
            console.error("Geolocation error:", err);
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );
    } else {
      console.log("GEO LOCATION NOT SUPPORTED");
    }
  }, [sendUrl]);

  if (location.latitude !== 0 && location.longitude !== 0) {
    return location;
  } else {
    return undefined;
  }
};

export default useLocation;
