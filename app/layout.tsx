import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A condensada em caixa alta faz o nome, a manchete e os títulos, como
   placa de ginásio; a Barlow normal faz o corpo e os campos. */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fonte-corpo",
  display: "swap",
});

const TITULO = "Fantoche: artigos esportivos, natação e lazer em Indaiatuba";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: "%s · Fantoche",
  },
  description: "Natação, esportes, lazer, roupas e acessórios. Você escolhe no site e pede pelo WhatsApp; retira na loja em Indaiatuba ou recebe em casa.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Fantoche",
    url: site.url,
    title: TITULO,
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Fantoche" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.posicionamento,
    images: ["/og/site.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
