import type { Metadata } from "next";
import { Playfair_Display, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/ui/PageTransition";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sign",
});

export const metadata: Metadata = {
  title: "TZIO | Mexican Triple Sec - Licor de Naranja Mexicana",
  description: "Hecho en México. Pensando en Usted. Premium orange liqueur crafted in Michoacán.",
  keywords: ["triple sec", "mexican liqueur", "orange liqueur", "TZIO", "Michoacán", "cocktails"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={`${playfair.variable} ${inter.variable} ${bebasNeue.variable}`}
    >
      <body className="font-body antialiased min-h-screen bg-mercado-shadow">
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
