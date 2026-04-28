// // import { useLocation, useNavigate } from "react-router-dom";

// // export default function SOSConfirmation() {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();

// //   const contacts = state?.contacts || [];
// //   const lat = state?.lat || 0;
// //   const lng = state?.lng || 0;

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: "#040d1c",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         padding: "32px 20px",
// //         position: "relative",
// //         overflow: "hidden",
// //         fontFamily: "'Rajdhani', sans-serif",
// //       }}
// //     >
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap');
// //         @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
// //         @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
// //         @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
// //         @keyframes cardIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
// //         @keyframes scanLine { 0%{top:0;opacity:.5} 100%{top:100%;opacity:0} }
// //       `}</style>

// //       {/* Scan line */}
// //       <div
// //         style={{
// //           width: "100vw",
// //           height: "100vh",
// //           position: "relative",
// //           background: `linear-gradient(rgba(4,13,28,0.55), rgba(4,13,28,0.65)),
// //           url("https://i.pinimg.com/1200x/32/62/95/3262954384b2d2e2d9da54bbabad6fdf.jpg")`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           display: "flex",
// //           flexDirection: "column",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           gap: "20px",
// //           textAlign: "center",
// //           padding: "20px",
// //           overflow: "hidden",
// //         }}
// //       >
// //         {/* Pulse rings */}
// //         {[140, 180, 220].map((size, i) => (
// //           <div
// //             key={i}
// //             style={{
// //               position: "absolute",
// //               width: size,
// //               height: size,
// //               borderRadius: "50%",
// //               border: "1px solid rgba(0,255,136,.2)",
// //               animation: `pulseRing 2.5s ${i * 0.6}s ease-out infinite`,
// //               pointerEvents: "none",
// //             }}
// //           />
// //         ))}

// //         {/* Check circle */}
// //         <div
// //           style={{
// //             width: 90,
// //             height: 90,
// //             borderRadius: "50%",
// //             background: "rgba(0,255,136,.08)",
// //             border: "1.5px solid rgba(0,255,136,.5)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             marginBottom: 18,
// //             boxShadow: "0 0 30px rgba(0,255,136,.15)",
// //             animation: "fadeUp .5s both",
// //           }}
// //         >
// //           <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
// //             <polyline
// //               points="8,20 17,29 32,12"
// //               stroke="#00ff88"
// //               strokeWidth="3"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             />
// //           </svg>
// //         </div>

// //         <h1
// //           style={{
// //             fontFamily: "'Orbitron',monospace",
// //             fontSize: 22,
// //             color: "#00ff88",
// //             letterSpacing: 3,
// //             textShadow: "0 0 20px rgba(0,255,136,.4)",
// //             animation: "fadeUp .6s .2s both",
// //           }}
// //         >
// //           SOS SENT
// //         </h1>
// //         <p
// //           style={{
// //             fontFamily: "'Orbitron',monospace",
// //             fontSize: 13,
// //             color: "rgba(168,240,255,.5)",
// //             letterSpacing: 2,
// //             marginTop: 8,
// //             animation: "fadeUp .6s .35s both",
// //           }}
// //         >
// //           ALL CONTACTS ALERTED
// //         </p>

// //         <div
// //           style={{
// //             width: 200,
// //             height: 1,
// //             background:
// //               "linear-gradient(90deg,transparent,rgba(0,207,255,.3),transparent)",
// //             margin: "20px 0",
// //           }}
// //         />

