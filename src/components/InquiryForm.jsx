import React, { useEffect, useState } from "react";
import { ShieldCheck, Send, AlertTriangle, Loader2 } from "lucide-react";

const PLAN_OPTIONS = ["Not sure yet", "Basic", "Premium", "Elite"];

const COPY = {
  trial: {
    title: "Book Your Free Trial",
    subtitle: "Tell us a little about you — a trainer will confirm your slot within the day.",
    submitLabel: "Book Free Trial",
    successTitle: (name) => `You're all set, ${name}!`,
    successBody: (form) =>
      `We've received your request for the ${form.plan} plan and will call ${form.phone} shortly to confirm your free trial.`,
  },
  membership: {
    title: "Membership Inquiry",
    subtitle: "Pick the plan you're interested in and we'll walk you through pricing and availability.",
    submitLabel: "Send Inquiry",
    successTitle: (name) => `Thanks, ${name}!`,
    successBody: (form) =>
      `Your inquiry for the ${form.plan} plan has been received. Our membership team will call ${form.phone} within the day.`,
  },
  consultation: {
    title: "Book a Consultation",
    subtitle: "Get matched with the right trainer for your goals.",
    submitLabel: "Request Consultation",
    successTitle: (name) => `Great, ${name} — you're on the schedule.`,
    successBody: (form) =>
      `Your consultation request${form.trainer ? ` with ${form.trainer}` : ""} has been received. We'll call ${form.phone} to lock in a time.`,
  },
};

/**
 * type: "trial" | "membership" | "consultation"
 * context: { plan?: string, trainer?: string } — pre-fills relevant field
 * This is a demo-grade "submit": it validates properly and shows real
 * loading/success/error states, but simulates the network call rather than
 * hitting a real backend (per project scope — no server, no database).
 * Swap `fakeSubmit` for a real fetch()/API call when a backend exists.
 */
export default function InquiryForm({ type = "trial", context = {}, firstFieldRef }) {
  const copy = COPY[type];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    goal: "",
    plan: context.plan || "Not sure yet",
    trainer: context.trainer || "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    if (context.plan) setForm((f) => ({ ...f, plan: context.plan }));
    if (context.trainer) setForm((f) => ({ ...f, trainer: context.trainer }));
  }, [context.plan, context.trainer]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number.";
    return next;
  };

  const fakeSubmit = () =>
    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        // Simulated failure path so the error state is real, reachable code —
        // not just a decorative div. Replace this whole function with a real
        // API call (fetch/EmailJS/etc.) when wiring up a backend.
        if (form.phone.trim() === "0000000000") {
          reject(new Error("network"));
        } else {
          resolve();
        }
      }, 1100);
    });

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      await fakeSubmit();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setForm({ name: "", phone: "", goal: "", plan: "Not sure yet", trainer: context.trainer || "" });
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <div className="success-icon"><ShieldCheck size={28} color="#FF6B00" /></div>
        <h4 className="inquiry-success-title">{copy.successTitle(form.name.split(" ")[0])}</h4>
        <p className="inquiry-success-body">{copy.successBody(form)}</p>
        <button type="button" onClick={reset} className="btn btn-ghost btn-sm">Submit another request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {copy.subtitle && <p className="modal-subtitle" style={{ marginTop: -4, marginBottom: 20 }}>{copy.subtitle}</p>}

      <div className="field">
        <label htmlFor={`${type}-name`}>Full Name</label>
        <input
          id={`${type}-name`}
          ref={firstFieldRef}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Rahul Sharma"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${type}-name-error` : undefined}
        />
        {errors.name && <span id={`${type}-name-error`} className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor={`${type}-phone`}>Phone Number</label>
        <input
          id={`${type}-phone`}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="e.g. 98765 43210"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${type}-phone-error` : undefined}
        />
        {errors.phone && <span id={`${type}-phone-error`} className="field-error">{errors.phone}</span>}
      </div>

      {(type === "trial" || type === "membership") && (
        <div className="field">
          <label htmlFor={`${type}-plan`}>Membership Plan</label>
          <select
            id={`${type}-plan`}
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
            className="trial-select"
          >
            {PLAN_OPTIONS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      )}

      {type === "consultation" && (
        <div className="field">
          <label htmlFor={`${type}-trainer`}>Preferred Trainer (optional)</label>
          <input
            id={`${type}-trainer`}
            value={form.trainer}
            onChange={(e) => setForm({ ...form, trainer: e.target.value })}
            placeholder="e.g. Arjun Rathore"
          />
        </div>
      )}

      <div className="field">
        <label htmlFor={`${type}-goal`}>Fitness Goal (optional)</label>
        <input
          id={`${type}-goal`}
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          placeholder="e.g. Weight loss, muscle gain, general fitness"
        />
      </div>

      {status === "error" && (
        <div className="form-alert" role="alert">
          <AlertTriangle size={16} />
          Something went wrong sending your request. Please try again, or WhatsApp us directly.
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="spin" /> Sending...
          </>
        ) : (
          <>
            {copy.submitLabel} <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
