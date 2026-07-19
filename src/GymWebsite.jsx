import React, { useEffect, useRef, useState, useCallback, useContext, createContext } from "react";
import {
  Dumbbell, Flame, TrendingUp, User, Zap, Activity, HeartPulse, Users,
  Wind, Music2, Salad, Sparkles, Trophy, Briefcase, HeartHandshake,
  Award, Clock3, CalendarCheck, ShieldCheck, ShowerHead, Thermometer,
  Car, ShoppingBag, DoorClosed, Star, ChevronDown, MapPin, Phone, Mail,
  Send, MessageCircle, Menu, X, ArrowRight, PlayCircle
} from "lucide-react";
import Modal from "./components/Modal";
import InquiryForm from "./components/InquiryForm";
import ContactForm from "./components/ContactForm";

/* ---------------------------------------------------------------------- */
/*  MODAL CONTEXT                                                          */
/*  Lets "Join Now" / "Book Free Trial" / "Get Started" / "Book             */
/*  Consultation" buttons anywhere on the page open the right modal form,   */
/*  pre-filled with context (plan name, trainer name) where relevant.       */
/* ---------------------------------------------------------------------- */

const ModalContext = createContext(() => {});
function useOpenModal() {
  return useContext(ModalContext);
}

/* ---------------------------------------------------------------------- */
/*  UTILITIES                                                              */
/* ---------------------------------------------------------------------- */

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="display">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/*  DATA                                                                   */
/* ---------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Plans", href: "#plans" },
  { label: "Services", href: "#services" },
  { label: "Trainers", href: "#trainers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const WHY_US = [
  { icon: Award, title: "Certified Trainers", desc: "Nationally certified coaches with real transformation track records." },
  { icon: Dumbbell, title: "Modern Equipment", desc: "Imported strength & cardio machines, serviced every month." },
  { icon: Salad, title: "Personalized Diet Plans", desc: "Nutrition mapped to your goals, body type and lifestyle." },
  { icon: Zap, title: "Strength Training", desc: "Progressive overload programs built by strength specialists." },
  { icon: CalendarCheck, title: "Flexible Membership Plans", desc: "Pause, upgrade or shift plans without penalty." },
  { icon: Users, title: "Group Classes", desc: "High-energy group sessions that keep motivation high." },
  { icon: HeartPulse, title: "Cardio Programs", desc: "Structured cardio blocks for fat loss and endurance." },
  { icon: Clock3, title: "24/7 Support", desc: "A coach or attendant is always one message away." },
];

const PLANS = [
  { name: "Basic", price: "999", tag: null, features: ["Gym Access", "Locker Access", "Cardio Area"] },
  { name: "Premium", price: "1999", tag: "Most Popular", features: ["Gym Access", "Personalized Diet Plan", "Group Classes", "Locker Access"] },
  { name: "Elite", price: "2999", tag: null, features: ["Personal Trainer", "Diet Consultation", "Progress Tracking", "Premium Equipment Access", "Priority Support"] },
];

const SERVICES = [
  { icon: Dumbbell, title: "Strength Training", desc: "Build raw power with structured compound lifting cycles." },
  { icon: Flame, title: "Weight Loss Programs", desc: "Metabolic conditioning plans engineered for fat loss." },
  { icon: TrendingUp, title: "Muscle Building Programs", desc: "Hypertrophy-focused splits for visible size gains." },
  { icon: User, title: "Personal Training", desc: "One-on-one coaching tailored entirely to you." },
  { icon: Zap, title: "CrossFit", desc: "High-intensity functional workouts, scaled to your level." },
  { icon: Activity, title: "Functional Training", desc: "Movement patterns that carry over to real life." },
  { icon: HeartPulse, title: "Cardio Training", desc: "Endurance and heart-health focused sessions." },
  { icon: Users, title: "Group Fitness Classes", desc: "Energetic, coach-led group workouts every day." },
  { icon: Wind, title: "Yoga", desc: "Flexibility, breath control and recovery-focused flow." },
  { icon: Music2, title: "Zumba", desc: "Dance-based cardio that never feels like a workout." },
  { icon: Salad, title: "Nutrition Planning", desc: "Macro-mapped meal plans built around your goals." },
  { icon: Sparkles, title: "Body Transformation Programs", desc: "12-week guided transformation journeys." },
  { icon: Trophy, title: "Athlete Conditioning", desc: "Sport-specific conditioning for competitive athletes." },
  { icon: Briefcase, title: "Corporate Fitness Programs", desc: "On-site wellness programs for teams and companies." },
  { icon: HeartHandshake, title: "Senior Fitness Programs", desc: "Low-impact strength and mobility for healthy ageing." },
];

const TRAINERS = [
  { name: "Arjun Rathore", role: "Strength Coach", exp: "9+ Years Experience", spec: "Powerlifting & Strength Systems", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop" },
  { name: "Priya Menon", role: "Fat Loss Expert", exp: "7+ Years Experience", spec: "Metabolic Conditioning", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop" },
  { name: "Karan Verma", role: "Nutrition Specialist", exp: "6+ Years Experience", spec: "Sports Nutrition & Diet Design", img: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=600&auto=format&fit=crop" },
  { name: "Simran Kaur", role: "CrossFit Coach", exp: "8+ Years Experience", spec: "Functional & CrossFit Training", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop" },
];

const FACILITIES = [
  { icon: Dumbbell, title: "Modern Equipment" },
  { icon: HeartPulse, title: "Cardio Zone" },
  { icon: Activity, title: "Weight Training Zone" },
  { icon: Zap, title: "Functional Training Area" },
  { icon: DoorClosed, title: "Locker Rooms" },
  { icon: ShowerHead, title: "Shower Area" },
  { icon: Thermometer, title: "Steam Room" },
  { icon: Car, title: "Parking" },
  { icon: ShoppingBag, title: "Supplement Counter" },
];

const GALLERY = [
  { title: "Weight Area", h: 320, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=700&auto=format&fit=crop" },
  { title: "Cardio Zone", h: 260, img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=700&auto=format&fit=crop" },
  { title: "Training Sessions", h: 300, img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=700&auto=format&fit=crop" },
  { title: "Group Classes", h: 240, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=700&auto=format&fit=crop" },
  { title: "Reception Area", h: 280, img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=700&auto=format&fit=crop" },
  { title: "Premium Equipment", h: 340, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=700&auto=format&fit=crop" },
];

const TRANSFORMATIONS = [
  { name: "Rohit Sharma", lost: "14 kg", duration: "5 months", story: "Went from tired and inactive to running his first 10K, with a completely rebuilt daily routine.", img: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?q=80&w=500&auto=format&fit=crop" },
  { name: "Ananya Iyer", lost: "10 kg", duration: "4 months", story: "Combined strength training with a personalised diet plan to build lasting, sustainable habits.", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=500&auto=format&fit=crop" },
  { name: "Vikram Nair", lost: "18 kg", duration: "6 months", story: "Rebuilt his fitness from scratch after a desk-bound decade, now training four days a week.", img: "https://images.unsplash.com/photo-1583500178690-f7fd8b3672cf?q=80&w=500&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  { name: "Neha Kapoor", rating: 5, text: "Lost 12kg in 4 months. Best fitness decision of my life." },
  { name: "Aditya Rao", rating: 5, text: "The trainers actually track your progress. It never feels generic." },
  { name: "Meera Joshi", rating: 5, text: "Clean equipment, zero waiting, and a diet plan that finally worked for me." },
  { name: "Sahil Khanna", rating: 4, text: "Group classes are the highlight of my week. Great energy, better results." },
];

const FAQS = [
  { q: "What is included in the membership fee?", a: "Every plan includes full gym floor access. Higher tiers add diet consultation, personal training and priority support — see the Membership Plans section for a full breakdown." },
  { q: "Are the trainers certified?", a: "Yes. All our trainers hold recognised strength & conditioning or nutrition certifications and are re-assessed annually." },
  { q: "Do you provide a customised diet plan?", a: "Premium and Elite members receive a diet plan built around their goals, food preferences and daily routine, reviewed monthly." },
  { q: "Can I try the gym before joining?", a: "Absolutely — book a free trial session using the form on this page and a trainer will walk you through the facility." },
  { q: "Can I pause or cancel my membership?", a: "Memberships can be paused for medical or travel reasons with prior notice. Speak to our front desk for the current policy." },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Members" },
  { value: 12, suffix: "", label: "Certified Trainers" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
];

const BMI_CATEGORIES = [
  { max: 18.5, label: "Underweight", color: "#5EC8FF" },
  { max: 25, label: "Normal", color: "#3ECF8E" },
  { max: 30, label: "Overweight", color: "#FF6B00" },
  { max: Infinity, label: "Obese", color: "#FF4444" },
];

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=" +
  encodeURIComponent("Hello, I would like to know more about your gym memberships.");

/* ---------------------------------------------------------------------- */
/*  SECTION HEADING                                                        */
/* ---------------------------------------------------------------------- */

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="heading-wrap">
      <Reveal style={{ height: "auto" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display heading-title">{title}</h2>
        {sub && <p className="heading-sub">{sub}</p>}
      </Reveal>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  NAVBAR                                                                 */
/* ---------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = useOpenModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container row between">
        <a href="#home" className="logo">
          <span className="logo-badge">
            <Dumbbell size={18} color="#000" strokeWidth={2.5} />
          </span>
          <span className="display logo-text">
            IRON<span>EDGE</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <button type="button" onClick={() => openModal("trial")} className="btn btn-primary nav-cta btn-sm">
          Book Free Trial <ArrowRight size={15} />
        </button>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openModal("trial");
            }}
            className="btn btn-primary"
          >
            Book Free Trial
          </button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/*  HERO                                                                   */
/* ---------------------------------------------------------------------- */

function Hero() {
  const openModal = useOpenModal();
  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop')" }}
      />
      <div className="hero-overlay-1" />
      <div className="hero-overlay-2" />
      <div className="hero-glow" />

      <div className="container hero-inner">
        <div>
          <Reveal style={{ height: "auto" }}>
            <span className="hero-badge">
              <span className="pulse-dot" /> The City&apos;s Most Advanced Fitness Center
            </span>
          </Reveal>

          <Reveal delay={100} style={{ height: "auto" }}>
            <h1 className="display hero-title">
              Transform Your Body.
              <br />
              <span className="accent">Transform</span> Your Life.
            </h1>
          </Reveal>

          <Reveal delay={200} style={{ height: "auto" }}>
            <p className="hero-sub">
              Join the city&apos;s most advanced fitness center with expert trainers, modern equipment, and
              personalized fitness programs.
            </p>
          </Reveal>

          <Reveal delay={300} style={{ height: "auto" }}>
            <div className="hero-actions">
              <button type="button" onClick={() => openModal("membership")} className="btn btn-primary">
                Join Now <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => openModal("trial")} className="btn btn-outline">
                <PlayCircle size={18} /> Book Free Trial
              </button>
            </div>
          </Reveal>

          <Reveal delay={450} style={{ height: "auto" }}>
            <div className="hero-stats">
              {[
                { v: 5000, s: "+", l: "Active Members" },
                { v: 12, s: "", l: "Elite Trainers" },
                { v: 10, s: "+", l: "Years Running" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="hero-stat-value"><Counter to={s.v} suffix={s.s} /></div>
                  <div className="hero-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="orb-wrap">
          <div className="orb">
            <div className="orb-glow" />
            <div className="orb-ring" />
            <div className="orb-ring-2" />
            <div className="orb-card-wrap">
              <div className="orb-card">
                <Dumbbell size={96} color="#FF6B00" strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  WHY CHOOSE US                                                          */
/* ---------------------------------------------------------------------- */

function WhyChooseUs() {
  return (
    <section className="section" id="why">
      <div className="container">
        <SectionHeading eyebrow="Why IronEdge" title="Built For Real Results" sub="Every part of the experience is designed to keep you consistent, coached, and progressing." />
        <div className="grid grid-4">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="feature-card">
                <div className="feature-icon"><item.icon size={22} /></div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  MEMBERSHIP PLANS                                                       */
/* ---------------------------------------------------------------------- */

function MembershipPlans() {
  const openModal = useOpenModal();
  return (
    <section id="plans" className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container">
        <SectionHeading eyebrow="Membership" title="Choose Your Plan" sub="Simple, transparent pricing built around how seriously you want to train." />
        <div className="grid grid-3">
          {PLANS.map((plan, i) => {
            const popular = plan.tag === "Most Popular";
            return (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`plan-card${popular ? " popular" : ""}`}>
                  {popular && <span className="plan-badge">Most Popular</span>}
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-row">
                    <span className="display plan-price">₹{plan.price}</span>
                    <span className="plan-period">/month</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((f) => (
                      <li key={f} className="plan-feature">
                        <span className="plan-check"><ShieldCheck size={12} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openModal("membership", { plan: plan.name })}
                    className={`btn ${popular ? "btn-primary" : "btn-ghost"}`}
                  >
                    Get Started
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  SERVICES                                                               */
/* ---------------------------------------------------------------------- */

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeading eyebrow="What We Offer" title="Comprehensive Fitness Services" sub="From strength to recovery — a program for every goal, age and ability." />
        <div className="grid grid-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 6) * 60}>
              <div className="service-card">
                <div className="service-icon"><s.icon size={20} /></div>
                <div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  BMI CALCULATOR                                                         */
/* ---------------------------------------------------------------------- */

function BmiCalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [animKey, setAnimKey] = useState(0);

  const calculate = useCallback(() => {
    const h = Number(height);
    const w = Number(weight);

    if (!h || !w || h < 100 || h > 250 || w < 25 || w > 300) {
      setError("Please enter a realistic height (100–250 cm) and weight (25–300 kg).");
      setResult(null);
      return;
    }

    setError("");
    const meters = h / 100;
    const bmi = w / (meters * meters);
    const cat = BMI_CATEGORIES.find((c) => bmi < c.max);
    setResult({ bmi: bmi.toFixed(1), cat });
    setAnimKey((k) => k + 1);
  }, [height, weight]);

  return (
    <section className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <SectionHeading eyebrow="Know Your Numbers" title="BMI Calculator" sub="A quick starting point before your first session." />
        <Reveal style={{ height: "auto" }}>
          <div className="bmi-card">
            <div className="bmi-form">
              <div>
                <div className="bmi-row-label"><span className="lab">Height</span><span className="val">{height} cm</span></div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bmi-slider"
                  aria-label="Height in centimetres"
                />
              </div>
              <div>
                <div className="bmi-row-label"><span className="lab">Weight</span><span className="val">{weight} kg</span></div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bmi-slider"
                  aria-label="Weight in kilograms"
                />
              </div>
              {error && (
                <div className="form-alert" role="alert" style={{ marginBottom: 0 }}>
                  {error}
                </div>
              )}
              <button onClick={calculate} className="btn btn-primary btn-block">Calculate BMI</button>
            </div>

            <div className="bmi-result" role="status" aria-live="polite">
              {result ? (
                <div key={animKey} className="bmi-result-content">
                  <div className="display bmi-value">{result.bmi}</div>
                  <div className="bmi-tag" style={{ color: result.cat.color, backgroundColor: `${result.cat.color}1A` }}>
                    {result.cat.label}
                  </div>
                  <p className="bmi-note">This is a general indicator only. Our trainers will build your real plan around a full body composition assessment.</p>
                </div>
              ) : (
                <p className="bmi-hint">Adjust the sliders and calculate to see your BMI and health category.</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  TRAINERS                                                               */
/* ---------------------------------------------------------------------- */

function Trainers() {
  const openModal = useOpenModal();
  return (
    <section id="trainers" className="section">
      <div className="container">
        <SectionHeading eyebrow="Meet The Team" title="Trained By The Best" sub="Coaches who plan, track and adjust every step of your journey." />
        <div className="grid grid-4">
          {TRAINERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div
                className="trainer-card"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientY - r.top - r.height / 2) / 14;
                  const y = (e.clientX - r.left - r.width / 2) / -14;
                  e.currentTarget.style.transform = `rotateX(${x}deg) rotateY(${y}deg) translateY(-6px)`;
                }}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "rotateX(0) rotateY(0) translateY(0)")}
              >
                <div className="trainer-img-wrap"><img src={t.img} alt={`${t.name}, ${t.role} at IronEdge Fitness`} loading="lazy" /></div>
                <div className="trainer-shade" />
                <div className="trainer-info">
                  <h3 className="trainer-name">{t.name}</h3>
                  <p className="trainer-role">{t.role}</p>
                  <p className="trainer-meta">{t.exp}</p>
                  <p className="trainer-meta">{t.spec}</p>
                  <button
                    type="button"
                    onClick={() => openModal("consultation", { trainer: t.name })}
                    className="btn btn-outline btn-sm trainer-cta"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  FACILITIES                                                             */
/* ---------------------------------------------------------------------- */

function Facilities() {
  return (
    <section className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container">
        <SectionHeading eyebrow="The Space" title="World-Class Facilities" />
        <div className="grid grid-5">
          {FACILITIES.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="facility-card">
                <div className="facility-icon"><f.icon size={20} /></div>
                <span className="facility-title">{f.title}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  GALLERY                                                                */
/* ---------------------------------------------------------------------- */

function Gallery() {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <SectionHeading eyebrow="Take A Look Inside" title="Gym Gallery" />
        <div className="gallery-columns">
          {GALLERY.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} style={{ height: "auto" }}>
              <div className="gallery-item">
                <img src={g.img} alt={g.title} style={{ height: g.h }} />
                <div className="gallery-caption"><span>{g.title}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  TRANSFORMATIONS                                                        */
/* ---------------------------------------------------------------------- */

function Transformations() {
  return (
    <section className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container">
        <SectionHeading eyebrow="Real Members, Real Results" title="Transformations" />
        <div className="grid grid-3">
          {TRANSFORMATIONS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="tf-card">
                <div className="tf-img"><img src={t.img} alt={t.name} /></div>
                <div className="tf-body">
                  <div className="tf-top">
                    <h3 className="tf-name">{t.name}</h3>
                    <span className="display tf-lost">-{t.lost}</span>
                  </div>
                  <p className="tf-story">{t.story}</p>
                  <span className="tf-duration">In {t.duration}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  TESTIMONIALS                                                           */
/* ---------------------------------------------------------------------- */

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Member Voices" title="What Our Members Say" />
        <div className="grid grid-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className="testi-card">
                <div className="testi-stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={14} color={idx < t.rating ? "#FF6B00" : "rgba(255,255,255,0.15)"} fill={idx < t.rating ? "#FF6B00" : "none"} />
                  ))}
                </div>
                <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
                <span className="testi-name">{t.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  STATISTICS BAND                                                        */
/* ---------------------------------------------------------------------- */

function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} style={{ height: "auto" }}>
            <div className="display stat-value"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  FINAL CTA BAND (opens the trial-booking modal)                        */
/* ---------------------------------------------------------------------- */

function CtaBand() {
  const openModal = useOpenModal();
  return (
    <section id="trial" className="section cta-band">
      <div className="container">
        <Reveal style={{ height: "auto" }}>
          <div className="cta-band-inner">
            <div>
              <span className="eyebrow">Get Started Today</span>
              <h2 className="display cta-band-title">Ready To Begin Your Transformation?</h2>
              <p className="cta-band-sub">
                Book a free trial session and a coach will walk you through the gym, no strings attached.
              </p>
            </div>
            <div className="cta-band-actions">
              <button type="button" onClick={() => openModal("trial")} className="btn btn-primary">
                Book Free Trial <Send size={16} />
              </button>
              <a href="#contact" className="btn btn-outline">Talk To Us</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  FAQ                                                                    */
/* ---------------------------------------------------------------------- */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50} style={{ height: "auto" }}>
                <div className="faq-item">
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="faq-q">
                    <span style={{ paddingRight: 16 }}>{f.q}</span>
                    <ChevronDown size={18} className={`faq-chev${isOpen ? " open" : ""}`} />
                  </button>
                  <div className="faq-a-wrap" style={{ maxHeight: isOpen ? 200 : 0 }}>
                    <p className="faq-a">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  CONTACT                                                                */
/* ---------------------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact" className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container">
        <SectionHeading eyebrow="Visit Us" title="Get In Touch" />
        <div className="grid grid-2">
          <Reveal>
            <div>
              <div className="contact-card" style={{ marginBottom: 24 }}>
                <div className="contact-row">
                  <MapPin size={20} aria-hidden="true" />
                  <div><h4>Address</h4><p>12 MG Road, Near City Centre, Bhopal, Madhya Pradesh 462001</p></div>
                </div>
                <div className="contact-row">
                  <Phone size={20} aria-hidden="true" />
                  <div><h4>Phone</h4><p><a href="tel:+919999999999" style={{ color: "inherit", textDecoration: "none" }}>+91 99999 99999</a></p></div>
                </div>
                <div className="contact-row">
                  <Mail size={20} aria-hidden="true" />
                  <div><h4>Email</h4><p><a href="mailto:hello@ironedgefitness.com" style={{ color: "inherit", textDecoration: "none" }}>hello@ironedgefitness.com</a></p></div>
                </div>
                <div className="contact-row">
                  <Clock3 size={20} aria-hidden="true" />
                  <div><h4>Working Hours</h4><p>Mon – Sat: 5:00 AM – 11:00 PM<br />Sunday: 6:00 AM – 9:00 PM</p></div>
                </div>
              </div>
              <div className="map-card">
                <div className="map-glow" />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <MapPin size={30} color="#FF6B00" style={{ margin: "0 auto 12px" }} aria-hidden="true" />
                  <p style={{ color: "var(--muted2)", fontSize: 14 }}>Google Map embed placeholder</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="contact-card">
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Send Us a Message</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  FOOTER                                                                 */
/* ---------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: 16 }}>
            <span className="logo-badge"><Dumbbell size={18} color="#000" strokeWidth={2.5} /></span>
            <span className="display logo-text">IRON<span>EDGE</span></span>
          </div>
          <p className="footer-desc">A premium strength & fitness club built for people serious about lasting transformation.</p>
        </div>
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            {SERVICES.slice(0, 5).map((s) => <li key={s.title}>{s.title}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-row">
            {["Instagram", "Facebook", "YouTube"].map((s) => (
              <a key={s} href="#" className="social-btn">{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} IronEdge Fitness Club. All rights reserved.</p>
        <p>Designed &amp; built for a premium fitness experience.</p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/*  WHATSAPP FLOATING BUTTON                                               */
/* ---------------------------------------------------------------------- */

function WhatsAppButton() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </a>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT APP                                                               */
/* ---------------------------------------------------------------------- */

export default function GymWebsite() {
  const [modalState, setModalState] = useState({ type: null, context: {} });

  const openModal = useCallback((type, context = {}) => {
    setModalState({ type, context });
  }, []);
  const closeModal = useCallback(() => setModalState({ type: null, context: {} }), []);

  return (
    <ModalContext.Provider value={openModal}>
      <div className="ie-root">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <WhyChooseUs />
          <MembershipPlans />
          <Services />
          <BmiCalculator />
          <Trainers />
          <Facilities />
          <Gallery />
          <Transformations />
          <TestimonialsWrapper />
          <StatsBand />
          <CtaBand />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />

        <Modal
          open={!!modalState.type}
          onClose={closeModal}
          title={modalState.type ? MODAL_TITLES[modalState.type] : ""}
        >
          {modalState.type && <InquiryForm type={modalState.type} context={modalState.context} />}
        </Modal>
      </div>
    </ModalContext.Provider>
  );
}

const MODAL_TITLES = {
  trial: "Book Your Free Trial",
  membership: "Membership Inquiry",
  consultation: "Book a Consultation",
};

function TestimonialsWrapper() {
  return <Testimonials />;
}