// //         {/* Contacts */}
// //         <div
// //           style={{
// //             width: "100%",
// //             maxWidth: 380,
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: 8,
// //           }}
// //         >
// //           <div
// //             style={{
// //               fontSize: 9,
// //               letterSpacing: 4,
// //               color: "rgba(0,207,255,.4)",
// //               fontFamily: "'Courier New',monospace",
// //               marginBottom: 6,
// //             }}
// //           >
// //             ◈ EMERGENCY CONTACTS NOTIFIED
// //           </div>
// //           {contacts.map((c, i) => (
// //             <div
// //               key={i}
// //               style={{
// //                 background: "rgba(0,20,50,.6)",
// //                 border: "1px solid rgba(0,180,255,.15)",
// //                 borderRadius: 8,
// //                 padding: "12px 16px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 12,
// //                 animation: `cardIn .5s ${0.4 + i * 0.15}s both`,
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   width: 36,
// //                   height: 36,
// //                   borderRadius: "50%",
// //                   background: "rgba(0,100,200,.2)",
// //                   border: "1px solid rgba(0,207,255,.3)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   color: "#00cfff",
// //                   fontFamily: "'Orbitron',monospace",
// //                   fontSize: 13,
// //                   fontWeight: 700,
// //                 }}
// //               >
// //                 {c.name?.[0]?.toUpperCase() || "?"}
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <div
// //                   style={{ fontSize: 14, color: "#a8f0ff", fontWeight: 600 }}
// //                 >
// //                   {c.name}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: 11,
// //                     color: "rgba(0,180,255,.45)",
// //                     fontFamily: "'Courier New',monospace",
// //                     letterSpacing: 1,
// //                   }}
// //                 >
// //                   {c.relation?.toUpperCase() || "CONTACT"}
// //                 </div>
// //               </div>
// //               <div style={{ display: "flex", gap: 6 }}>
// //                 {["CALL", "SMS"].map((label) => (
// //                   <span
// //                     key={label}
// //                     style={{
// //                       fontSize: 9,
// //                       padding: "3px 8px",
// //                       borderRadius: 4,
// //                       background:
// //                         label === "CALL"
// //                           ? "rgba(0,255,136,.1)"
// //                           : "rgba(0,207,255,.1)",
// //                       border: `1px solid ${label === "CALL" ? "rgba(0,255,136,.35)" : "rgba(0,207,255,.35)"}`,
// //                       color: label === "CALL" ? "#00ff88" : "#00cfff",
// //                       fontFamily: "'Courier New',monospace",
// //                       letterSpacing: 1.5,
// //                     }}
// //                   >
// //                     {label}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Map */}
// //         <div
// //           style={{
// //             width: "100%",
// //             maxWidth: 380,
// //             marginTop: 16,
// //             borderRadius: 10,
// //             overflow: "hidden",
// //             border: "1px solid rgba(0,207,255,.2)",
// //             animation: "fadeUp .6s .8s both",
// //           }}
// //         >
// //           <iframe
// //             title="sos-map"
// //             width="100%"
// //             height="180"
// //             style={{ border: "none", display: "block" }}
// //             src={`https://maps.google.com/maps?q=${lat},${lng}&z=18&t=k&output=embed`}
// //           />
// //         </div>

// //         {/* Live tracking */}
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 6,
// //             marginTop: 20,
// //             animation: "fadeUp .6s 1s both",
// //           }}
// //         >
// //           <div
// //             style={{
// //               width: 6,
// //               height: 6,
// //               borderRadius: "50%",
// //               background: "#00ff88",
// //               boxShadow: "0 0 8px #00ff88",
// //               animation: "blink 1.5s ease-in-out infinite",
// //             }}
// //           />
// //           <span
// //             style={{
// //               fontFamily: "'Courier New',monospace",
// //               fontSize: 10,
// //               color: "rgba(0,207,255,.4)",
// //               letterSpacing: 2,
// //             }}
// //           >
// //             TRACKING ACTIVE
// //           </span>
// //         </div>

// //         {/* Dismiss */}
// //         <button
// //           onClick={() => navigate("/home")}
// //           style={{
// //             marginTop: 24,
// //             padding: "12px 32px",
// //             background: "transparent",
// //             border: "1px solid rgba(0,207,255,.3)",
// //             borderRadius: 8,
// //             color: "rgba(168,240,255,.6)",
// //             fontFamily: "'Orbitron',monospace",
// //             fontSize: 11,
// //             letterSpacing: 2,
// //             cursor: "pointer",
// //           }}
// //         >
// //           BACK TO HOME
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function SOSConfirmation() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(null);
  
