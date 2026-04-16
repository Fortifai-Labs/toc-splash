import WaitlistForm from "./WaitlistForm";

const BASE_URL = import.meta.env.BASE_URL;

const C = {
  navy: "#0D1B2A",
  ocean: "#1B4965",
  current: "#5FA8D3",
  seafoam: "#BEE9E8",
  white: "#FFFFFF",
  muted: "#64748b",
  onDarkMuted: "#cbd5e1",
  onDarkFine: "#94a3b8",
};

export default function SplashPage() {
  const logoSrc = `${BASE_URL}TOC%203.svg`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.white,
        color: C.navy,
        fontFamily:
          "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          right: "-12%",
          width: 640,
          height: 640,
          background:
            "radial-gradient(circle, rgba(95,168,211,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: 540,
          height: 540,
          background:
            "radial-gradient(circle, rgba(190,233,232,0.35) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 920,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          <img
            src={logoSrc}
            alt="The Outcome Co."
            style={{ height: 160, width: "auto", maxWidth: "90%" }}
          />

          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.current,
                textTransform: "uppercase",
                letterSpacing: 3,
                display: "block",
                marginBottom: 16,
              }}
            >
              Coming soon
            </span>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: C.navy,
                margin: 0,
              }}
            >
              You don't want another tool.
              <br />
              <span style={{ color: C.current }}>You want the thing done.</span>
            </h1>
          </div>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: C.muted,
              lineHeight: 1.7,
              maxWidth: 620,
              margin: 0,
            }}
          >
            Tell us the outcome you're after: a hired team, a launched store,
            a tax package, a finished manuscript, a 12-week health plan. We
            deliver it. Finished. On time. At a price you agree to before we
            start.
          </p>

          <p
            style={{
              fontSize: 15,
              color: C.ocean,
              fontWeight: 600,
              margin: 0,
            }}
          >
            No tokens. No surprise bills. No "figure it out yourself."
          </p>

          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 12 }}>
            <WaitlistForm />
          </div>
        </div>
      </main>

      <footer
        style={{
          padding: "28px 24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: 12, color: C.onDarkFine, margin: 0 }}>
          &copy; 2026 The Outcome Co.
        </p>
      </footer>
    </div>
  );
}
