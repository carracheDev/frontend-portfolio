import Link from "next/link";
import { ArrowUpRight, Library, ListTodo } from "lucide-react";

export function PortfolioHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand"><span className="brand-mark">A</span><span>Atelier API</span></Link>
      <nav className="nav-links" aria-label="Navigation principale">
        <Link href="/taches"><ListTodo size={16} /> Tâches</Link>
        <Link href="/bibliotheque"><Library size={16} /> Bibliothèque</Link>
      </nav>
      <span className="header-status"><span className="status-dot" /> APIs locales</span>
    </header>
  );
}

export function PageIntro({ eyebrow, title, description, back = false }: { eyebrow: string; title: string; description: string; back?: boolean }) {
  return <div className="page-intro">
    {back && <Link href="/" className="back-link">← Retour au portfolio</Link>}
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p className="intro-copy">{description}</p>
  </div>;
}

export function ApiBadge({ label }: { label: string }) {
  return <span className="api-badge"><span className="status-dot" /> {label} <ArrowUpRight size={13} /></span>;
}
