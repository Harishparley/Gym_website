import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-glow" />
      <div className="notfound-badge">
        <Dumbbell size={28} color="#000" strokeWidth={2.5} />
      </div>
      <div className="display notfound-code">404</div>
      <h1 className="display notfound-title">Looks Like You&apos;ve Skipped Leg Day</h1>
      <p className="notfound-sub">
        The page you&apos;re looking for doesn&apos;t exist — but your fitness journey still can.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={18} /> Return Home
      </Link>
    </div>
  );
}