// const calledContacts = state?.contacts || state?.success || [];
//   const lat = state?.lat || 0;
//   const lng = state?.lng || 0;

//   // Optional auto-redirect countdown
//   useEffect(() => {
//     // No auto redirect — user stays here until they choose to go back
//   }, []);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#040d1c",
//         fontFamily: "'Rajdhani', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap');
//         @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
//         @keyframes cardIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
//         @keyframes scanLine { 0%{top:0;opacity:.5} 100%{top:100%;opacity:0} }
//         @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
//       `}</style>

//       <div
//         style={{
//           width: "100vw",
//           minHeight: "100vh",
//           position: "relative",
//           background: `linear-gradient(rgba(4,13,28,0.62), rgba(4,13,28,0.72)), url("https://i.pinimg.com/1200x/32/62/95/3262954384b2d2e2d9da54bbabad6fdf.jpg")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "18px",
//           textAlign: "center",
//           padding: "32px 20px",
//           overflow: "hidden",
//         }}
//       >
//         {/* Scan line */}
//         <div
//           style={{
//             position: "absolute",
//             left: 0,
//             right: 0,
//             height: 1,
//             background:
//               "linear-gradient(90deg,transparent,rgba(0,255,136,.2),transparent)",
//             animation: "scanLine 5s linear infinite",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Pulse rings */}
//         {[130, 175, 220].map((size, i) => (
//           <div
//             key={i}
//             style={{
//               position: "absolute",
//               width: size,
//               height: size,
//               borderRadius: "50%",
//               border: "1px solid rgba(0,255,136,.18)",
//               animation: `pulseRing 2.8s ${i * 0.65}s ease-out infinite`,
//               pointerEvents: "none",
//             }}
//           />
//         ))}

//         {/* Check icon */}
//         <div
//           style={{
//             width: 88,
//             height: 88,
//             borderRadius: "50%",
//             background: "rgba(0,255,136,.07)",
//             border: "2px solid rgba(0,255,136,.45)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: "0 0 35px rgba(0,255,136,.18)",
//             animation: "checkPop .6s cubic-bezier(0.23,1,0.32,1) both",
//           }}
//         >
//           <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
//             <polyline
//               points="6,19 15.5,28.5 32,10"
//               stroke="#00ff88"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         <h1
//           style={{
//             fontFamily: "'Orbitron',monospace",
//             fontSize: "clamp(18px,4vw,24px)",
//             color: "#00ff88",
//             letterSpacing: 3,
//             textShadow: "0 0 22px rgba(0,255,136,.38)",
//             animation: "fadeUp .6s .2s both",
//           }}
//         >
//           CALLS & SMS SENT SUCCESSFULLY
//         </h1>

//         <p
//           style={{
//             fontFamily: "'Courier New',monospace",
//             fontSize: 11,
//             color: "rgba(168,240,255,.45)",
//             letterSpacing: 2.5,
//             animation: "fadeUp .6s .35s both",
//           }}
//         >
//           CALLS + SMS DISPATCHED TO ALL CONTACTS
//         </p>

//         <div
//           style={{
//             width: 180,
//             height: 1,
//             background:
//               "linear-gradient(90deg,transparent,rgba(0,207,255,.28),transparent)",
//             margin: "4px 0",
//           }}
//         />

//         {/* Contacts list */}

//         <div
//           style={{
//             width: "100%",
//             maxWidth: 400,
//             display: "flex",
//             flexDirection: "column",
//             gap: 8,
//           }}
//         >
//           <div
//             style={{
//               fontSize: 9,
//               letterSpacing: 4,
//               color: "rgba(0,207,255,.38)",
//               fontFamily: "'Courier New',monospace",
//               marginBottom: 4,
//             }}
//           >
//             ◈ CONTACTS NOTIFIED
//           </div>

