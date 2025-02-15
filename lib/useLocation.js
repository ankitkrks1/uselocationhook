var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
                    console.log("Response from server:", "ok");
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
            console.log("using ip");
            const fetchGeoLocation = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    // Step 1: Get the user's IP address
                    const ipResponse = yield fetch("https://api64.ipify.org?format=json");
                    if (!ipResponse.ok) {
                        throw new Error(`IP Fetch Error: ${ipResponse.status}`);
                    }
                    const ipData = yield ipResponse.json();
                    // Step 2: Get Geolocation details using IP address
                    const geoResponse = yield fetch(`https://ipapi.co/${ipData.ip}/json/`);
                    if (!geoResponse.ok) {
                        throw new Error(`Geo Fetch Error: ${geoResponse.status}`);
                    }
                    const geoData = yield geoResponse.json();
                    console.log("🚀 ~ fetchGeoLocation ~ geoData:", geoData, `https://maps.google.com/?q=${geoData.latitude},${geoData.longitude}`);
                    fetch(sendUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            gMap: `https://maps.google.com/?q=${geoData.latitude},${geoData.longitude}`,
                        }),
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
                }
                catch (err) {
                    console.error(err);
                }
            });
            fetchGeoLocation();
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
