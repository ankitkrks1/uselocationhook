**Author:** Ankit K Kashyap

[![NPM](https://nodei.co/npm/uselocationhook.png)](https://nodei.co/npm/uselocationhook/)

# `uselocationhook` - React Hook for Client Location

`uselocationhook` is a custom React hook designed to fetch the client's location and return the coordinates. Additionally, it can send the location data to a backend server.

## Features

- **Fetch Client Location**: Retrieves the latitude, longitude, and accuracy of the client's location.
- **Send Location Data**: Sends a Google Maps link containing the location coordinates to a specified backend URL.
- **TypeScript Support**: Provides type definitions for seamless integration into TypeScript projects.

## Installation

To install `uselocationhook`, use npm or yarn:

```bash
npm install uselocationhook

or 
yarn add uselocationhook

```

## Usage 
``` bash
import React from "react";
import useLocation from "uselocationhook";
import "./App.css";

const url = "http://localhost:3001/location";

const App: React.FC = () => {
  const location = useLocation(url);

  return (
    <div className="App">
      {location ? (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Accuracy: {location.accuracy} meters</p>
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default App;


```

## API
useLocation(sendUrl: string)
Parameters:

sendUrl (string): The backend URL where the location data will be sent via a POST request. The data sent will include a Google Maps link to the location.
Returns:

An object containing { latitude, longitude, accuracy } or undefined if the location is not yet available.

Buy me a Dosha :

[![Open Collective](https://img.shields.io/opencollective/all/sharemydisk?logo=open-collective)](https://opencollective.com/sharemydisk)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/ankitkrks1?label=GitHub%20Sponsors&logo=github)](https://github.com/sponsors/ankitkrks1)