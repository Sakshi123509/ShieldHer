export default function ShieldHerFlipbook() {
  return (
    <div
      style={{
        backgroundColor: "#040d1c",

    //        background: `
    //   linear-gradient(rgba(4, 13, 28, 0.43), rgba(4, 13, 28, 0.51)),
    //   url("https://i.pinimg.com/1200x/ab/b3/17/abb317402dce8c2162c60f4bed57ed63.jpg")
    // `,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Heading */}
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
       INSTRUCTION MANUAL
      </h2>

      {/* Flipbook Container */}
      <div
        style={{
          width: "70%",
          height: "80vh",
          overflow: "hidden",
          position: "relative", // ✅ important for overlays
          zIndex: 1,
        }}
      >
        <iframe
          src="https://heyzine.com/flip-book/3d12cf6d45.html"
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

        {/* 🔥 SHIELDHER BOX */}
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "14%",
            transform: "translate(-50%, -50%)",
            width: "220px",
            height: "80px",
            backgroundColor: "#050E1E",
            borderRadius: "10px",
            zIndex: 5,
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
            }}
          >
            SHIELDHER ◇
          </h1>
        </div>

        {/* 🔲 RIGHT BOX */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "6%",
            transform: "translate(50%, -50%)",
            width: "100px",
            height: "100px",
            backgroundColor: "#050E1E",
            borderRadius: "10px",
            zIndex: 5,
          }}
        />

      
      </div>
    </div>
  );
}