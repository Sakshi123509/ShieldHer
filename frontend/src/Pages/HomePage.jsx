import { useState, useEffect, useRef } from "react";

/* ── Global styles injected once ────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0a0010;color:#f0c0d8;font-family:'Rajdhani',sans-serif;overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-track{background:#0a0010;}
  ::-webkit-scrollbar-thumb{background:#ff2d6b;border-radius:2px;}

  @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-14px);}}
  @keyframes pulse-pink{0%,100%{box-shadow:0 0 0 0 rgba(255,45,107,0.5);}50%{box-shadow:0 0 0 18px rgba(255,45,107,0);}}
  @keyframes spin-slow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes scan{0%{top:-4px;}100%{top:100%;}}
  @keyframes fadeSlideUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes shimmer{0%{background-position:-400px 0;}100%{background-position:400px 0;}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
  @keyframes dangerPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,0,80,0.8),0 0 30px rgba(255,0,80,0.4);}50%{box-shadow:0 0 0 24px rgba(255,0,80,0),0 0 60px rgba(255,0,80,0.2);}}
  @keyframes ripple{0%{transform:scale(0.8);opacity:1;}100%{transform:scale(2.5);opacity:0;}}
  @keyframes slideRight{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes glowPink{0%,100%{text-shadow:0 0 20px rgba(255,45,107,0.5);}50%{text-shadow:0 0 40px rgba(255,45,107,0.9),0 0 80px rgba(255,100,150,0.4);}}
  @keyframes navGlow{0%,100%{box-shadow:0 2px 30px rgba(255,45,107,0.1);}50%{box-shadow:0 2px 30px rgba(255,45,107,0.25);}}
  @keyframes particleFloat{0%{transform:translateY(0) translateX(0);opacity:0.8;}100%{transform:translateY(-120px) translateX(var(--dx));opacity:0;}}
  @keyframes waveform{0%,100%{height:6px;}50%{height:28px;}}
  @keyframes alertFlash{0%,100%{background:rgba(255,0,80,0.15);}50%{background:rgba(255,0,80,0.35);}}
`;

/* ── Animated BG Canvas ─────────────────────────────────────── */
function PinkParticlesBG() {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const lastRef = useRef(null);
  const pts = useRef([]);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      pts.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: 0.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.3,
        alpha: 0.1 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        hue: 320 + Math.random() * 40,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (now) => {
      const W = c.width, H = c.height;
      const dt = Math.min(now - (lastRef.current || now), 50) / 1000;
      lastRef.current = now;
      tRef.current += dt;
      const t = tRef.current;

      ctx.clearRect(0, 0, W, H);

      // Deep dark bg
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
      bg.addColorStop(0, "#120018");
      bg.addColorStop(0.4, "#0a0010");
      bg.addColorStop(1, "#050008");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Pink ambient glow blobs
      [[0.2, 0.2, 0.25], [0.8, 0.7, 0.2], [0.5, 0.9, 0.15]].forEach(([rx, ry, s]) => {
        const grd = ctx.createRadialGradient(W * rx, H * ry, 0, W * rx, H * ry, Math.min(W, H) * s);
        grd.addColorStop(0, `rgba(180,0,80,${0.07 + Math.sin(t * 0.5 + rx * 10) * 0.02})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      });

      // Grid
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = "#ff2d6b";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();

      // Particles
      pts.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += dt * 1.5;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        const a = p.alpha * (0.4 + Math.sin(p.pulse) * 0.4);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = `hsl(${p.hue},100%,65%)`;
        ctx.shadowColor = `hsl(${p.hue},100%,65%)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Pulse rings
      for (let i = 0; i < 3; i++) {
        const ph = ((t * 0.25 + i / 3) % 1);
        ctx.save();
        ctx.globalAlpha = (1 - ph) * 0.04;
        ctx.strokeStyle = "#ff2d6b";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(W * 0.5, H * 0.5, ph * Math.min(W, H) * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── Navbar ─────────────────────────────────────────────────── */
function Navbar({ onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "How It Works", "Features", "About", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 40px",
      height: "68px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,0,16,0.92)" : "rgba(10,0,16,0.6)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,45,107,0.2)",
      animation: "navGlow 4s ease-in-out infinite",
      transition: "background 0.3s",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <div style={{
          width: "36px", height: "36px",
          border: "2px solid #ff2d6b",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(255,45,107,0.4)",
          background: "rgba(255,45,107,0.1)",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 L17 5 L17 10 C17 14.5 13.5 17.5 10 19 C6.5 17.5 3 14.5 3 10 L3 5 Z" fill="rgba(255,45,107,0.3)" stroke="#ff2d6b" strokeWidth="1.5"/>
            <line x1="10" y1="4" x2="10" y2="16" stroke="#ff9dbb" strokeWidth="1"/>
            <circle cx="10" cy="9" r="2" fill="#ff2d6b"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Orbitron', monospace", fontSize: "18px",
          fontWeight: 700, color: "#ff2d6b",
          textShadow: "0 0 20px rgba(255,45,107,0.5)",
          letterSpacing: "2px",
        }}>SHIELDHER</span>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href="#" onClick={e => { e.preventDefault(); onNav(l); }} style={{
            color: "rgba(240,192,216,0.7)", fontSize: "13px",
            letterSpacing: "1.5px", textDecoration: "none",
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
            textTransform: "uppercase",
            transition: "color .2s, text-shadow .2s",
          }}
          onMouseEnter={e => { e.target.style.color = "#ff2d6b"; e.target.style.textShadow = "0 0 12px rgba(255,45,107,0.6)"; }}
          onMouseLeave={e => { e.target.style.color = "rgba(240,192,216,0.7)"; e.target.style.textShadow = "none"; }}>
            {l}
          </a>
        ))}
        <button style={{
          padding: "8px 22px",
          background: "linear-gradient(135deg,#ff2d6b,#c2006a)",
          border: "none", borderRadius: "6px",
          color: "#fff", fontSize: "13px", letterSpacing: "1.5px",
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 700,
          textTransform: "uppercase", cursor: "pointer",
          boxShadow: "0 0 20px rgba(255,45,107,0.4)",
          transition: "box-shadow .2s, transform .2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 35px rgba(255,45,107,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(255,45,107,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          Get Protected
        </button>
      </div>
    </nav>
  );
}

/* ── Hero Section ───────────────────────────────────────────── */
function Hero() {
  const [shown, setShown] = useState(false);
  useEffect(() => { setTimeout(() => setShown(true), 200); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      padding: "120px 24px 60px", position: "relative",
    }}>
      {/* Big glow behind text */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,45,107,0.08) 0%,transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{
        position: "relative", zIndex: 1,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <div style={{
          fontSize: "11px", letterSpacing: "6px",
          color: "#ff2d6b", marginBottom: "20px",
          fontFamily: "'Orbitron', monospace",
          animation: "blink 3s ease-in-out infinite",
        }}>◈ WOMEN SAFETY REIMAGINED</div>

        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(2.5rem,6vw,5.5rem)",
          fontWeight: 900, lineHeight: 1.1,
          marginBottom: "24px",
          background: "linear-gradient(135deg,#ffffff 0%,#ffb3cc 40%,#ff2d6b 70%,#c2006a 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "glowPink 4s ease-in-out infinite",
          letterSpacing: "2px",
        }}>
          SHIELD<br/>HER
        </h1>

        <p style={{
          fontSize: "clamp(1rem,2vw,1.3rem)",
          color: "rgba(240,192,216,0.75)",
          maxWidth: "560px", margin: "0 auto 16px",
          lineHeight: 1.7, letterSpacing: "0.5px",
          fontWeight: 400,
        }}>
          AI-powered women safety platform with real-time threat detection,
          emergency response, and wearable protection — because every woman
          deserves to feel safe, everywhere.
        </p>

        <p style={{
          fontSize: "13px", letterSpacing: "3px",
          color: "#ff2d6b", marginBottom: "40px",
          fontFamily: "'Orbitron', monospace", fontWeight: 400,
        }}>POWERING RESILIENCE</p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            padding: "16px 40px",
            background: "linear-gradient(135deg,#ff2d6b,#c2006a)",
            border: "none", borderRadius: "8px",
            color: "#fff", fontSize: "14px", letterSpacing: "2px",
            fontFamily: "'Orbitron', monospace", fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(255,45,107,0.4)",
            animation: "pulse-pink 2.5s ease-in-out infinite",
            transition: "transform .2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            ACTIVATE SHIELD
          </button>
          <button style={{
            padding: "16px 40px",
            background: "transparent",
            border: "1px solid rgba(255,45,107,0.5)",
            borderRadius: "8px",
            color: "#ff9dbb", fontSize: "14px", letterSpacing: "2px",
            fontFamily: "'Orbitron', monospace", fontWeight: 600,
            cursor: "pointer",
            transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,45,107,0.1)"; e.currentTarget.style.borderColor = "#ff2d6b"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,45,107,0.5)"; }}>
            WATCH DEMO
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "40px", justifyContent: "center",
          marginTop: "60px", flexWrap: "wrap",
        }}>
          {[["10K+","Women Protected"],["< 3s","Emergency Response"],["99.9%","Uptime"],["24/7","AI Monitoring"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Orbitron', monospace", fontSize: "1.8rem",
                fontWeight: 700, color: "#ff2d6b",
                textShadow: "0 0 20px rgba(255,45,107,0.5)",
              }}>{n}</div>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "rgba(240,192,216,0.5)", marginTop: "4px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Cinematic Demo ─────────────────────────────────────────── */
function CinematicDemo() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [danger, setDanger] = useState(false);
  const timerRef = useRef(null);

  const STEPS = [
    { id: 0, label: "SCENE: Dark Street", sub: "Girl walking alone at night" },
    { id: 1, label: "THREAT DETECTED", sub: "Two unidentified figures approaching" },
    { id: 2, label: "METHOD 1: App Activation", sub: "Manually opens ShieldHer — location tracked, alerts sent" },
    { id: 3, label: "METHOD 2: Voice Trigger", sub: 'Says "Danger" — AI activates, calls + SMS to emergency contacts' },
    { id: 4, label: "METHOD 3: Wearable Tap", sub: "Brooch tapped — GPS+GSM+Camera activate, police notified" },
    { id: 5, label: "HELP IS COMING", sub: "Emergency contacts + police racing to her location" },
  ];

  const play = () => {
    setPlaying(true);
    setStep(0);
    setDanger(false);
  };

  useEffect(() => {
    if (!playing) return;
    if (step === 1) setDanger(true);
    if (step >= STEPS.length - 1) { setPlaying(false); return; }
    timerRef.current = setTimeout(() => setStep(s => s + 1), step === 0 ? 2500 : 3000);
    return () => clearTimeout(timerRef.current);
  }, [playing, step]);

  return (
    <section id="demo" style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#ff2d6b", marginBottom: "12px", fontFamily: "'Orbitron', monospace" }}>
            ◈ CINEMATIC DEMO
          </div>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "#fff", letterSpacing: "2px", fontWeight: 700 }}>
            SEE IT IN ACTION
          </h2>
        </div>

        {/* Scene frame */}
        <div style={{
          position: "relative",
          background: "rgba(5,0,10,0.95)",
          border: `2px solid ${danger ? "#ff0050" : "rgba(255,45,107,0.3)"}`,
          borderRadius: "16px",
          overflow: "hidden",
          minHeight: "480px",
          transition: "border-color 0.5s",
          boxShadow: danger ? "0 0 60px rgba(255,0,80,0.3), inset 0 0 80px rgba(255,0,80,0.05)" : "0 0 40px rgba(255,45,107,0.1)",
        }}>
          {/* Danger pulse overlay */}
          {danger && step >= 1 && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(255,0,50,0.04)",
              animation: "alertFlash 1s ease-in-out infinite",
              zIndex: 1, pointerEvents: "none",
            }}/>
          )}

          {/* Scan line */}
          {playing && (
            <div style={{
              position: "absolute", left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg,transparent,rgba(255,45,107,0.6),transparent)",
              animation: "scan 2.5s linear infinite", zIndex: 5, pointerEvents: "none",
            }}/>
          )}

          {/* Scene renderer */}
          <SceneRenderer step={step} playing={playing} danger={danger} />

          {/* HUD overlays */}
          {playing && (
            <>
              {/* Top-left HUD */}
              <div style={{
                position: "absolute", top: "16px", left: "16px", zIndex: 10,
                fontFamily: "'Orbitron', monospace", fontSize: "10px",
                color: danger ? "#ff0050" : "#ff9dbb", letterSpacing: "2px",
              }}>
                <div style={{ animation: "blink 1s infinite" }}>● {danger ? "THREAT DETECTED" : "MONITORING ACTIVE"}</div>
                <div style={{ color: "rgba(255,157,187,0.5)", marginTop: "4px" }}>GPS: LIVE</div>
              </div>
              {/* Top-right */}
              <div style={{
                position: "absolute", top: "16px", right: "16px", zIndex: 10,
                fontFamily: "'Orbitron', monospace", fontSize: "10px",
                color: "rgba(255,157,187,0.6)", textAlign: "right",
              }}>
                <div>SHIELDHER v2.4</div>
                <div style={{ marginTop: "4px" }}>AI ENGINE: ACTIVE</div>
              </div>
            </>
          )}

          {/* Step label */}
          {playing && (
            <div style={{
              position: "absolute", bottom: "60px", left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10, textAlign: "center", width: "90%",
            }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(0.8rem,2vw,1.1rem)",
                fontWeight: 700,
                color: danger ? "#ff3366" : "#ff9dbb",
                textShadow: danger ? "0 0 20px rgba(255,0,80,0.8)" : "0 0 10px rgba(255,45,107,0.5)",
                letterSpacing: "2px",
                animation: "fadeSlideUp 0.4s ease both",
              }}>
                {STEPS[step]?.label}
              </div>
              <div style={{
                fontSize: "13px", color: "rgba(240,192,216,0.65)",
                marginTop: "6px", letterSpacing: "1px",
              }}>
                {STEPS[step]?.sub}
              </div>
            </div>
          )}

          {/* Play button */}
          {!playing && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "rgba(5,0,10,0.7)",
              backdropFilter: "blur(4px)",
            }}>
              <button onClick={play} style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "rgba(255,45,107,0.15)",
                border: "2px solid #ff2d6b",
                cursor: "pointer", color: "#ff2d6b", fontSize: "28px",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 40px rgba(255,45,107,0.4)",
                animation: "pulse-pink 2s ease-in-out infinite",
                transition: "transform .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                ▶
              </button>
              <p style={{
                marginTop: "20px", fontFamily: "'Orbitron', monospace",
                fontSize: "12px", letterSpacing: "3px", color: "rgba(255,157,187,0.7)",
              }}>{step > 0 ? "REPLAY DEMO" : "PLAY DEMO"}</p>
            </div>
          )}

          {/* Step indicator */}
          <div style={{
            position: "absolute", bottom: "16px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: "8px", zIndex: 10,
          }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                width: i === step ? "24px" : "6px",
                height: "4px", borderRadius: "2px",
                background: i <= step ? "#ff2d6b" : "rgba(255,45,107,0.25)",
                transition: "all .3s",
              }}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Scene Renderer (Canvas) ─────────────────────────────────── */
