import { useEffect, useState } from "react";
const useLocation = (sendUrl) => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        accuracy: 0,
    });
    useEffect(() => {
        if (navigator.geolocation) {
            console.log("inside navigator");
            navigator.geolocation.getCurrentPosition((posi) => {
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
            }, (err) => {
                console.log(err);
            }, {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            });
        }
        else {
            console.log("NOT SUPPORTED GEO LOCATION");
        }
        console.log("logged");
    }, []);
    if (location.latitude !== 0 && location.longitude !== 0) {
        return location;
    }
    else {
        return undefined;
    }
};
export default useLocation;