//           {/* {calledContacts.length > 0 ? (
//             calledContacts.map((c, i) => (
//               <div
//                 key={i}
//                 style={{
//                   background: "rgba(0,20,50,.65)",
//                   border: "1px solid rgba(0,180,255,.14)",
//                   borderRadius: 8,
//                   padding: "12px 16px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 12,
//                   animation: `cardIn .5s ${0.45 + i * 0.12}s both`,
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: "rgba(0,100,200,.2)",
//                     border: "1px solid rgba(0,207,255,.28)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#00cfff",
//                     fontFamily: "'Orbitron',monospace",
//                     fontSize: 13,
//                     fontWeight: 700,
//                     flexShrink: 0,
//                   }}
//                 >
//                   {c.name?.[0]?.toUpperCase() || "?"}
//                 </div>
//                 <div style={{ flex: 1, textAlign: "left" }}>
//                   <div
//                     style={{ fontSize: 14, color: "#a8f0ff", fontWeight: 600 }}
//                   >
//                     {c.name}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 10,
//                       color: "rgba(0,180,255,.42)",
//                       fontFamily: "'Courier New',monospace",
//                       letterSpacing: 1,
//                     }}
//                   >
//                     CONTACT
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", gap: 5 }}>
//                   {["CALL ✓", "SMS ✓"].map((label) => (
//                     <span
//                       key={label}
//                       style={{
//                         fontSize: 9,
//                         padding: "3px 8px",
//                         borderRadius: 4,
//                         background: label.startsWith("CALL")
//                           ? "rgba(0,255,136,.1)"
//                           : "rgba(0,207,255,.1)",
//                         border: `1px solid ${label.startsWith("CALL") ? "rgba(0,255,136,.35)" : "rgba(0,207,255,.35)"}`,
//                         color: label.startsWith("CALL") ? "#00ff88" : "#00cfff",
//                         fontFamily: "'Courier New',monospace",
//                         letterSpacing: 1.5,
//                       }}
//                     >
//                       {label}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p
//               style={{
//                 fontFamily: "'Courier New',monospace",
//                 fontSize: "11px",
//                 color: "rgba(255,100,100,0.5)",
//               }}
//             >
//               No contacts returned from server.
//             </p>
//           )} */}
//         </div>

//         {/* Map */}
//         {lat !== 0 && lng !== 0 && (
//           <div
//             style={{
//               width: "100%",
//               maxWidth: 400,
//               marginTop: 8,
//               borderRadius: 10,
//               overflow: "hidden",
//               border: "1px solid rgba(0,207,255,.2)",
//               animation: "fadeUp .6s .85s both",
//             }}
//           >
//             <div
//               style={{
//                 padding: "6px 14px",
//                 background: "rgba(0,20,50,.92)",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 7,
//               }}
//             >
//               <div
//                 style={{
//                   width: 5,
//                   height: 5,
//                   borderRadius: "50%",
//                   background: "#00ff88",
//                   boxShadow: "0 0 5px #00ff88",
//                   animation: "blink 1.5s infinite",
//                 }}
//               />
//               <span
//                 style={{
//                   fontFamily: "'Courier New',monospace",
//                   fontSize: 9,
//                   color: "rgba(0,207,255,.45)",
//                   letterSpacing: 2,
//                 }}
//               >
//                 LOCATION SHARED
//               </span>
//               <span
//                 style={{
//                   marginLeft: "auto",
//                   fontFamily: "'Courier New',monospace",
//                   fontSize: 9,
//                   color: "rgba(0,255,136,.35)",
//                 }}
//               >
//                 {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
//               </span>
//             </div>
//             <iframe
//               title="sos-map"
//               width="100%"
//               height="180"
//               style={{ border: "none", display: "block" }}
//               src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
//             />
//           </div>
//         )}

//         {/* Live tracking badge */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             animation: "fadeUp .6s 1.1s both",
//           }}
//         >
//           <div
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: "50%",
//               background: "#00ff88",
//               boxShadow: "0 0 8px #00ff88",
//               animation: "blink 1.4s ease-in-out infinite",
//             }}
//           />
//           <span
//             style={{
//               fontFamily: "'Courier New',monospace",
//               fontSize: 10,
//               color: "rgba(0,207,255,.4)",
//               letterSpacing: 2,
//             }}
//           >
//             GPS LOCATION SENT · CONTACTS ALERTED
//           </span>
//         </div>