function SceneRenderer({ step, playing, danger }) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const lastRef = useRef(null);
  const stepRef = useRef(step);
  const dangerRef = useRef(danger);
  useEffect(() => { stepRef.current = step; }, [step]);
  useEffect(() => { dangerRef.current = danger; }, [danger]);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;

    const render = (now) => {
      const dt = Math.min(now - (lastRef.current || now), 50) / 1000;
      lastRef.current = now;
      tRef.current += dt;
      const t = tRef.current;
      const st = stepRef.current;
      const dng = dangerRef.current;

      ctx.clearRect(0, 0, W, H);

      // Night sky bg
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#020008");
      sky.addColorStop(0.6, "#0a0015");
      sky.addColorStop(1, "#180010");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (let i = 0; i < 60; i++) {
        const sx = ((i * 137.5) % W);
        const sy = ((i * 89.3) % (H * 0.55));
        const sa = 0.3 + Math.sin(t * 0.8 + i) * 0.3;
        ctx.save();
        ctx.globalAlpha = sa;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Road
      const road = ctx.createLinearGradient(0, H * 0.55, 0, H);
      road.addColorStop(0, "#1a0820");
      road.addColorStop(1, "#0d0015");
      ctx.fillStyle = road;
      ctx.beginPath();
      ctx.moveTo(W * 0.1, H * 0.55);
      ctx.lineTo(W * 0.9, H * 0.55);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fill();

      // Road markings
      ctx.save();
      ctx.strokeStyle = "rgba(255,45,107,0.15)";
      ctx.lineWidth = 2;
      ctx.setLineDash([30, 20]);
      ctx.beginPath();
      ctx.moveTo(W * 0.5, H * 0.57);
      ctx.lineTo(W * 0.5, H);
      ctx.stroke();
      ctx.restore();

      // Street light glow
      const lampX = W * 0.5;
      const lampGrd = ctx.createRadialGradient(lampX, H * 0.3, 0, lampX, H * 0.5, W * 0.35);
      lampGrd.addColorStop(0, `rgba(255,150,200,${0.06 + Math.sin(t * 0.3) * 0.01})`);
      lampGrd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lampGrd;
      ctx.fillRect(0, 0, W, H);

      // ── GIRL (center) ──────────────────────────────────────
      const gx = W * 0.5, gy = H * 0.62;
      const bob = Math.sin(t * 1.5) * 2;

      // Girl glow aura
      if (dng) {
        const aura = ctx.createRadialGradient(gx, gy, 0, gx, gy, 55);
        aura.addColorStop(0, `rgba(255,0,80,${0.12 + Math.sin(t * 4) * 0.06})`);
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, W, H);
      }

      // Body
      ctx.save();
      ctx.translate(gx, gy + bob);
      // Dress
      ctx.fillStyle = "#c2006a";
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.quadraticCurveTo(-16, 30, -14, 54);
      ctx.lineTo(14, 54);
      ctx.quadraticCurveTo(16, 30, 8, 0);
      ctx.closePath();
      ctx.fill();
      // Torso
      ctx.fillStyle = "#e8a0c0";
      ctx.beginPath();
      ctx.roundRect(-7, -22, 14, 22, 3);
      ctx.fill();
      // Head
      ctx.fillStyle = "#f0c8a0";
      ctx.beginPath();
      ctx.arc(0, -30, 10, 0, Math.PI * 2);
      ctx.fill();
      // Hair
      ctx.fillStyle = "#1a0010";
      ctx.beginPath();
      ctx.arc(0, -34, 10, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(8, -34);
      ctx.quadraticCurveTo(14, -20, 10, -5);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#1a0010";
      ctx.stroke();
      // Phone (step 2)
      if (st === 2) {
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.roundRect(10, -15, 12, 20, 2);
        ctx.fill();
        ctx.fillStyle = "#ff2d6b";
        ctx.beginPath();
        ctx.roundRect(11, -14, 10, 18, 1);
        ctx.fill();
        // App icon on phone
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(16, -5, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ── SHIELDHER SHIELD around girl (step 2+) ─────────────
      if (st >= 2) {
        const shieldAlpha = Math.min((st - 1) * 0.5, 0.8);
        const shieldR = 70 + Math.sin(t * 2) * 5;
        ctx.save();
        ctx.globalAlpha = shieldAlpha * 0.5;
        ctx.strokeStyle = "#ff2d6b";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#ff2d6b";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(gx, gy + 20, shieldR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        // Ripple
        const rph = (t * 0.7) % 1;
        ctx.save();
        ctx.globalAlpha = (1 - rph) * 0.35 * shieldAlpha;
        ctx.strokeStyle = "#ff2d6b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(gx, gy + 20, shieldR + rph * 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── MEN (blurry threatening figures) ───────────────────
      if (st >= 1) {
        const menAlpha = Math.min((t - 0.5) * 0.8, 0.9);
        // Left man
        drawBlurryMan(ctx, W * 0.22, H * 0.65, -1, t, menAlpha, dng);
        // Right man
        drawBlurryMan(ctx, W * 0.78, H * 0.65, 1, t, menAlpha, dng);
      }

      // ── METHOD 2: Voice wave (step 3) ──────────────────────
      if (st === 3) {
        ctx.save();
        ctx.translate(gx, gy - 50 + bob);
        for (let i = 0; i < 7; i++) {
          const bh = 4 + Math.sin(t * 8 + i * 0.8) * 14;
          ctx.fillStyle = `rgba(255,45,107,${0.5 + Math.sin(t * 6 + i) * 0.3})`;
          ctx.beginPath();
          ctx.roundRect(-21 + i * 7, -bh / 2, 5, bh, 2);
          ctx.fill();
        }
        ctx.restore();
        // "DANGER" text
        ctx.save();
        ctx.font = `bold 11px 'Orbitron', monospace`;
        ctx.fillStyle = `rgba(255,50,100,${0.6 + Math.sin(t * 4) * 0.3})`;
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff2d6b";
        ctx.shadowBlur = 12;
        ctx.fillText('"DANGER"', gx, gy - 70 + bob);
        ctx.restore();
      }

      // ── METHOD 3: Wearable (step 4) ─────────────────────────
      if (st === 4) {
        // Wearable brooch at chest
        const bx = gx + 2, by = gy - 12 + bob;
        ctx.save();
        ctx.fillStyle = "#ff2d6b";
        ctx.shadowColor = "#ff2d6b";
        ctx.shadowBlur = 20 + Math.sin(t * 6) * 10;
        ctx.beginPath();
        ctx.arc(bx, by, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // GPS, GSM, CAM labels radiating out
        const labels = [["GPS", -70, -30], ["GSM", 70, -30], ["CAM", 0, -65]];
        labels.forEach(([lbl, dx, dy], i) => {
          const ph = ((t * 0.8 + i / 3) % 1);
          ctx.save();
          ctx.globalAlpha = 1 - ph;
          ctx.strokeStyle = "#ff2d6b";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + dx * ph, by + dy * ph);
          ctx.stroke();
          ctx.restore();
          ctx.save();
          ctx.globalAlpha = 0.8;
          ctx.font = `bold 9px 'Orbitron', monospace`;
          ctx.fillStyle = "#ff9dbb";
          ctx.textAlign = "center";
          ctx.fillText(lbl, bx + dx, by + dy - 4);
          ctx.restore();
        });
      }

      // ── STEP 5: Help coming ─────────────────────────────────
      if (st === 5) {
        // Police car from left
        const pcx = W * 0.05 + (t % 4) * W * 0.1;
        ctx.save();
        ctx.fillStyle = "#4040ff";
        ctx.beginPath();
        ctx.roundRect(pcx, H * 0.72, 40, 20, 4);
        ctx.fill();
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.roundRect(pcx + 4, H * 0.7, 32, 8, 2);
        ctx.fill();
        // Siren flash
        ctx.fillStyle = Math.sin(t * 12) > 0 ? "#ff0000" : "#0000ff";
        ctx.shadowColor = Math.sin(t * 12) > 0 ? "#ff0000" : "#0000ff";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(pcx + 20, H * 0.7, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Person from right
        const perx = W * 0.95 - (t % 4) * W * 0.08;
        ctx.save();
        ctx.translate(perx, H * 0.68);
        ctx.fillStyle = "#ff9dbb";
        ctx.beginPath();
        ctx.arc(0, -20, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e05080";
        ctx.beginPath();
        ctx.roundRect(-6, -12, 12, 18, 2);
        ctx.fill();
        ctx.restore();

        // "HELP INCOMING" label
        ctx.save();
        ctx.font = `bold 14px 'Orbitron', monospace`;
        ctx.fillStyle = "#ff2d6b";
        ctx.textAlign = "center";
        ctx.shadowColor = "#ff2d6b";
        ctx.shadowBlur = 20;
        ctx.globalAlpha = 0.8 + Math.sin(t * 4) * 0.2;
        ctx.fillText("HELP IS COMING", W / 2, H * 0.3);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={ref}
      width={800}
      height={420}
      style={{ width: "100%", height: "420px", display: "block" }}
    />
  );
}

function drawBlurryMan(ctx, x, y, dir, t, alpha, danger) {
  ctx.save();
  ctx.filter = "blur(3px)";
  ctx.globalAlpha = alpha * 0.75;
  ctx.translate(x, y);
  // Body silhouette
  ctx.fillStyle = danger ? "rgba(120,0,30,0.9)" : "rgba(40,0,20,0.8)";
  ctx.beginPath();
  ctx.roundRect(-10, -40, 20, 45, 3);
  ctx.fill();
  // Head
  ctx.beginPath();
  ctx.arc(0, -48, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (danger) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.4;
    ctx.fillStyle = "rgba(255,0,50,0.4)";
    ctx.filter = "blur(8px)";
    ctx.beginPath();
    ctx.arc(x, y - 24, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ── Three Methods Cards ────────────────────────────────────── */
function Methods() {
  const methods = [
    {
      num: "01",
      icon: "📱",
      title: "App Activation",
      color: "#ff2d6b",
      glow: "rgba(255,45,107,0.3)",
      desc: "Open ShieldHer and tap the emergency button. Your live GPS location is instantly shared with emergency contacts via call and SMS. Real-time tracking begins immediately.",
      features: ["Live GPS Tracking", "Auto Call + SMS Alert", "Location History Log", "Panic Button"],
    },
    {
      num: "02",
      icon: "🎙",
      title: 'Voice: "Danger"',
      color: "#ff6b9d",
      glow: "rgba(255,107,157,0.3)",
      desc: `Say the trigger word "Danger" and ShieldHer's AI instantly activates. No need to unlock your phone. Calls and messages are automatically sent to all emergency contacts.`,
      features: ["AI Voice Recognition", "Hands-Free Activation", "Auto Emergency Calls", "SMS with Location"],
    },
    {
      num: "03",
      icon: "💎",
      title: "Wearable Brooch",
      color: "#e040fb",
      glow: "rgba(224,64,251,0.3)",
      desc: "Tap the elegantly designed brooch. Built-in GPS+GSM module activates instantly, camera captures proof stored on cloud, and nearby police stations are notified simultaneously.",
      features: ["Built-in GPS + GSM", "Camera Evidence Capture", "Cloud Storage Proof", "Police Auto-Alert"],
    },
  ];

  return (
    <section style={{ padding: "80px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#ff2d6b", marginBottom: "12px", fontFamily: "'Orbitron', monospace" }}>
            ◈ THREE LAYERS OF PROTECTION
          </div>
          <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#fff", letterSpacing: "2px" }}>
            HOW SHE STAYS SAFE
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px" }}>
          {methods.map((m, idx) => (
            <MethodCard key={idx} method={m} delay={idx * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCard({ method: m, delay }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(20,0,30,0.95)" : "rgba(12,0,20,0.85)",
        border: `1px solid ${hovered ? m.color : "rgba(255,45,107,0.2)"}`,
        borderRadius: "16px",
        padding: "36px 28px",
        position: "relative", overflow: "hidden",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? `0 0 50px ${m.glow}, 0 20px 60px rgba(0,0,0,0.4)` : "0 4px 30px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px)" : visible ? "translateY(0)" : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
      }}>
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: "2px",
        background: `linear-gradient(90deg,transparent,${m.color},transparent)`,
        opacity: hovered ? 1 : 0.4, transition: "opacity .3s",
      }}/>

      {/* Number */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontSize: "3rem",
        fontWeight: 900, color: m.color, opacity: 0.15,
        position: "absolute", top: "16px", right: "20px",
        lineHeight: 1,
      }}>{m.num}</div>

      {/* Icon */}
      <div style={{
        fontSize: "2.5rem", marginBottom: "20px",
        filter: hovered ? `drop-shadow(0 0 12px ${m.color})` : "none",
        transition: "filter .3s",
      }}>{m.icon}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Orbitron', monospace", fontSize: "1rem",
        fontWeight: 700, color: m.color, letterSpacing: "2px",
        marginBottom: "14px",
        textShadow: hovered ? `0 0 20px ${m.color}` : "none",
        transition: "text-shadow .3s",
      }}>{m.title}</h3>

      <p style={{
        fontSize: "14px", color: "rgba(240,192,216,0.65)",
        lineHeight: 1.7, marginBottom: "24px",
      }}>{m.desc}</p>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {m.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: m.color,
              boxShadow: `0 0 8px ${m.color}`,
              flexShrink: 0,
            }}/>
            <span style={{ fontSize: "13px", color: "rgba(240,192,216,0.7)", letterSpacing: "0.5px" }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Corner marks */}
      {[{ top: 10, left: 10, borderTop: `1px solid ${m.color}`, borderLeft: `1px solid ${m.color}` },
        { top: 10, right: 10, borderTop: `1px solid ${m.color}`, borderRight: `1px solid ${m.color}` },
        { bottom: 10, left: 10, borderBottom: `1px solid ${m.color}`, borderLeft: `1px solid ${m.color}` },
        { bottom: 10, right: 10, borderBottom: `1px solid ${m.color}`, borderRight: `1px solid ${m.color}` }]
        .map((s, i) => (
          <div key={i} style={{
            position: "absolute", width: "12px", height: "12px",
            opacity: hovered ? 1 : 0.3, transition: "opacity .3s", ...s,
          }}/>
        ))}
    </div>
  );
}

/* ── Features strip ─────────────────────────────────────────── */
function Features() {
  const feats = [
    { icon: "🛡", label: "AI Threat Detection" },
    { icon: "📍", label: "Real-time GPS" },
    { icon: "📞", label: "Auto Emergency Call" },
    { icon: "📹", label: "Cloud Evidence Capture" },
    { icon: "🚔", label: "Police Auto-Alert" },
    { icon: "💬", label: "SMS Broadcast" },
    { icon: "⌚", label: "Wearable Integration" },
    { icon: "☁️", label: "Cloud Backup" },
  ];
  return (
    <section style={{ padding: "60px 24px", borderTop: "1px solid rgba(255,45,107,0.1)", borderBottom: "1px solid rgba(255,45,107,0.1)" }}>
      <div style={{ display: "flex", gap: "0", overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
        {feats.map((f, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "14px 28px",
            borderRight: i < feats.length - 1 ? "1px solid rgba(255,45,107,0.15)" : "none",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "18px" }}>{f.icon}</span>
            <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "rgba(240,192,216,0.65)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ padding: "100px 24px", textAlign: "center", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(255,45,107,0.06) 0%,transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#ff2d6b", marginBottom: "16px", fontFamily: "'Orbitron', monospace" }}>
          ◈ JOIN THE SHIELD
        </div>
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(1.8rem,4vw,3.2rem)",
          color: "#fff", letterSpacing: "2px", marginBottom: "20px",
          fontWeight: 900,
        }}>
          EVERY WOMAN DESERVES<br/>
          <span style={{ color: "#ff2d6b", textShadow: "0 0 30px rgba(255,45,107,0.5)" }}>TO FEEL SAFE</span>
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(240,192,216,0.6)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Join thousands of women already protected by ShieldHer's intelligent safety network.
        </p>
        <button style={{
          padding: "18px 52px",
          background: "linear-gradient(135deg,#ff2d6b,#c2006a)",
          border: "none", borderRadius: "8px",
          color: "#fff", fontSize: "15px",
          letterSpacing: "2.5px", fontFamily: "'Orbitron', monospace",
          fontWeight: 700, cursor: "pointer",
          boxShadow: "0 0 60px rgba(255,45,107,0.4)",
          animation: "pulse-pink 2.5s ease-in-out infinite",
          transition: "transform .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          GET PROTECTED NOW
        </button>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: "40px 40px 24px",
      borderTop: "1px solid rgba(255,45,107,0.12)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "16px",
    }}>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", fontWeight: 700, color: "#ff2d6b", letterSpacing: "2px" }}>
        SHIELDHER
      </div>
      <div style={{ fontSize: "12px", letterSpacing: "1px", color: "rgba(240,192,216,0.35)", fontFamily: "'Rajdhani', sans-serif" }}>
        POWERING RESILIENCE · PROTECTING WOMEN · © 2025 SHIELDHER
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        {["Privacy", "Terms", "Contact"].map(l => (
          <a key={l} href="#" style={{ fontSize: "12px", letterSpacing: "1.5px", color: "rgba(240,192,216,0.45)", textDecoration: "none", fontFamily: "'Rajdhani', sans-serif", textTransform: "uppercase", transition: "color .2s" }}
          onMouseEnter={e => e.target.style.color = "#ff2d6b"}
          onMouseLeave={e => e.target.style.color = "rgba(240,192,216,0.45)"}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ position: "relative", minHeight: "100vh", background: "#0a0010" }}>
        <PinkParticlesBG />
        <Navbar onNav={() => {}} />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Features />
          <CinematicDemo />
          <Methods />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
