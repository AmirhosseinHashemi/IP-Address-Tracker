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

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);

        // get IP
        const res = await fetch(
          "https://geo.ipify.org/api/v2/country,city?apiKey=at_mrjYHwA8uXINz861UQyU6ym74Xh0X&"
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
  }, []);

  return (
    <div className="wrapper">
      <Header>
        <Input />
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
