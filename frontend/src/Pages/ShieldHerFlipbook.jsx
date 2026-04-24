// export default function ShieldHerFlipbook() {
//   return (
//     <div
//       style={{
//         backgroundColor: "#040d1c",
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "relative",
//       }}
//     >
//       <h2
//         style={{
//           fontFamily: "'Orbitron',monospace",
//           fontSize: "clamp(1.5rem,3vw,2.3rem)",
//           fontWeight: 700,
//           letterSpacing: "3px",
//           color: "#7de8ff",
//           textShadow: "0 0 26px rgba(0,207,255,0.28)",
//           marginBottom: "40px",
//         }}
//       >
//         HOW TO ACTIVATE SHIELDHER
//       </h2>
//       <div
//         style={{
//           width: "70%",
//           height: "80vh",
//           overflow: "hidden",
//           zIndex: 1,
//         }}
//       >
//         <iframe
//           src="https://heyzine.com/flip-book/3d12cf6d45.html"
//           className="fp-iframe"
//           title="Flipbook"
//           style={{
//             border: "none",
//             width: "100%",
//             height: "100%",
//           }}
//           allow="clipboard-write"
//           allowFullScreen
//           scrolling="no"
//         />

//         {/* White Rectangle Overlay */}

//                <div
//         style={{
//           position: "absolute",   // ✅ sits on top of iframe
//           bottom: "6%",
//           left: "23%",
//           transform: "translate(-50%, -50%)",
//           width: "220px",
//           height: "80px",
//           backgroundColor: "#040d1c",
//           borderRadius: "10px",

//           zIndex: 1,
//           <div
//             style={{
//             position: "absolute", // ✅ sits on top of iframe
//             top: "18%",
//             left: "23%",
//             transform: "translate(-50%, -50%)",
//             width: "220px",
//             height: "80px",
//             backgroundColor: "#050E1E",
//             borderRadius: "10px",
//             zIndex: 1,
//            display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <h1
//           style={{
//             margin: 0,
//             fontSize: "28px",
//             fontWeight: "bold",
//             color: "#fff",
//             letterSpacing: "2px",
//                textAlign: "center",
//           }}
//         >
//           SHIELDHER ◇
//         </h1>
//       </div>
//       <div
//         style={{
//           position: "absolute",   // ✅ sits on top of iframe
//           top: "17%",
//           right: "13%",
//           transform: "translate(-50%, -50%)",
//           width: "100px",
//           height: "100px",
//           backgroundColor: "#050E1E",
//           borderRadius: "10px",

//           zIndex: 10,
//         }}
//       >
//       </div>

//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <h1
//             style={{
//               margin: 0,
//               fontSize: "28px",
//               fontWeight: "bold",
//               color: "#fff",
//               letterSpacing: "2px",
//               textAlign: "center",
//             }}
//           >
//             SHIELDHER
//           </h1>
//         </div>
//         <div
//           style={{
//             position: "absolute", // ✅ sits on top of iframe
//             top: "17%",
//             right: "13%",
//             transform: "translate(-50%, -50%)",
//             width: "100px",
//             height: "100px",
//             backgroundColor: "#050E1E",
//             borderRadius: "10px",

//             zIndex: 10,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// }
export default function ShieldHerFlipbook() {
  return (
    <div
      style={{
        backgroundColor: "#040d1c",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Orbitron', monospace",
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Iframe */}
        <iframe
          src="https://heyzine.com/flip-book/3d12cf6d45.html"
          title="Flipbook"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
          allow="clipboard-write"
          allowFullScreen
        />

        {/* Overlay Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            pointerEvents: "none", // important so iframe still clickable
          }}
        >
          {/* SHIELDHER Badge */}
          {/* <div
            style={{
              position: "absolute",
              top: "15%",
              left: "20%",
              transform: "translateX(-50%)",
              width: "220px",
              height: "80px",
              backgroundColor: "#050E1E",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 20px rgba(0,0,0,0.4)",
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
          </div> */}

          {/* Right Floating Box */}
          <div
          imgsrc=""
            style={{
              position: "absolute",
              top: "17%",
              right: "13%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
              backgroundColor: "#050E1E",
              borderRadius: "10px",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}
