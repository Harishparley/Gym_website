import React, { useEffect, useRef, useState, useCallback, useContext, createContext } from "react";
import {
  Dumbbell, Flame, TrendingUp, User, Zap, Activity, HeartPulse, Users,
  Wind, Music2, Salad, Sparkles, Trophy, Briefcase, HeartHandshake,
  Award, Clock3, CalendarCheck, ShieldCheck, ShowerHead, Thermometer,
  Car, ShoppingBag, DoorClosed, Star, ChevronDown, MapPin, Phone, Mail,
  Send, MessageCircle, Menu, X, ArrowRight, PlayCircle
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  GLOBAL STYLES — plain CSS, no Tailwind arbitrary-value dependence      */
/* ---------------------------------------------------------------------- */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap');

      :root{
        --bg:#0A0A0A;
        --panel:#141414;
        --panel-soft:#0D0D0D;
        --line: rgba(255,255,255,0.10);
        --line-strong: rgba(255,255,255,0.22);
        --text:#FFFFFF;
        --muted: rgba(255,255,255,0.55);
        --muted2: rgba(255,255,255,0.38);
        --accent:#FF6B00;
        --accent-soft: rgba(255,107,0,0.12);
        --accent-glow: rgba(255,107,0,0.35);
      }

      .ie-root{
        background:var(--bg);
        color:var(--text);
        font-family:'Inter',system-ui,sans-serif;
        min-height:100vh;
        -webkit-font-smoothing:antialiased;
      }
      .ie-root *{ box-sizing:border-box; }
      .ie-root ::selection{ background:var(--accent); color:#000; }
      html{ scroll-behavior:smooth; }
      ::-webkit-scrollbar{ width:8px; }
      ::-webkit-scrollbar-track{ background:var(--bg); }
      ::-webkit-scrollbar-thumb{ background:var(--accent); border-radius:4px; }

      .display{ font-family:'Anton',sans-serif; text-transform:uppercase; letter-spacing:0.5px; }
      .container{ max-width:1280px; margin:0 auto; padding:0 24px; }
      .section{ padding:112px 0; }
      .section-tight{ padding:80px 0; }

      /* ---------- generic layout helpers ---------- */
      .row{ display:flex; align-items:center; }
      .between{ justify-content:space-between; }
      .center{ justify-content:center; }
      .wrap{ flex-wrap:wrap; }
      .gap-sm{ gap:10px; } .gap-md{ gap:20px; } .gap-lg{ gap:36px; }

      .grid{ display:grid; gap:24px; }
      .grid-2{ grid-template-columns:repeat(2,1fr); }
      .grid-3{ grid-template-columns:repeat(3,1fr); }
      .grid-4{ grid-template-columns:repeat(4,1fr); }
      .grid-5{ grid-template-columns:repeat(5,1fr); }
      @media (max-width:980px){
        .grid-3, .grid-4, .grid-5{ grid-template-columns:repeat(2,1fr); }
      }
      @media (max-width:640px){
        .grid-2, .grid-3, .grid-4, .grid-5{ grid-template-columns:1fr; }
      }

      /* ---------- section heading ---------- */
      .eyebrow{
        display:inline-block; font-size:11px; letter-spacing:3px; text-transform:uppercase;
        color:var(--accent); font-weight:700; margin-bottom:12px;
      }
      .heading-wrap{ max-width:640px; margin:0 auto 56px; text-align:center; }
      .heading-title{ font-size:34px; line-height:1.05; color:var(--text); }
      .heading-sub{ margin-top:16px; color:var(--muted); font-size:16px; }
      @media (min-width:768px){ .heading-title{ font-size:48px; } }

      /* ---------- reveal ---------- */
      .reveal{ transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }

      /* ---------- buttons ---------- */
      .btn{
        display:inline-flex; align-items:center; justify-content:center; gap:8px;
        font-weight:600; border-radius:999px; border:none; cursor:pointer;
        text-decoration:none; transition:all .3s ease; font-family:inherit; font-size:15px;
      }
      .btn-primary{ background:var(--accent); color:#000; padding:14px 30px; }
      .btn-primary:hover{ background:#fff; box-shadow:0 0 40px var(--accent-glow); }
      .btn-outline{ background:transparent; color:var(--text); border:1px solid var(--line-strong); padding:14px 30px; }
      .btn-outline:hover{ border-color:#fff; background:rgba(255,255,255,0.06); }
      .btn-sm{ padding:10px 20px; font-size:14px; }
      .btn-block{ width:100%; padding:16px; }
      .btn-ghost{ background:rgba(255,255,255,0.05); color:var(--text); border:1px solid var(--line-strong); }
      .btn-ghost:hover{ background:rgba(255,255,255,0.1); }

      /* ---------- navbar ---------- */
      .navbar{ position:fixed; top:0; left:0; right:0; z-index:50; padding:24px 0; transition:all .4s ease; background:transparent; }
      .navbar.scrolled{ background:rgba(10,10,10,0.92); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); padding:12px 0; }
      .logo{ display:flex; align-items:center; gap:8px; text-decoration:none; }
      .logo-badge{ width:36px; height:36px; border-radius:999px; background:var(--accent); display:flex; align-items:center; justify-content:center; }
      .logo-text{ font-size:18px; color:var(--text); }
      .logo-text span{ color:var(--accent); }
      .nav-links{ display:none; gap:36px; }
      .nav-link{ color:rgba(255,255,255,0.7); text-decoration:none; font-size:14px; transition:color .2s; }
      .nav-link:hover{ color:#fff; }
      .nav-cta{ display:none; }
      .nav-toggle{ background:none; border:none; color:#fff; cursor:pointer; display:flex; }
      @media (min-width:900px){
        .nav-links{ display:flex; }
        .nav-cta{ display:inline-flex; }
        .nav-toggle{ display:none; }
      }
      .mobile-menu{ background:var(--bg); border-top:1px solid var(--line); padding:24px; display:flex; flex-direction:column; gap:18px; }
      .mobile-menu a{ color:rgba(255,255,255,0.85); text-decoration:none; font-size:16px; }

      /* ---------- hero ---------- */
      .hero{ position:relative; min-height:100vh; display:flex; align-items:center; padding:130px 0 80px; overflow:hidden; background:var(--bg); }
      .hero-bg{ position:absolute; inset:0; background-size:cover; background-position:center; }
      .hero-overlay-1{ position:absolute; inset:0; background:linear-gradient(to bottom, rgba(10,10,10,0.82), rgba(10,10,10,0.88) 60%, var(--bg) 100%); }
      .hero-overlay-2{ position:absolute; inset:0; background:linear-gradient(to right, var(--bg) 0%, rgba(10,10,10,0.35) 55%, transparent 100%); }
      .hero-glow{ position:absolute; top:-140px; right:-60px; width:520px; height:520px; background:var(--accent-soft); border-radius:999px; filter:blur(120px); }
      .hero-inner{ position:relative; z-index:2; display:grid; grid-template-columns:1fr; gap:60px; align-items:center; }
      @media (min-width:1024px){ .hero-inner{ grid-template-columns:1.15fr 0.85fr; } }
      .hero-badge{
        display:inline-flex; align-items:center; gap:8px; font-size:11px; letter-spacing:3px; text-transform:uppercase;
        color:var(--accent); font-weight:700; border:1px solid rgba(255,107,0,0.35); border-radius:999px;
        padding:8px 18px; margin-bottom:30px;
      }
      .pulse-dot{ width:6px; height:6px; border-radius:999px; background:var(--accent); animation:pulse-dot 1.6s infinite; }
      @keyframes pulse-dot{ 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      .hero-title{ font-size:44px; line-height:0.97; color:#fff; }
      .hero-title .accent{ color:var(--accent); }
      @media (min-width:640px){ .hero-title{ font-size:58px; } }
      @media (min-width:1024px){ .hero-title{ font-size:70px; } }
      .hero-sub{ margin-top:26px; color:var(--muted); font-size:18px; max-width:520px; line-height:1.6; }
      .hero-actions{ margin-top:38px; display:flex; flex-wrap:wrap; gap:16px; }
      .hero-stats{ margin-top:54px; display:flex; flex-wrap:wrap; gap:44px; }
      .hero-stat-value{ font-size:30px; color:#fff; }
      .hero-stat-label{ font-size:12px; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted2); margin-top:4px; }

      /* hero signature 3D element */
      .orb-wrap{ display:none; position:relative; justify-content:center; align-items:center; }
      @media (min-width:1024px){ .orb-wrap{ display:flex; } }
      .orb{ position:relative; width:340px; height:340px; }
      .orb-glow{ position:absolute; inset:0; border-radius:999px; background:var(--accent-soft); filter:blur(80px); }
      .orb-ring{ position:absolute; inset:0; border-radius:999px; border:1px solid var(--line); animation:spin-slow 18s linear infinite; }
      .orb-ring-2{ position:absolute; inset:32px; border-radius:999px; border:1px solid rgba(255,107,0,0.25); animation:spin-slow-rev 14s linear infinite; }
      .orb-card-wrap{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; animation:float-y 5s ease-in-out infinite; }
      .orb-card{
        background:linear-gradient(160deg,#242424,#0A0A0A); border:1px solid var(--line); border-radius:32px;
        padding:48px; box-shadow:0 30px 80px rgba(0,0,0,0.6); animation:tilt-3d 6s ease-in-out infinite;
      }
      @keyframes float-y{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }
      @keyframes tilt-3d{ 0%,100%{transform:rotate3d(1,1,0,0deg);} 50%{transform:rotate3d(1,1,0,6deg);} }
      @keyframes spin-slow{ from{transform:rotate(0);} to{transform:rotate(360deg);} }
      @keyframes spin-slow-rev{ from{transform:rotate(360deg);} to{transform:rotate(0);} }

      /* ---------- feature / why-us cards ---------- */
      .feature-card{
        height:100%; background:linear-gradient(to bottom, rgba(255,255,255,0.04), transparent);
        border:1px solid var(--line); border-radius:18px; padding:28px; transition:all .45s ease;
      }
      .feature-card:hover{ border-color:rgba(255,107,0,0.4); transform:translateY(-8px); box-shadow:0 20px 50px rgba(255,107,0,0.12); }
      .feature-icon{ width:48px; height:48px; border-radius:12px; background:var(--accent-soft); display:flex; align-items:center; justify-content:center; margin-bottom:20px; transition:background .4s; }
      .feature-card:hover .feature-icon{ background:var(--accent); }
      .feature-icon svg{ color:var(--accent); transition:color .4s; }
      .feature-card:hover .feature-icon svg{ color:#000; }
      .feature-title{ font-size:18px; font-weight:600; margin-bottom:8px; }
      .feature-desc{ color:var(--muted2); font-size:14px; line-height:1.6; }

      /* ---------- plans ---------- */
      .plan-card{
        height:100%; display:flex; flex-direction:column; background:var(--panel); border:1px solid var(--line);
        border-radius:24px; padding:36px; position:relative; transition:all .45s ease;
      }
      .plan-card:hover{ transform:translateY(-10px); border-color:var(--line-strong); }
      .plan-card.popular{
        background:linear-gradient(to bottom, rgba(255,107,0,0.15), var(--panel));
        border:2px solid var(--accent); box-shadow:0 30px 70px rgba(255,107,0,0.18);
      }
      @media (min-width:768px){ .plan-card.popular{ transform:scale(1.05); } .plan-card.popular:hover{ transform:scale(1.05) translateY(-10px); } }
      .plan-badge{ position:absolute; top:-16px; left:50%; transform:translateX(-50%); background:var(--accent); color:#000; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; padding:6px 16px; border-radius:999px; }
      .plan-name{ color:var(--muted); text-transform:uppercase; letter-spacing:2px; font-size:12px; font-weight:700; margin-bottom:16px; }
      .plan-price-row{ display:flex; align-items:flex-end; gap:4px; margin-bottom:32px; }
      .plan-price{ font-size:44px; color:#fff; }
      .plan-period{ color:var(--muted2); margin-bottom:6px; }
      .plan-features{ list-style:none; margin:0 0 40px; padding:0; flex:1; display:flex; flex-direction:column; gap:14px; }
      .plan-feature{ display:flex; align-items:center; gap:12px; color:rgba(255,255,255,0.75); font-size:14px; }
      .plan-check{ width:20px; height:20px; border-radius:999px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:rgba(255,255,255,0.1); color:var(--accent); }
      .plan-card.popular .plan-check{ background:var(--accent); color:#000; }

      /* ---------- services ---------- */
      .service-card{
        display:flex; align-items:flex-start; gap:16px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
        border-radius:18px; padding:24px; transition:all .35s ease;
      }
      .service-card:hover{ background:rgba(255,107,0,0.06); border-color:rgba(255,107,0,0.3); }
      .service-icon{ width:44px; height:44px; border-radius:10px; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .35s; }
      .service-card:hover .service-icon{ background:var(--accent); }
      .service-icon svg{ color:var(--accent); transition:color .35s; }
      .service-card:hover .service-icon svg{ color:#000; }
      .service-title{ font-weight:600; margin-bottom:4px; }
      .service-desc{ color:var(--muted2); font-size:14px; line-height:1.6; }

      /* ---------- bmi ---------- */
      .bmi-card{ display:grid; grid-template-columns:1fr; background:var(--panel); border:1px solid var(--line); border-radius:24px; overflow:hidden; box-shadow:0 30px 80px rgba(0,0,0,0.5); }
      @media (min-width:768px){ .bmi-card{ grid-template-columns:1fr 1fr; } }
      .bmi-form{ padding:40px; display:flex; flex-direction:column; gap:30px; }
      .bmi-row-label{ display:flex; justify-content:space-between; font-size:14px; margin-bottom:8px; }
      .bmi-row-label .val{ color:#fff; font-weight:600; }
      .bmi-row-label .lab{ color:var(--muted); }
      .bmi-slider{ width:100%; accent-color:var(--accent); }
      .bmi-result{
        background:linear-gradient(160deg, rgba(255,255,255,0.04), transparent); padding:40px; display:flex;
        flex-direction:column; align-items:center; justify-content:center; text-align:center;
        border-top:1px solid var(--line);
      }
      @media (min-width:768px){ .bmi-result{ border-top:none; border-left:1px solid var(--line); } }
      .bmi-value{ font-size:56px; color:#fff; margin-bottom:8px; }
      .bmi-tag{ font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; padding:6px 16px; border-radius:999px; }
      .bmi-note{ color:var(--muted2); font-size:12px; margin-top:20px; max-width:280px; }
      .bmi-hint{ color:var(--muted2); font-size:14px; max-width:280px; }

      /* ---------- trainers ---------- */
      .trainer-card{ position:relative; border-radius:18px; overflow:hidden; border:1px solid var(--line); transition:border-color .4s; }
      .trainer-card:hover{ border-color:rgba(255,107,0,0.4); }
      .trainer-img-wrap{ aspect-ratio:3/4; overflow:hidden; }
      .trainer-img-wrap img{ width:100%; height:100%; object-fit:cover; transition:transform .7s ease; display:block; }
      .trainer-card:hover .trainer-img-wrap img{ transform:scale(1.1); }
      .trainer-shade{ position:absolute; inset:0; background:linear-gradient(to top, #000, rgba(0,0,0,0.3) 55%, transparent); }
      .trainer-info{ position:absolute; left:0; right:0; bottom:0; padding:20px; }
      .trainer-name{ font-weight:600; font-size:17px; }
      .trainer-role{ color:var(--accent); font-size:14px; font-weight:500; }
      .trainer-meta{ color:var(--muted2); font-size:12px; margin-top:4px; }

      /* ---------- facilities ---------- */
      .facility-card{
        display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px;
        background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:18px;
        padding:32px 16px; transition:all .35s ease;
      }
      .facility-card:hover{ background:rgba(255,255,255,0.06); transform:translateY(-6px); }
      .facility-icon{ width:48px; height:48px; border-radius:999px; background:var(--accent-soft); display:flex; align-items:center; justify-content:center; }
      .facility-icon svg{ color:var(--accent); }
      .facility-title{ color:rgba(255,255,255,0.8); font-size:14px; font-weight:500; }

      /* ---------- gallery (masonry via columns) ---------- */
      .gallery-columns{ column-count:3; column-gap:20px; }
      @media (max-width:900px){ .gallery-columns{ column-count:2; } }
      @media (max-width:560px){ .gallery-columns{ column-count:1; } }
      .gallery-item{ break-inside:avoid; margin-bottom:20px; position:relative; border-radius:18px; overflow:hidden; border:1px solid var(--line); }
      .gallery-item img{ width:100%; display:block; object-fit:cover; transition:transform .7s ease; }
      .gallery-item:hover img{ transform:scale(1.1); }
      .gallery-caption{ position:absolute; inset:0; display:flex; align-items:flex-end; background:rgba(0,0,0,0); transition:background .4s; }
      .gallery-item:hover .gallery-caption{ background:rgba(0,0,0,0.45); }
      .gallery-caption span{ padding:16px; font-size:14px; font-weight:500; opacity:0; transition:opacity .4s; }
      .gallery-item:hover .gallery-caption span{ opacity:1; }

      /* ---------- transformations ---------- */
      .tf-card{ background:var(--panel); border:1px solid var(--line); border-radius:18px; overflow:hidden; transition:all .4s ease; }
      .tf-card:hover{ border-color:rgba(255,107,0,0.3); transform:translateY(-8px); }
      .tf-img{ height:220px; overflow:hidden; }
      .tf-img img{ width:100%; height:100%; object-fit:cover; display:block; }
      .tf-body{ padding:28px; }
      .tf-top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
      .tf-name{ font-weight:600; }
      .tf-lost{ color:var(--accent); font-size:20px; }
      .tf-story{ color:var(--muted2); font-size:14px; line-height:1.6; margin-bottom:12px; }
      .tf-duration{ font-size:12px; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.35); }

      /* ---------- testimonials ---------- */
      .testi-card{ height:100%; background:rgba(255,255,255,0.04); border:1px solid var(--line); border-radius:18px; padding:28px; transition:border-color .4s; }
      .testi-card:hover{ border-color:rgba(255,107,0,0.3); }
      .testi-stars{ display:flex; gap:3px; margin-bottom:16px; }
      .testi-text{ color:rgba(255,255,255,0.7); font-size:14px; line-height:1.6; margin-bottom:24px; }
      .testi-name{ font-weight:600; font-size:14px; }

      /* ---------- stats band ---------- */
      .stats-band{ padding:80px 0; background:linear-gradient(to right, rgba(255,107,0,0.1), var(--panel), rgba(255,107,0,0.1)); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
      .stats-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:40px; text-align:center; }
      @media (min-width:768px){ .stats-grid{ grid-template-columns:repeat(4,1fr); } }
      .stat-value{ font-size:38px; }
      @media (min-width:768px){ .stat-value{ font-size:48px; } }
      .stat-label{ font-size:13px; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted2); margin-top:8px; }

      /* ---------- free trial form ---------- */
      .trial-card{ background:var(--panel); border:1px solid var(--line); border-radius:24px; padding:44px; box-shadow:0 30px 80px rgba(0,0,0,0.5); }
      .field{ display:flex; flex-direction:column; gap:8px; margin-bottom:24px; }
      .field label{ color:var(--muted); font-size:14px; }
      .field input{
        background:rgba(255,255,255,0.05); border:1px solid var(--line-strong); outline:none; border-radius:12px;
        padding:14px 16px; color:#fff; font-size:15px; font-family:inherit; transition:border-color .25s;
      }
      .field input::placeholder{ color:rgba(255,255,255,0.25); }
      .field input:focus{ border-color:var(--accent); }
      .trial-select{
        background:rgba(255,255,255,0.05); border:1px solid var(--line-strong); outline:none; border-radius:12px;
        padding:14px 16px; color:#fff; font-size:15px; font-family:inherit; transition:border-color .25s; appearance:none;
        background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FF6B00' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>");
        background-repeat:no-repeat; background-position:right 14px center; background-size:16px;
      }
      .trial-select:focus{ border-color:var(--accent); }
      .trial-select option{ background:#141414; color:#fff; }
      .trial-success{ text-align:center; padding:40px 0; }
      .success-icon{ width:64px; height:64px; margin:0 auto 20px; border-radius:999px; background:var(--accent-soft); display:flex; align-items:center; justify-content:center; }

      /* ---------- faq ---------- */
      .faq-item{ border:1px solid var(--line); border-radius:18px; overflow:hidden; background:rgba(255,255,255,0.03); margin-bottom:12px; }
      .faq-q{ width:100%; display:flex; align-items:center; justify-content:space-between; background:none; border:none; cursor:pointer; padding:20px 24px; text-align:left; color:#fff; font-size:15px; font-weight:500; font-family:inherit; }
      .faq-chev{ color:var(--accent); flex-shrink:0; transition:transform .4s ease; }
      .faq-chev.open{ transform:rotate(180deg); }
      .faq-a-wrap{ overflow:hidden; transition:max-height .4s ease; }
      .faq-a{ padding:0 24px 20px; color:var(--muted2); font-size:14px; line-height:1.6; }

      /* ---------- contact ---------- */
      .contact-card{ background:var(--panel); border:1px solid var(--line); border-radius:18px; padding:36px; height:100%; }
      .contact-row{ display:flex; gap:16px; margin-bottom:24px; }
      .contact-row:last-child{ margin-bottom:0; }
      .contact-row svg{ color:var(--accent); flex-shrink:0; margin-top:2px; }
      .contact-row h4{ margin:0 0 4px; font-size:15px; font-weight:600; }
      .contact-row p{ margin:0; color:var(--muted2); font-size:14px; line-height:1.5; }
      .map-card{ background:var(--panel); border:1px solid var(--line); border-radius:18px; min-height:280px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
      .map-glow{ position:absolute; inset:0; opacity:0.4; background:radial-gradient(circle at 30% 30%, rgba(255,107,0,0.25), transparent 60%); }

      /* ---------- footer ---------- */
      .footer{ background:var(--bg); border-top:1px solid var(--line); padding:64px 0 32px; }
      .footer-grid{ display:grid; grid-template-columns:1fr; gap:40px; margin-bottom:48px; }
      @media (min-width:640px){ .footer-grid{ grid-template-columns:1fr 1fr; } }
      @media (min-width:1024px){ .footer-grid{ grid-template-columns:2fr 1fr 1fr 1fr; } }
      .footer-desc{ color:var(--muted2); font-size:14px; line-height:1.6; margin-top:16px; }
      .footer-heading{ font-weight:600; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:16px; }
      .footer-links{ list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
      .footer-links a{ color:var(--muted2); text-decoration:none; font-size:14px; transition:color .2s; }
      .footer-links a:hover{ color:var(--accent); }
      .footer-links li{ color:var(--muted2); font-size:14px; }
      .social-row{ display:flex; gap:12px; }
      .social-btn{ width:40px; height:40px; border-radius:999px; border:1px solid var(--line-strong); display:flex; align-items:center; justify-content:center; color:var(--muted); font-size:12px; text-decoration:none; transition:all .2s; }
      .social-btn:hover{ border-color:var(--accent); color:var(--accent); }
      .footer-bottom{ padding-top:28px; border-top:1px solid var(--line); display:flex; flex-direction:column; gap:10px; align-items:center; justify-content:space-between; text-align:center; }
      @media (min-width:640px){ .footer-bottom{ flex-direction:row; text-align:left; } }
      .footer-bottom p{ color:rgba(255,255,255,0.3); font-size:12px; margin:0; }

      /* ---------- whatsapp ---------- */
      .whatsapp-btn{
        position:fixed; bottom:24px; right:24px; z-index:50; width:56px; height:56px; border-radius:999px;
        background:#25D366; display:flex; align-items:center; justify-content:center;
        box-shadow:0 10px 30px rgba(37,211,102,0.4); transition:transform .3s ease;
        animation:pulse-ring 2.4s ease-out infinite; text-decoration:none;
      }
      .whatsapp-btn:hover{ transform:scale(1.1); }
      @keyframes pulse-ring{
        0%{ box-shadow:0 0 0 0 rgba(37,211,102,0.55); }
        70%{ box-shadow:0 0 0 16px rgba(37,211,102,0); }
        100%{ box-shadow:0 0 0 0 rgba(37,211,102,0); }
      }
    `}</style>
  );
}

/* ---------------------------------------------------------------------- */
/*  TRIAL NAVIGATION CONTEXT                                               */
/*  Lets "Join Now" / "Book Free Trial" / "Get Started" buttons anywhere   */
/*  on the page scroll to the trial form, pre-select a plan, and focus     */
/*  the first field — real click-to-submit behaviour, not just an anchor. */
/* ---------------------------------------------------------------------- */

const TrialContext = createContext(() => {});
function useGoToTrial() {
  return useContext(TrialContext);
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
  { max: 25, label: "Healthy", color: "#3ECF8E" },
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

        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <a href="#trial" className="btn btn-primary nav-cta btn-sm">
          Book Free Trial <ArrowRight size={15} />
        </a>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#trial" onClick={() => setOpen(false)} className="btn btn-primary">
            Book Free Trial
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/*  HERO                                                                   */
/* ---------------------------------------------------------------------- */

function Hero() {
  const goToTrial = useGoToTrial();
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
              <a href="#plans" className="btn btn-primary">Join Now <ArrowRight size={18} /></a>
              <button type="button" onClick={() => goToTrial()} className="btn btn-outline">
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
  const goToTrial = useGoToTrial();
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
                    onClick={() => goToTrial(plan.name)}
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

  const calculate = useCallback(() => {
    const h = Number(height) / 100;
    const w = Number(weight);
    if (!h || !w) return;
    const bmi = w / (h * h);
    const cat = BMI_CATEGORIES.find((c) => bmi < c.max);
    setResult({ bmi: bmi.toFixed(1), cat });
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
                <input type="range" min="120" max="220" value={height} onChange={(e) => setHeight(e.target.value)} className="bmi-slider" />
              </div>
              <div>
                <div className="bmi-row-label"><span className="lab">Weight</span><span className="val">{weight} kg</span></div>
                <input type="range" min="30" max="180" value={weight} onChange={(e) => setWeight(e.target.value)} className="bmi-slider" />
              </div>
              <button onClick={calculate} className="btn btn-primary btn-block">Calculate BMI</button>
            </div>

            <div className="bmi-result">
              {result ? (
                <>
                  <div className="display bmi-value">{result.bmi}</div>
                  <div className="bmi-tag" style={{ color: result.cat.color, backgroundColor: `${result.cat.color}1A` }}>
                    {result.cat.label}
                  </div>
                  <p className="bmi-note">This is a general indicator only. Our trainers will build your real plan around a full body composition assessment.</p>
                </>
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
                <div className="trainer-img-wrap"><img src={t.img} alt={t.name} /></div>
                <div className="trainer-shade" />
                <div className="trainer-info">
                  <h3 className="trainer-name">{t.name}</h3>
                  <p className="trainer-role">{t.role}</p>
                  <p className="trainer-meta">{t.exp}</p>
                  <p className="trainer-meta">{t.spec}</p>
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
/*  FREE TRIAL FORM                                                        */
/* ---------------------------------------------------------------------- */

function FreeTrial({ selectedPlan, nameInputRef }) {
  const [form, setForm] = useState({ name: "", phone: "", goal: "", plan: "Not sure yet" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  // When a "Get Started" button elsewhere on the page picks a plan,
  // reflect it here automatically — the person can still change it.
  useEffect(() => {
    if (selectedPlan) {
      setForm((f) => ({ ...f, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.phone.trim() || form.phone.trim().length < 8) nextErrors.phone = "Please enter a valid phone number.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSent(true);
  };

  const bookAnother = () => {
    setSent(false);
    setForm({ name: "", phone: "", goal: "", plan: "Not sure yet" });
    setErrors({});
  };

  return (
    <section id="trial" className="section" style={{ background: "var(--panel-soft)" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <SectionHeading eyebrow="Get Started Today" title="Book Your Free Trial" sub="Tell us a little about you — a trainer will confirm your slot within the day." />
        <Reveal style={{ height: "auto" }}>
          <div className="trial-card">
            {sent ? (
              <div className="trial-success">
                <div className="success-icon"><ShieldCheck size={28} color="#FF6B00" /></div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>You&apos;re all set, {form.name.split(" ")[0]}!</h3>
                <p style={{ color: "var(--muted2)", fontSize: 14, marginBottom: 24 }}>
                  We&apos;ve received your request for the <strong style={{ color: "#fff" }}>{form.plan}</strong> plan and will
                  call {form.phone} shortly to confirm your free trial.
                </p>
                <button type="button" onClick={bookAnother} className="btn btn-ghost btn-sm">
                  Book another trial
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field">
                  <label>Full Name</label>
                  <input
                    ref={nameInputRef}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                  />
                  {errors.name && <span style={{ color: "#FF4444", fontSize: 12 }}>{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 98765 43210"
                  />
                  {errors.phone && <span style={{ color: "#FF4444", fontSize: 12 }}>{errors.phone}</span>}
                </div>
                <div className="field">
                  <label>Membership Plan</label>
                  <select
                    value={form.plan}
                    onChange={(e) => setForm({ ...form, plan: e.target.value })}
                    className="trial-select"
                  >
                    <option>Not sure yet</option>
                    <option>Basic</option>
                    <option>Premium</option>
                    <option>Elite</option>
                  </select>
                </div>
                <div className="field">
                  <label>Fitness Goal</label>
                  <input
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    placeholder="e.g. Weight loss, muscle gain, general fitness"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Book Free Trial <Send size={16} /></button>
              </form>
            )}
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
            <div className="contact-card">
              <div className="contact-row">
                <MapPin size={20} />
                <div><h4>Address</h4><p>12 MG Road, Near City Centre, Bhopal, Madhya Pradesh 462001</p></div>
              </div>
              <div className="contact-row">
                <Phone size={20} />
                <div><h4>Phone</h4><p>+91 99999 99999</p></div>
              </div>
              <div className="contact-row">
                <Mail size={20} />
                <div><h4>Email</h4><p>hello@ironedgefitness.com</p></div>
              </div>
              <div className="contact-row">
                <Clock3 size={20} />
                <div><h4>Working Hours</h4><p>Mon – Sat: 5:00 AM – 11:00 PM<br />Sunday: 6:00 AM – 9:00 PM</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="map-card">
              <div className="map-glow" />
              <div style={{ textAlign: "center", position: "relative" }}>
                <MapPin size={30} color="#FF6B00" style={{ margin: "0 auto 12px" }} />
                <p style={{ color: "var(--muted2)", fontSize: 14 }}>Google Map embed placeholder</p>
              </div>
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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const nameInputRef = useRef(null);

  const goToTrial = useCallback((planName) => {
    if (planName) setSelectedPlan(planName);
    const el = document.getElementById("trial");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Wait for the smooth scroll to land before focusing the field.
    window.setTimeout(() => {
      if (nameInputRef.current) nameInputRef.current.focus();
    }, 550);
  }, []);

  return (
    <TrialContext.Provider value={goToTrial}>
      <div className="ie-root">
        <GlobalStyles />
        <Navbar />
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
        <FreeTrial selectedPlan={selectedPlan} nameInputRef={nameInputRef} />
        <Faq />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </TrialContext.Provider>
  );
}

function TestimonialsWrapper() {
  return <Testimonials />;
}
