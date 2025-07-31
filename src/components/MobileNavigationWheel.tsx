import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// IMPORTANT: DO NOT ADD COMMENTS TO THIS FILE

interface MobileNavigationWheelProps {
  currentSection: string;
  scrollTo: (selector: string) => void;
}

const sections = [
  { id: 'home', selector: '#home', key: 'navigation.home' },
  { id: 'about', selector: '#about', key: 'navigation.about' },
  { id: 'technologies', selector: '#technologies', key: 'navigation.technologies' },
  { id: 'projects', selector: '#projects', key: 'navigation.projects' },
  { id: 'contact', selector: '#contact', key: 'navigation.contact' },
];

export function MobileNavigationWheel({ currentSection, scrollTo }: MobileNavigationWheelProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      
      // Calculate rotation based on scroll position with section alignment
      const scrollProgress = Math.min(1, Math.max(0, currentScrollY / maxScrollY));
      
      // Map sections to specific rotation degrees
      const sectionCount = sections.length;
      const sectionAngle = 360 / sectionCount;
      
      // Find which section we're closest to based on scroll progress
      const sectionIndex = Math.min(sectionCount - 1, Math.floor(scrollProgress * sectionCount));
      const sectionProgress = (scrollProgress * sectionCount) - sectionIndex;
      
      // Calculate rotation to align with section positions - adjusted to align home at the top
      const newRotation = -(sectionIndex * sectionAngle + (sectionProgress * sectionAngle));
      
      setRotation(newRotation);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Touch interaction handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !isMobile) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY.current - currentY;
    
    if (Math.abs(deltaY) > 5) {
      // Scroll the page based on the drag direction
      window.scrollBy(0, deltaY * 2);
      startY.current = currentY;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Get current section info
  const currentSectionIndex = sections.findIndex(section => section.id === currentSection);

  if (!isMobile) return null;

  const wheelDiameter = 280; // px
  const wheelRadius = wheelDiameter / 2;
  
  return (
    <div className="fixed bottom-0 right-0 z-40 pointer-events-none">
      <div 
        className="relative" 
        style={{ width: wheelDiameter, height: wheelDiameter }}
        ref={wheelRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="absolute w-[280px] h-[280px] pointer-events-auto"
          style={{ 
            bottom: `-${wheelRadius}px`, 
            right: `-${wheelRadius}px`,
            transformOrigin: 'center center'
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/30 bg-background/80 backdrop-blur-md shadow-lg relative overflow-visible">
            {/* Full wheel - no clipping */}
            {[...Array(24)].map((_, i) => {
              const spokeAngle = i * (360 / 24); // Distribute spokes around the entire wheel
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '2px',
                    height: `${wheelRadius}px`,
                    background: 'rgba(100,100,100,0.2)',
                    transform: `rotate(${spokeAngle}deg)`,
                    transformOrigin: 'top',
                    zIndex: 1,
                  }}
                />
              );
            })}
            {sections.map((section, index) => {
              const sectionCount = sections.length;
              // Position sections at specific spoke positions
              // Each section should be at a multiple of 360/24 (15 degrees) to align with spokes
              const spokesPerSection = 24 / sectionCount;
              const spokeIndex = Math.round(spokesPerSection * index);
              const angle = spokeIndex * (360 / 24);
              const labelRadius = wheelRadius * 0.98;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * labelRadius;
              const y = Math.sin(rad) * labelRadius;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollTo(section.selector)}
                  className={`absolute pointer-events-auto px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                    currentSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-md scale-110'
                      : 'bg-background/95 text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: currentSection === section.id ? 1.1 : 1
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  {t(section.key)}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        <div className="absolute z-10" style={{ 
          bottom: `-${wheelRadius}px`, 
          right: `-${wheelRadius}px` 
        }}>
          <motion.div
            className="w-10 h-10 bg-primary rounded-full shadow-lg"
            animate={{ scale: currentSectionIndex >= 0 ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
