"use client";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import "../styles/globals.css";
import {
  LanguageProvider,
  useLanguage,
} from "@/app/lib/context/LanguageContext";
import { ThemeProvider } from "@/app/lib/context/ThemeContext";
import { LocationProvider } from "@/app/lib/context/LocationContext";
import { FooterVisibilityProvider } from "./lib/context/FooterVisibility";
import { useFooterVisibility } from "./lib/context/FooterVisibility";
import AppMessage from "./components/message/AppMessage";
import metaData from "./lib/content/metaData";

const NoSSRHeader = dynamic(() => import("@/app/components/basics/Header"), {
  ssr: false,
});
const NoSSRFooter = dynamic(() => import("@/app/components/basics/Footer"), {
  ssr: false,
});

function Content({ children }) {
  const { language } = useLanguage();
  const { isFooterVisible } = useFooterVisibility();

  const { title, description } = metaData[language] || metaData["en"];

  return (
    <>
      <html lang={language}>
        <head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="flex flex-col min-h-screen bg-grey2 text-typoPrimary dark:bg-typoSecondary dark:text-grey1">
          <Suspense fallback={null}>
            <div className="block 928px:hidden">
              <NoSSRHeader />
            </div>
          </Suspense>
          <main className="flex-grow pb-10" key={language}>
            <div className="block 928px:hidden">
              <Suspense fallback={null}>
                {children}
                <SpeedInsights />
                <Analytics />
              </Suspense>
            </div>
            <div className="hidden 928px:flex min-h-screen items-center justify-center">
              <AppMessage language={language} />
            </div>
          </main>
          {isFooterVisible && (
            <Suspense fallback={null}>
              <div className="block 928px:hidden">
                <NoSSRFooter />
              </div>
            </Suspense>
          )}
        </body>
      </html>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LocationProvider>
          <FooterVisibilityProvider>
            <Content>{children}</Content>
          </FooterVisibilityProvider>
        </LocationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
