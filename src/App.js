import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

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

function Header({ children }) {
  return (
    <header>
      <h1>IP Address Tracker</h1>
      {children}
    </header>
  );
}

function Input() {
  return (
    <form>
      <input
        type="text"
        placeholder="search for any IP address or domain"
      ></input>

      <button aria-label="OK">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
          <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}

function Result({ ipInfo }) {
  const {
    ip,
    isp,
    location: { country, city, timezone },
  } = ipInfo;

  return (
    <div className="result">
      <p className="result__data">
        <span className="result__title">IP ADDRESS</span>
        {ip}
      </p>

      <p className="result__data">
        <span className="result__title">LOCATION</span>
        {`${city}, ${country}`}
      </p>

      <p className="result__data">
        <span className="result__title">TIMEZONE</span>
        UTC{timezone}
      </p>

      <p className="result__data">
        <span className="result__title">ISP</span>
        {isp}
      </p>
    </div>
  );
}

export default App;
