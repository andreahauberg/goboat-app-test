import { SpeedInsights } from "@vercel/speed-insights/next"
import "../styles/globals.css";
import Header from "../app/components/basics/Header";
import Footer from "../app/components/basics/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="flex flex-col min-h-screen">
        <div className="block 928px:hidden">
          <Header />
        </div>

        <main className="flex-grow pb-10">
          <div className="block 928px:hidden">{children}
          <SpeedInsights />
          </div>

          <div className="hidden 928px:flex min-h-screen items-center justify-center">
            <h1 className="text-2xl font-bold">
              Denne side er kun tilgængelig på mobile enheder
            </h1>
          </div>
        </main>

        <div className="block 928px:hidden">
          <Footer />
        </div>
      </body>
    </html>
  );
}
