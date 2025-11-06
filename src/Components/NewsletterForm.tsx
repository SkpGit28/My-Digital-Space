"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { isEmail } from "@/lib/validators";

type Props = {
  successMsg?: string;
  errorMsg?: string;
  onSubmit?: (email: string) => Promise<boolean>;
};

export default function NewsletterForm({
  successMsg = "Thanks! Please check your inbox.",
  errorMsg = "Something went wrong. Please try again.",
}: Props) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");  // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }

    if (nickname) {
      // Honeypot filled - silently succeed
      setStatus("success");
      setMessage(successMsg);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nickname }),
      });
      const data = await res.json();
      
      if (data.ok) {
        setStatus("success");
        setMessage(successMsg);
        track("newsletter_submit", { 
          email_hash: await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email))
            .then(hash => Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("")),
          success: true 
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus("error");
      setMessage(errorMsg);
      track("newsletter_submit", { success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <h3 className="text-xl font-semibold mb-2">Get short, useful UX notes.</h3>
      <p className="text-muted mb-4">No spam. Unsubscribe anytime.</p>
      
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
            aria-invalid={status === "error"}
            aria-describedby={status !== "idle" ? "newsletter-message" : undefined}
            className="w-full px-4 py-2 rounded-md border border-border bg-bg text-fg placeholder:text-muted focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50"
          />
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="hidden">
          <input
            type="text"
            name="nickname"
            tabIndex={-1}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-2 bg-brand text-white font-medium rounded-md hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
        </button>
      </div>

      {status !== "idle" && (
        <p
          id="newsletter-message"
          className={`mt-2 text-sm ${status === "error" ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
