import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";

/**
 * EmailJS setup (one-time, ~5 minutes):
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (e.g. Gmail) — copy the Service ID
 * 3. Create an Email Template with variables: from_name, from_email, message — copy the Template ID
 * 4. Account → General → copy your Public Key
 * 5. Create a `.env` file in the project root with:
 *      VITE_EMAILJS_SERVICE_ID=your_service_id
 *      VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *      VITE_EMAILJS_PUBLIC_KEY=your_public_key
 *    (Vite exposes these as import.meta.env.VITE_*)
 * 6. Restart `npm run dev` after adding the .env file.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Keeps the UI honest in a fresh checkout before EmailJS keys are added,
      // instead of pretending to send an email it can't actually send.
      setStatus("error");
      console.warn(
        "EmailJS is not configured yet — add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to a .env file. See ContactForm.jsx for setup steps."
      );
      return;
    }

    setStatus("loading");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <div className="success-icon"><ShieldCheck size={28} color="#FF6B00" /></div>
        <h4 className="inquiry-success-title">Message sent, {form.name.split(" ")[0]}!</h4>
        <p className="inquiry-success-body">Thanks for reaching out — our team will get back to you at {form.email} within 24 hours.</p>
        <button type="button" onClick={reset} className="btn btn-ghost btn-sm">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="contact-form">
      <div className="field">
        <label htmlFor="contact-name">Full Name</label>
        <input
          id="contact-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Rahul Sharma"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="e.g. rahul@email.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?"
          rows={4}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      {status === "error" && (
        <div className="form-alert" role="alert">
          <AlertTriangle size={16} />
          Couldn't send your message right now. Please try again, or reach us on WhatsApp.
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 size={16} className="spin" /> Sending...</>
        ) : (
          <>Send Message <Send size={16} /></>
        )}
      </button>
    </form>
  );
}
