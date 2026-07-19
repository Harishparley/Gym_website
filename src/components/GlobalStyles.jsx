import React from "react";

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
      .bmi-result-content{ animation:bmi-reveal .5s cubic-bezier(.16,1,.3,1); }
      @keyframes bmi-reveal{ from{ opacity:0; transform:scale(0.92) translateY(8px); } to{ opacity:1; transform:scale(1) translateY(0); } }

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
      .trainer-cta{ margin-top:14px; padding:9px 18px; font-size:13px; border-color:rgba(255,255,255,0.4); }
      .trainer-cta:hover{ border-color:var(--accent); color:var(--accent); background:rgba(255,107,0,0.08); }

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

      /* ---------- final cta band ---------- */
      .cta-band{ background:linear-gradient(135deg, rgba(255,107,0,0.14), var(--panel-soft)); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
      .cta-band-inner{ display:flex; flex-direction:column; gap:28px; align-items:flex-start; justify-content:space-between; }
      @media (min-width:900px){ .cta-band-inner{ flex-direction:row; align-items:center; } }
      .cta-band-title{ font-size:30px; color:#fff; max-width:520px; }
      @media (min-width:768px){ .cta-band-title{ font-size:38px; } }
      .cta-band-sub{ color:var(--muted); margin-top:12px; max-width:480px; }
      .cta-band-actions{ display:flex; flex-wrap:wrap; gap:14px; flex-shrink:0; }

      /* ---------- contact form ---------- */
      .contact-form{ max-width:520px; }

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

      /* ---------- accessibility: focus states ---------- */
      a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 3px;
        border-radius: 4px;
      }
      .skip-link{
        position:absolute; left:-9999px; top:0; z-index:100; background:var(--accent); color:#000;
        font-weight:700; padding:12px 20px; border-radius:0 0 10px 0;
      }
      .skip-link:focus{ left:0; }

      /* ---------- form field error / alert states ---------- */
      .field-error{ color:#FF6B6B; font-size:12px; margin-top:2px; display:block; }
      .field input[aria-invalid="true"], .trial-select[aria-invalid="true"]{ border-color:#FF6B6B; }
      .form-alert{
        display:flex; align-items:center; gap:10px; background:rgba(255,68,68,0.1); border:1px solid rgba(255,68,68,0.35);
        color:#FF9B9B; font-size:13px; padding:12px 16px; border-radius:12px; margin-bottom:18px;
      }
      .field textarea{
        background:rgba(255,255,255,0.05); border:1px solid var(--line-strong); outline:none; border-radius:12px;
        padding:14px 16px; color:#fff; font-size:15px; font-family:inherit; resize:vertical; transition:border-color .25s;
      }
      .field textarea:focus{ border-color:var(--accent); }
      .field textarea::placeholder{ color:rgba(255,255,255,0.25); }

      /* ---------- spinner ---------- */
      .spin{ animation:spin 0.9s linear infinite; }
      @keyframes spin{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
      .btn:disabled{ opacity:0.7; cursor:not-allowed; }

      /* ---------- inquiry success (shared by modal forms + contact form) ---------- */
      .inquiry-success{ text-align:center; padding:36px 0 12px; }
      .inquiry-success-title{ font-size:19px; font-weight:600; margin-bottom:8px; font-family:'Inter',sans-serif; text-transform:none; letter-spacing:normal; }
      .inquiry-success-body{ color:var(--muted2); font-size:14px; margin-bottom:22px; line-height:1.6; }

      /* ---------- modal ---------- */
      .modal-overlay{
        position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.72); backdrop-filter:blur(4px);
        display:flex; align-items:center; justify-content:center; padding:20px;
        animation:overlay-in .25s ease;
      }
      @keyframes overlay-in{ from{ opacity:0; } to{ opacity:1; } }
      .modal-card{
        position:relative; width:100%; max-width:480px; max-height:90vh; overflow-y:auto;
        background:var(--panel); border:1px solid var(--line-strong); border-radius:24px; padding:40px 32px 32px;
        box-shadow:0 40px 100px rgba(0,0,0,0.6); animation:modal-in .3s cubic-bezier(.16,1,.3,1);
      }
      @keyframes modal-in{ from{ opacity:0; transform:translateY(24px) scale(0.98); } to{ opacity:1; transform:translateY(0) scale(1); } }
      .modal-close{
        position:absolute; top:16px; right:16px; width:34px; height:34px; border-radius:999px; border:1px solid var(--line-strong);
        background:rgba(255,255,255,0.05); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer;
      }
      .modal-close:hover{ background:rgba(255,255,255,0.12); }
      .modal-head{ margin-bottom:22px; }
      .modal-title{ font-size:24px; color:#fff; }
      .modal-subtitle{ color:var(--muted); font-size:14px; margin-top:8px; }
      @media (max-width:480px){ .modal-card{ padding:32px 22px 24px; border-radius:18px; } }

      /* ---------- loading screen ---------- */
      .loading-screen{
        position:fixed; inset:0; z-index:500; background:var(--bg); display:flex; flex-direction:column;
        align-items:center; justify-content:center; gap:18px; transition:opacity .5s ease, visibility .5s ease;
      }
      .loading-screen.fade-out{ opacity:0; visibility:hidden; pointer-events:none; }
      .loading-badge{
        width:56px; height:56px; border-radius:999px; background:var(--accent); display:flex; align-items:center; justify-content:center;
        animation:loading-pulse 1.6s ease-in-out infinite;
      }
      @keyframes loading-pulse{ 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.08); } }
      .loading-word{ font-size:32px; letter-spacing:4px; color:#fff; }
      .loading-word span{ color:var(--accent); }
      .loading-caption{ color:var(--muted2); font-size:13px; letter-spacing:2px; text-transform:uppercase; }
      .loading-bar{ width:160px; height:2px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden; }
      .loading-bar span{ display:block; width:40%; height:100%; background:var(--accent); animation:loading-slide 1.2s ease-in-out infinite; }
      @keyframes loading-slide{ 0%{ transform:translateX(-100%); } 100%{ transform:translateX(350%); } }

      /* ---------- custom cursor (desktop, fine-pointer only) ---------- */
      body.custom-cursor-active, body.custom-cursor-active *{ cursor:none !important; }
      .cursor-dot{
        position:fixed; top:0; left:0; width:6px; height:6px; margin:-3px 0 0 -3px; border-radius:999px;
        background:var(--accent); z-index:9999; pointer-events:none;
      }
      .cursor-ring{
        position:fixed; top:0; left:0; width:32px; height:32px; margin:-16px 0 0 -16px; border-radius:999px;
        border:1px solid rgba(255,107,0,0.5); z-index:9998; pointer-events:none; transition:width .2s, height .2s, margin .2s, border-color .2s;
      }
      .cursor-ring.cursor-active{ width:24px; height:24px; margin:-12px 0 0 -12px; border-color:#fff; }
      @media (max-width:900px){ .cursor-dot, .cursor-ring{ display:none; } }

      /* ---------- 404 page ---------- */
      .notfound-page{
        min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;
        text-align:center; padding:24px; position:relative; overflow:hidden; background:var(--bg);
      }
      .notfound-glow{ position:absolute; top:-10%; left:50%; transform:translateX(-50%); width:600px; height:600px; background:var(--accent-soft); filter:blur(140px); border-radius:999px; }
      .notfound-badge{ position:relative; width:56px; height:56px; border-radius:999px; background:var(--accent); display:flex; align-items:center; justify-content:center; margin-bottom:24px; }
      .notfound-code{ position:relative; font-size:96px; color:#fff; line-height:1; }
      .notfound-title{ position:relative; font-size:24px; color:#fff; margin-top:12px; max-width:480px; }
      @media (min-width:640px){ .notfound-code{ font-size:140px; } .notfound-title{ font-size:30px; } }
      .notfound-sub{ position:relative; color:var(--muted); margin:16px 0 32px; max-width:420px; }

      /* ---------- extra mobile refinements ---------- */
      @media (max-width:480px){
        .section{ padding:72px 0; }
        .container{ padding:0 18px; }
        .hero{ padding:110px 0 60px; }
        .hero-title{ font-size:38px; }
        .hero-actions{ flex-direction:column; align-items:stretch; }
        .hero-actions .btn{ width:100%; }
        .hero-stats{ gap:28px; }
        .plan-card.popular{ transform:none; }
        .modal-card{ max-height:85vh; }
      }
    `}</style>
  );
}

export default GlobalStyles;
