import { useState } from "react";

import Header from "./components/Header";
import FooterSitemapSingle from "./FooterSitemapSingle";
import Footer from "./components/Footer";


import Inicio from "./views/Inicio";
import Historia from "./views/Historia";
import Mision from "./views/Mision";
import Vision from "./views/Vision";
import PoliticaCalidad from "./views/PoliticaCalidad";

import "./App.css";

export default function App() {

  const [view, setView] = useState("inicio");

  const Card = ({ children }) => (
    <div className="card">{children}</div>
  );

  return (
    
    <div className="app">

      <Header view={view} setView={setView} />

      <main>

      {view === "inicio" && <Inicio Card={Card} />}
      {view === "historia" && <Historia Card={Card} />}
      {view === "mision" && <Mision Card={Card} />}
      {view === "vision" && <Vision Card={Card} />}
      {view === "politica" && <PoliticaCalidad Card={Card} />}

      </main>

      <FooterSitemapSingle />

    </div>
  );
  <Footer items={sitemapItems} onNavigate={handleNavigate} />
}