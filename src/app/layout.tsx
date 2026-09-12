import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier numérique | Portfolio API",
  description: "Démonstration de deux APIs REST PHP dans une interface produit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
