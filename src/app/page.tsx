"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, CheckCircle2, Database, LockKeyhole, Server } from "lucide-react";
import { PortfolioHeader } from "@/components/PortfolioHeader";

const projects = [
  { href: "/taches", number: "01", icon: CheckCircle2, title: "Gestion de tâches", description: "Un espace de suivi rapide pour transformer les intentions en travail terminé.", stack: "PHP natif · PostgreSQL · REST", accent: "blue" },
  { href: "/bibliotheque", number: "02", icon: BookOpen, title: "Bibliothèque", description: "Un catalogue éditorial avec recherche, disponibilité et logique d’emprunt.", stack: "Laravel · Sanctum · PostgreSQL", accent: "green" },
];

export default function Home() {
  const [apiStatus, setApiStatus] = useState({ tasks: "Vérification", library: "Vérification" });

  useEffect(() => {
    const checkApi = async (url: string, key: "tasks" | "library") => {
      try {
        const response = await fetch(url, { cache: "no-store" });
        setApiStatus((current) => ({ ...current, [key]: response.ok ? "Opérationnelle" : "Indisponible" }));
      } catch {
        setApiStatus((current) => ({ ...current, [key]: "Indisponible" }));
      }
    };

    void checkApi(`${process.env.NEXT_PUBLIC_TASKS_API_URL ?? "http://localhost:8080"}/tasks`, "tasks");
    void checkApi(`${process.env.NEXT_PUBLIC_LIBRARY_API_URL ?? "http://localhost:8000/api"}/books`, "library");
  }, []);

  return <main>
    <PortfolioHeader />
    <section className="home-hero shell">
      <div className="hero-copy fade-in">
        <p className="eyebrow">Portfolio technique · 2026</p>
        <h1>Deux APIs.<br /><em>Une vision produit.</em></h1>
        <p className="hero-lede">Une démonstration front-end sobre et tangible, construite autour de deux backends PHP aux responsabilités distinctes.</p>
        <div className="hero-actions"><Link href="/taches" className="button button-primary">Explorer les projets <ArrowUpRight size={17} /></Link><span className="hero-note">Conçu pour être parcouru en entretien</span></div>
      </div>
      <div className="hero-aside fade-in delay-1"><div className="signal-card"><span className="signal-label">Architecture en ligne</span><div className="signal-line"><span>PHP natif</span><strong>8080</strong><span className={apiStatus.tasks === "Opérationnelle" ? "signal-ok" : "signal-muted"}>{apiStatus.tasks}</span></div><div className="signal-line"><span>Laravel API</span><strong>8000</strong><span className={apiStatus.library === "Opérationnelle" ? "signal-ok" : "signal-muted"}>{apiStatus.library}</span></div></div><div className="hero-index">A / 02</div></div>
    </section>
    <section className="project-section shell"><div className="section-heading"><div><p className="eyebrow">Les projets</p><h2>Des interfaces qui donnent<br />du contexte aux données.</h2></div><p className="section-count">02 expériences<br />connectées</p></div><div className="project-grid">{projects.map(({ href, number, icon: Icon, title, description, stack, accent }) => <Link className={`project-card card-hover ${accent}`} href={href} key={href}><div className="project-card-top"><span>{number}</span><Icon size={22} strokeWidth={1.7} /></div><div><h3>{title}</h3><p>{description}</p></div><div className="project-card-bottom"><span>{stack}</span><ArrowUpRight size={18} /></div></Link>)}</div></section>
    <section className="architecture-section shell"><div><p className="eyebrow">Sous le capot</p><h2>Une interface, deux architectures.</h2><p>Chaque section garde son client API, ses types et ses responsabilités. Le frontend orchestre l’expérience sans mélanger les domaines.</p></div><div className="architecture-list"><div><Server size={17} /><span><strong>PHP natif</strong><small>REST · PostgreSQL · port 8080</small></span></div><div><LockKeyhole size={17} /><span><strong>Laravel</strong><small>Sanctum · Resources · port 8000</small></span></div><div><Database size={17} /><span><strong>Next.js</strong><small>App Router · TypeScript · responsive</small></span></div></div></section>
    <footer className="site-footer shell">
      <div className="footer-brand"><span className="brand-mark">A</span><div><strong>Atelier API</strong><small>Portfolio développeur</small></div></div>
      <nav className="footer-nav" aria-label="Navigation secondaire"><Link href="/taches">Gestion de tâches</Link><Link href="/bibliotheque">Bibliothèque</Link></nav>
      <div className="footer-stack"><span><Server size={14} /> PHP · Laravel · Next.js</span><span><Database size={14} /> PostgreSQL · REST</span></div>
      <div className="footer-bottom"><span>© 2026 Atelier API</span><span>Construit avec soin pour le web</span></div>
    </footer>
  </main>;
}
