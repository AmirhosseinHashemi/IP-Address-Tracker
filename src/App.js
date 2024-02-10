import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

function App() {
  const [access, setAccess] = useState(false);
  const [coords, setCoords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAccess(true);
        setCoords([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
        console.error("Loacation not found");
      }
    );
  }, []);

  return (
    <div className="wrapper">
      <Header />
      {isLoading && <p className="loader">Map Is Loading ...</p>}
      {access && (
        <MapContainer id="map" center={coords} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords}>
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
