import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

import Header from "./Header";
import Input from "./Input";
import Result from "./Result";

const Icon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [50, 65],
});

function App() {
  const [access, setAccess] = useState(false);
  const [ipInfo, setIpInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [request, setRequest] = useState("");

  function handleInputValue(value) {
    setInputValue(value);
  }

  function handleFetchingData(ev) {
    ev.preventDefault();

    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (domainRegex.test(inputValue)) {
      setRequest(`domain=${inputValue}`);
    }

    if (ipv4Regex.test(inputValue)) {
      setRequest(`ipAddress=${inputValue}`);
    }
  }

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);

          // get IP
          const res = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_mrjYHwA8uXINz861UQyU6ym74Xh0X&${request}`
          );
          if (!res.ok) throw new Error("Something went wrong :(");
          const data = await res.json();

          setIpInfo(data);
          setAccess(true);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [request]
  );

  return (
    <div className="wrapper">
      <Header>
        <Input
          inputValue={inputValue}
          onInputValue={handleInputValue}
          onFetchingData={handleFetchingData}
        />
        {ipInfo.ip && <Result ipInfo={ipInfo} />}
      </Header>

      {isLoading && <p className="loader">Map Is Loading ...</p>}

      {access && (
        <MapContainer
          id="map"
          center={[ipInfo.location.lat, ipInfo.location.lng]}
          zoom={12}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[ipInfo.location.lat, ipInfo.location.lng]}
            icon={Icon}
          ></Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default App;
