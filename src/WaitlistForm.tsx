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
  buttonLabel = "Join the Waitlist",
}: {
  variant?: "light" | "dark";
  buttonLabel?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [desiredOutcomes, setDesiredOutcomes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !firstName || !lastName) return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          desiredOutcomes,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFirstName("");
        setLastName("");
        setEmail("");
        setDesiredOutcomes("");
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

  const fieldLabelStyle: CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: onDark ? C.seafoam : C.navy,
    marginBottom: 6,
    textAlign: "left",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 15,
    borderRadius: 10,
    border: onDark ? "1px solid rgba(190,233,232,0.25)" : `1px solid ${C.line}`,
    background: onDark ? "rgba(255,255,255,0.06)" : C.white,
    color: onDark ? C.white : C.navy,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const textareaStyle: CSSProperties = {
    ...inputStyle,
    minHeight: 96,
    resize: "vertical",
    lineHeight: 1.5,
  };

  const btnStyle: CSSProperties = {
    width: "100%",
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
          maxWidth: 560,
          textAlign: "left",
        }}
      >
        <strong>You're on the list.</strong> We'll be in touch when we open
        access.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", maxWidth: 560, textAlign: "left" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <label>
          <span style={fieldLabelStyle}>First name</span>
          <input
            type="text"
            name="firstName"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={status === "submitting"}
            style={inputStyle}
          />
        </label>
        <label>
          <span style={fieldLabelStyle}>Last name</span>
          <input
            type="text"
            name="lastName"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={status === "submitting"}
            style={inputStyle}
          />
        </label>
      </div>

      <label style={{ display: "block", marginBottom: 12 }}>
        <span style={fieldLabelStyle}>Email address</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          style={inputStyle}
        />
      </label>

      <label style={{ display: "block", marginBottom: 16 }}>
        <span style={fieldLabelStyle}>
          Desired outcomes{" "}
          <span style={{ color: labelColor, fontWeight: 400 }}>(optional)</span>
        </span>
        <textarea
          name="desiredOutcomes"
          placeholder="What would you like us to deliver? A launched store, a hired team, a finished manuscript, a 12-week health plan…"
          value={desiredOutcomes}
          onChange={(e) => setDesiredOutcomes(e.target.value)}
          disabled={status === "submitting"}
          style={textareaStyle}
        />
      </label>

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

      <p
        style={{
          marginTop: 12,
          fontSize: 12,
          color: labelColor,
          lineHeight: 1.6,
        }}
      >
        We'll only use your email to send you product updates. No spam.
        One-click unsubscribe.
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
