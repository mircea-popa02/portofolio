import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "./components/CustomCursor"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { ContactSection } from "./components/ContactSection"
import SquigglyLine3D from "./components/SquigglyLine"
import { useSmoothScroll } from "./hooks/useSmoothScroll"

const sections = ["home", "about", "projects", "contact"];

function App() {
  const { currentSection, scrollTo } = useSmoothScroll(sections);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <CustomCursor />
        <Navigation scrollTo={scrollTo} currentSection={currentSection} />
        <SquigglyLine3D currentSection={currentSection} />
        
        <main>
          <div id="home">
            <HeroSection scrollTo={scrollTo} />
          </div>
          <div id="about">
            <AboutSection />
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
            <p>&copy; 2025 Mircea Popa. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App