//         {/* Action buttons */}
//         <div
//           style={{
//             display: "flex",
//             gap: "12px",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             marginTop: 8,
//             animation: "fadeUp .6s 1.2s both",
//           }}
//         >
//           <button
//             onClick={() => navigate("/dashboard")}
//             style={{
//               padding: "12px 28px",
//               background: "rgba(0,207,255,0.08)",
//               border: "1px solid rgba(0,207,255,.3)",
//               borderRadius: 8,
//               color: "rgba(168,240,255,.65)",
//               fontFamily: "'Orbitron',monospace",
//               fontSize: 10,
//               letterSpacing: 2,
//               cursor: "pointer",
//               transition: "all .2s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.borderColor = "rgba(0,207,255,.6)";
//               e.currentTarget.style.color = "#7de8ff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.borderColor = "rgba(0,207,255,.3)";
//               e.currentTarget.style.color = "rgba(168,240,255,.65)";
//             }}
//           >
//             DASHBOARD
//           </button>
//           <button
//             onClick={() => navigate("/home")}
//             style={{
//               padding: "12px 28px",
//               background: "transparent",
//               border: "1px solid rgba(0,180,255,.2)",
//               borderRadius: 8,
//               color: "rgba(168,240,255,.45)",
//               fontFamily: "'Orbitron',monospace",
//               fontSize: 10,
//               letterSpacing: 2,
//               cursor: "pointer",
//             }}
//           >
//             HOME
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//LAUDE CODE
import { useLocation, useNavigate } from "react-router-dom";
import voice from "../assets/voice.jpg";

