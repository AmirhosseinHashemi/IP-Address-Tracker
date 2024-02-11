import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

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
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
        setAccess(true);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header />
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
          <Marker position={[ipInfo.location.lat, ipInfo.location.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>IP Address Tracker</h1>
      <Input />
      <Result />
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

function Result() {
  return (
    <div className="result">
      <p className="result__data">
        <span className="result__title">IP ADDRESS</span>
        192.212.174.101
      </p>

      <p className="result__data">
        <span className="result__title">LOCATION</span>
        Brooklyn, NY 10001
      </p>

      <p className="result__data">
        <span className="result__title">TIMEZONE</span>
        UTC-05:00
      </p>

      <p className="result__data">
        <span className="result__title">ISP</span>
        SpaceX Starlink
      </p>
    </div>
  );
}

export default App;
