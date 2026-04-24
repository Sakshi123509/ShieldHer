// import { useState } from "react";

// export default function Gpstracker() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const startTracking = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setLocation({
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         });
//         setLoading(false);
//       },
//       (err) => {
//         alert(err.message);
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div
//       style={{
//         height: "100vh",
//         background: "#040d1c",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {/* 🔲 DYNAMIC BOX */}
//       <div
//         style={{
//           width: location ? "80%" : "400px",   // ✅ expands after click
//           height: location ? "80vh" : "250px", // ✅ expands after click
//           transition: "all 0.4s ease",         // 🔥 smooth animation
//           border: "1px solid #00cfff",
//           borderRadius: "10px",
//           overflow: "hidden",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {/* 🔘 BUTTON VIEW */}
//         {!location && (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "20px",
//             }}
//           >
//             <h1 style={{ color: "#fff", fontSize: "22px" }}>
//               GPS LOCATION
//             </h1>

//             <button
//               onClick={startTracking}
//               style={{
//                 padding: "12px 24px",
//                 background: "transparent",
//                 border: "1px solid #00cfff",
//                 color: "#00cfff",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               {loading ? "Getting Location..." : "Start Tracking"}
//             </button>
//           </div>
//         )}

//         {/* 🗺️ MAP VIEW */}
//         {location && (
//           <iframe
//             title="map"
//             width="100%"
//             height="100%"
//             style={{ border: "none" }}
//             src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

export default function VoiceGPS() {
  const [location, setLocation] = useState(null);
  const [listening, setListening] = useState(false);

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

      if (text.includes("help")) {
        getLocation();
      }
    };

    recognition.start();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => alert(err.message)
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
    }}
  >
    <div
      style={{
        width : "100vw" , 
        height: "90vh",
        // background: "#040d1c",

         background: `
      linear-gradient(rgba(4, 13, 28, 0.43), rgba(4, 13, 28, 0.51)),
      url("https://i.pinimg.com/1200x/32/62/95/3262954384b2d2e2d9da54bbabad6fdf.jpg")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* 🔥 Heading */}
      <h1
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "36px",
          color: "#00cfff",
          letterSpacing: "3px",
          textShadow: "0 0 20px rgba(0,207,255,0.5)",
          margin: 0,
        }}
      >
        VOICE ACTIVATION
      </h1>

      {/* 💡 Instruction */}
      <p
        style={{
          color: "#aaa",
          fontSize: "18px",
          maxWidth: "400px",
          lineHeight: "1.6",
          fontWeight:"500"
        }}
      >
        Say <span style={{ color: "#00cfff" }}>“HELP”</span> to automatically
        detect and display your current location on the map.
      </p>

      {/* 🎤 Button */}
      <button
        onClick={startVoice}
        style={{
          padding: "14px 36px",
          background: listening
            ? "rgba(0,255,150,0.1)"
            : "linear-gradient(90deg, rgba(0,100,200,0.4), rgba(0,207,255,0.3))",
          border: "1px solid rgba(0,207,255,0.6)",
          borderRadius: "8px",
          color: "#7de8ff",
          fontSize: "13px",
          letterSpacing: "2px",
          fontFamily: "'Orbitron', monospace",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: listening
            ? "0 0 25px rgba(0,255,150,0.3)"
            : "0 0 25px rgba(0,207,255,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {listening ? "LISTENING..." : "ENABLE VOICE"}
      </button>

      {/* 🗺️ Map */}
      {location && (
        <iframe
          title="map"
          width="70%"
          height="70%"
          style={{
            border: "none",
            borderRadius: "10px",
            marginTop: "20px",
          }}
          src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
        />
      )}
    </div>
    </div>
  );
}