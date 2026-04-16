import { useState, type CSSProperties, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqaevwn";

const C = {
  navy: "#0D1B2A",
  ocean: "#1B4965",
  current: "#5FA8D3",
  seafoam: "#BEE9E8",
  white: "#FFFFFF",
  line: "#e2e8f0",
  muted: "#64748b",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm({
  variant = "light",
  layout = "row",
  buttonLabel = "Join the Waitlist",
}: {
  variant?: "light" | "dark";
  layout?: "row" | "stack";
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        errors?: { message?: string }[];
      };
      setError(data.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  const onDark = variant === "dark";
  const labelColor = onDark ? C.seafoam : C.muted;
  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    borderRadius: 10,
    border: onDark ? "1px solid rgba(190,233,232,0.25)" : `1px solid ${C.line}`,
    background: onDark ? "rgba(255,255,255,0.06)" : C.white,
    color: onDark ? C.white : C.navy,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };
  const btnStyle: CSSProperties = {
    padding: "14px 26px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 10,
    border: "none",
    background: status === "submitting" ? C.ocean : C.current,
    color: C.white,
    cursor: status === "submitting" ? "not-allowed" : "pointer",
    transition: "transform 0.2s, background 0.2s",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  };

  if (status === "success") {
    return (
      <div
        role="status"
        style={{
          padding: "20px 22px",
          borderRadius: 12,
          background: onDark ? "rgba(190,233,232,0.1)" : "#f0fdf4",
          border: onDark
            ? "1px solid rgba(190,233,232,0.35)"
            : "1px solid #bbf7d0",
          color: onDark ? C.seafoam : "#166534",
          fontSize: 15,
          lineHeight: 1.6,
          maxWidth: 520,
        }}
      >
        <strong>You're on the list.</strong> We'll be in touch when we open
        access.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 560 }}>
      <div
        style={{
          display: "flex",
          flexDirection: layout === "stack" ? "column" : "row",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          style={{ ...inputStyle, flex: "2 1 220px", minWidth: 200 }}
        />
        <input
          type="text"
          name="name"
          placeholder="First name (optional)"
          aria-label="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "submitting"}
          style={{ ...inputStyle, flex: "1 1 160px", minWidth: 140 }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          style={btnStyle}
          onMouseEnter={(e) => {
            if (status !== "submitting")
              e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {status === "submitting" ? "Joining…" : buttonLabel}
        </button>
      </div>
      <p
        style={{
          marginTop: 10,
          fontSize: 12,
          color: labelColor,
          lineHeight: 1.6,
        }}
      >
        We'll only use your email to send you product updates. No spam. One-click
        unsubscribe.
      </p>
      {error && (
        <p
          role="alert"
          style={{
            marginTop: 10,
            fontSize: 14,
            color: onDark ? "#fca5a5" : "#b91c1c",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
