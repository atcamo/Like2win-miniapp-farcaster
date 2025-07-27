"use client";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Demo } from "./sections/Demo";
import { CTA } from "./sections/CTA";
import ErrorBoundary from "./ErrorBoundary";

export function LandingPage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        
        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Features />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Demo />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <CTA />
          </ErrorBoundary>
        </main>
        
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}