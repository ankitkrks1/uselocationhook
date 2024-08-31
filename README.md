**Author:** Ankit K Kashyap

[![NPM](https://nodei.co/npm/uselocationhook.png)](https://nodei.co/npm/uselocationhook/)

# What is this all about?

This is a react hook for fetching the client's location and then gives the coordinates
It also has capability to send to backend server . 

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


# Examples :- 
import useLocation from "uselocationhook";

import "./App.css";
const url = "http://localhost:3001/location";
function App() {
  const location = useLocation(url);
  return (
    <div className="App">
      {location && (
        <>
          <p>Lattitude : {location.latitude} </p>{" "}
          <p>Longitude : {location.longitude}</p>
        </>
      )}
    </div>
  );
}

export default App;



Buy me a Dosha :

[![Open Collective](https://img.shields.io/opencollective/all/sharemydisk?logo=open-collective)](https://opencollective.com/sharemydisk)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/ankitkrks1?label=GitHub%20Sponsors&logo=github)](https://github.com/sponsors/ankitkrks1)