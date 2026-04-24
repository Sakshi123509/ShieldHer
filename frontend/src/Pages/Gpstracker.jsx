import { useState } from "react";

export default function Gpstracker() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        alert(err.message);
        setLoading(false);
      }
    );
  };

  return (
   
    <div
      style={{
        height: "100vh",
        background: "#040d1c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
    <h1
    style={{
        fontSize : "40px",
        padding : "20px"
    }}

    >GPS LOCATION</h1>
      {/* 🔥 Show button ONLY when no location */}
      {!location && (
        <button
          onClick={startTracking}
          style={{
            padding: "14px 30px",
            fontSize: "14px",
            background: "transparent",
            border: "1px solid #00cfff",
            color: "#00cfff",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "'Orbitron', monospace",
          }}
        >
          {loading ? "Getting Location..." : "Start Tracking"}
        </button>
      )}

      {/* 🔥 Show map ONLY after location */}
      {location && (
        <iframe
          title="map"
          width="80%"
          height="80%"
          style={{
            border: "none",
            borderRadius: "10px",
          }}
          src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
        />
      )}
    </div>
  );
}