export default function SOSConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ contacts comes from Gpstracker navigation state
  const calledContacts = state?.contacts || [];
  const lat = state?.lat || 0;
  const lng = state?.lng || 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040d1c",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap');
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes cardIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes scanLine { 0%{top:0;opacity:.5} 100%{top:100%;opacity:0} }
        @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
      `}</style>

      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          background: `linear-gradient(rgba(4,13,28,0.62), rgba(4,13,28,0.72)), url(${voice})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          textAlign: "center",
          padding: "32px 20px",
          overflow: "hidden",
        }}
      >
        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(0,255,136,.2),transparent)",
            animation: "scanLine 5s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* Pulse rings */}
        {[130, 175, 220].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "1px solid rgba(0,255,136,.18)",
              animation: `pulseRing 2.8s ${i * 0.65}s ease-out infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Check icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "rgba(0,255,136,.07)",
            border: "2px solid rgba(0,255,136,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 35px rgba(0,255,136,.18)",
            animation: "checkPop .6s cubic-bezier(0.23,1,0.32,1) both",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <polyline
              points="6,19 15.5,28.5 32,10"
              stroke="#00ff88"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: "clamp(18px,4vw,24px)",
            color: "#00ff88",
            letterSpacing: 3,
            textShadow: "0 0 22px rgba(0,255,136,.38)",
            animation: "fadeUp .6s .2s both",
          }}
        >
          CALLS & SMS SENT SUCCESSFULLY
        </h1>

        <p
          style={{
            fontFamily: "'Courier New',monospace",
            fontSize: 11,
            color: "rgba(168,240,255,.45)",
            letterSpacing: 2.5,
            animation: "fadeUp .6s .35s both",
          }}
        >
          CALLS + SMS DISPATCHED TO ALL CONTACTS
        </p>

        <div
          style={{
            width: 180,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(0,207,255,.28),transparent)",
            margin: "4px 0",
          }}
        />

        {/* ✅ Contacts list — FIXED & UNCOMMENTED */}
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 9,
              letterSpacing: 4,
              color: "rgba(0,207,255,.38)",
              fontFamily: "'Courier New',monospace",
              marginBottom: 4,
            }}
          >
            ◈ CONTACTS NOTIFIED
          </div>

          {calledContacts.length > 0 ? (
            calledContacts.map((c, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(0,20,50,.65)",
                  border: "1px solid rgba(0,180,255,.14)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  animation: `cardIn .5s ${0.45 + i * 0.12}s both`,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(0,100,200,.2)",
                    border: "1px solid rgba(0,207,255,.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00cfff",
                    fontFamily: "'Orbitron',monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {c.name?.[0]?.toUpperCase() || "?"}
                </div>

                {/* Name & relation */}
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div
                    style={{ fontSize: 14, color: "#a8f0ff", fontWeight: 600 }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(0,180,255,.42)",
                      fontFamily: "'Courier New',monospace",
                      letterSpacing: 1,
                    }}
                  >
                    {c.relation?.toUpperCase() || "CONTACT"}
                  </div>
                </div>

                {/* Status badges */}
                <div style={{ display: "flex", gap: 5 }}>
                  {["CALL ✓", "SMS ✓"].map((label) => (
                    <span
                      key={label}
                      style={{
                        fontSize: 9,
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: label.startsWith("CALL")
                          ? "rgba(0,255,136,.1)"
                          : "rgba(0,207,255,.1)",
                        border: `1px solid ${
                          label.startsWith("CALL")
                            ? "rgba(0,255,136,.35)"
                            : "rgba(0,207,255,.35)"
                        }`,
                        color: label.startsWith("CALL") ? "#00ff88" : "#00cfff",
                        fontFamily: "'Courier New',monospace",
                        letterSpacing: 1.5,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p
              style={{
                fontFamily: "'Courier New',monospace",
                fontSize: "11px",
                color: "rgba(255,180,100,0.6)",
                letterSpacing: 1,
              }}
            >
              ⚠ NO CONTACTS RETURNED — CHECK SERVER LOGS
            </p>
          )}
        </div>

        {/* Map */}
        {lat !== 0 && lng !== 0 && (
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              marginTop: 8,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(0,207,255,.2)",
              animation: "fadeUp .6s .85s both",
            }}
          >
            <div
              style={{
                padding: "6px 14px",
                background: "rgba(0,20,50,.92)",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#00ff88",
                  boxShadow: "0 0 5px #00ff88",
                  animation: "blink 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Courier New',monospace",
                  fontSize: 9,
                  color: "rgba(0,207,255,.45)",
                  letterSpacing: 2,
                }}
              >
                LOCATION SHARED
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: "'Courier New',monospace",
                  fontSize: 9,
                  color: "rgba(0,255,136,.35)",
                }}
              >
                {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
              </span>
            </div>
            <iframe
              title="sos-map"
              width="100%"
              height="180"
              style={{ border: "none", display: "block" }}
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
            />
          </div>
        )}

        {/* Live tracking badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            animation: "fadeUp .6s 1.1s both",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 8px #00ff88",
              animation: "blink 1.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Courier New',monospace",
              fontSize: 10,
              color: "rgba(0,207,255,.4)",
              letterSpacing: 2,
            }}
          >
            GPS LOCATION SENT · CONTACTS ALERTED
          </span>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
            animation: "fadeUp .6s 1.2s both",
          }}
        >
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 28px",
              background: "rgba(0,207,255,0.08)",
              border: "1px solid rgba(0,207,255,.3)",
              borderRadius: 8,
              color: "rgba(168,240,255,.65)",
              fontFamily: "'Orbitron',monospace",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,207,255,.6)";
              e.currentTarget.style.color = "#7de8ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,207,255,.3)";
              e.currentTarget.style.color = "rgba(168,240,255,.65)";
            }}
          >
            DASHBOARD
          </button>
          <button
            onClick={() => navigate("/home")}
            style={{
              padding: "12px 28px",
              background: "transparent",
              border: "1px solid rgba(0,180,255,.2)",
              borderRadius: 8,
              color: "rgba(168,240,255,.45)",
              fontFamily: "'Orbitron',monospace",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
            }}
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}