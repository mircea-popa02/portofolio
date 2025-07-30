import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "./components/CustomCursor"
import { SmoothScroll } from "./components/SmoothScroll"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { ProjectsSection } from "./components/ProjectsSection"
import { ContactSection } from "./components/ContactSection"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <CustomCursor />
        <SmoothScroll />
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
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