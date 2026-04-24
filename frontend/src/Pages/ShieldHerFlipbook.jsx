export default function ShieldHerFlipbook() {
  return (
    <div
      style={{
        backgroundColor: "#050E1E",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: "clamp(1.5rem,3vw,2.3rem)",
          fontWeight: 700,
          letterSpacing: "3px",
          color: "#7de8ff",
          textShadow: "0 0 26px rgba(0,207,255,0.28)",
          marginBottom: "40px",
        }}
      >
        HOW TO ACTIVATE SHIELDHER
      </h2>
      <div
        style={{
          width: "70%",
          height: "80vh",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <iframe
          src="https://heyzine.com/flip-book/7ebe2ce2e1.html"
          className="fp-iframe"
          title="Flipbook"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
          allow="clipboard-write"
          allowFullScreen
          scrolling="no"
        />

        {/* White Rectangle Overlay */}

        <div
          style={{
            position: "absolute", // ✅ sits on top of iframe
            top: "18%",
            left: "23%",
            transform: "translate(-50%, -50%)",
            width: "220px",
            height: "80px",
            backgroundColor: "#050E1E",
            borderRadius: "10px",

            zIndex: 1,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            SHIELDHER
          </h1>
        </div>
        <div
          style={{
            position: "absolute", // ✅ sits on top of iframe
            top: "17%",
            right: "13%",
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
            backgroundColor: "#050E1E",
            borderRadius: "10px",

            zIndex: 10,
          }}
        ></div>
      </div>
    </div>
  );
}
