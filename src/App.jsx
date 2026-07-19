import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import GymWebsite from "./GymWebsite";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import GlobalStyles from "./components/GlobalStyles";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyles />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CustomCursor />
      <Routes>
        <Route path="/" element={<GymWebsite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
