"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitState = {
  tone: "idle" | "success" | "error";
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitState>({
    tone: "idle",
    message: "",
  });

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ tone: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as SubmitState;

      setStatus({
        tone: data.tone ?? (response.ok ? "success" : "error"),
        message:
          data.message ||
          "Die Nachricht konnte gerade nicht verarbeitet werden.",
      });

      if (response.ok) {
        setForm(initialFormState);
      }
    } catch {
      setStatus({
        tone: "error",
        message:
          "Die Verbindung konnte nicht aufgebaut werden. Bitte versuche es gleich erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-section__glow contact-section__glow--violet" />
      <div className="contact-section__glow contact-section__glow--cyan" />

      <div className="contact-section__inner">
        <div className="contact-section__copy">
          <p className="contact-section__eyebrow">Kontakt</p>
          <h2 id="contact-heading">Bereit für smarte Automation?</h2>
          <p>
            Schreib uns direkt oder buche dein kostenloses Gespräch - ein
            offener Austausch ohne Verpflichtungen.
          </p>
        </div>

        <form className="contact-card" onSubmit={handleSubmit}>
          <div className="contact-card__header">
            <span className="contact-card__spark" aria-hidden="true" />
            <h3>Kontakt aufnehmen</h3>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Dein Name"
              value={form.name}
              onChange={updateField("name")}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">E-Mail</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="dein.name@firma.de"
              value={form.email}
              onChange={updateField("email")}
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Nachricht</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Erzähl uns kurz, wobei wir helfen können."
              value={form.message}
              onChange={updateField("message")}
              required
              rows={6}
            />
          </div>

          <button className="contact-submit" type="submit" disabled={isSubmitting}>
            <span>{isSubmitting ? "Wird vorbereitet..." : "Nachricht senden"}</span>
            <span aria-hidden="true">→</span>
          </button>

          <p className="contact-card__note">
            Wir melden uns persönlich zurück. Keine automatisierten Sales-Mails,
            kein Druck.
          </p>

          {status.message ? (
            <p className={`contact-status contact-status--${status.tone}`}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
