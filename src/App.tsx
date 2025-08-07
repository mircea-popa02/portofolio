import { ThemeProvider } from "@/components/theme-provider"
import { useTranslation } from "react-i18next"
import { LanguageSync } from "./components/LanguageSync"
import { CustomCursor } from "./components/CustomCursor"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { TechnologiesSection } from "./components/TechnologiesSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { ContactSection } from "./components/ContactSection"
import { useSmoothScroll } from "./hooks/useSmoothScroll"
import { Trans } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Toaster } from "@/components/ui/sonner"


const sections = ["home", "about", "technologies", "projects", "contact"];

function App() {
  const { scrollTo, currentSection } = useSmoothScroll(sections);
  useTranslation();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <LanguageSync />
        <CustomCursor />
        <Navigation scrollTo={scrollTo} currentSection={currentSection} />

        <main>
          <div id="home">
            <HeroSection scrollTo={scrollTo} />
          </div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="technologies">
            <TechnologiesSection />
          </div>
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </main>

        <footer className="py-8 text-center text-muted-foreground border-t border-border">
          <div className="container mx-auto px-4">
            <p>
              <Trans i18nKey="footer.copyright" />
            </p>
          </div>
        </footer>
      </div>
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}

export default App