import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// IMPORTANT: DO NOT ADD COMMENTS TO THIS FILE

interface MobileNavigationWheelProps {
  currentSection: string;
  sectionScrollData?: { 
    progress: number; 
    remaining: number; 
    nextProgress: number;
    prevProgress: number;
  };
}

const sections = [
  { id: 'home', selector: '#home', key: 'navigation.home' },
  { id: 'about', selector: '#about', key: 'navigation.about' },
  { id: 'technologies', selector: '#technologies', key: 'navigation.technologies' },
  { id: 'projects', selector: '#projects', key: 'navigation.projects' },
  { id: 'contact', selector: '#contact', key: 'navigation.contact' },
];

export function MobileNavigationWheel({ currentSection, sectionScrollData }: MobileNavigationWheelProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Get scroll progress values with defaults
  const progress = sectionScrollData?.progress || 0;
  const remaining = sectionScrollData?.remaining || 1;
  const nextProgress = sectionScrollData?.nextProgress || 0;
  const prevProgress = sectionScrollData?.prevProgress || 1;

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

  // Get current section info
  const currentSectionIndex = sections.findIndex(section => section.id === currentSection);
  const currentLabel = currentSectionIndex >= 0 ? t(sections[currentSectionIndex].key) : '';
  
  // Get next and previous section labels
  const nextSectionIndex = (currentSectionIndex + 1) % sections.length;
  const prevSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
  const nextLabel = currentSectionIndex >= 0 ? t(sections[nextSectionIndex].key) : '';
  const prevLabel = currentSectionIndex >= 0 ? t(sections[prevSectionIndex].key) : '';

  if (!isMobile) return null;

  // Wheel dimensions - smaller size for better mobile UX
  const wheelDiameter = 200; // px
  const wheelRadius = wheelDiameter / 2;
  
  return (
    <div className="fixed bottom-0 right-0 z-40 pointer-events-none">
      <div
        className="relative pointer-events-auto"
        style={{ width: wheelDiameter, height: wheelDiameter }}
        ref={wheelRef}
      >
        {/* Rotating wheel component */}
        <motion.div
          className="absolute pointer-events-auto"
          style={{
            width: wheelDiameter,
            height: wheelDiameter,
            bottom: `-${wheelRadius}px`,
            right: `-${wheelRadius}px`,
            transformOrigin: 'center center',
          }}
          animate={{ rotate: rotation + 270 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/30 bg-background/80 backdrop-blur-md shadow-lg relative overflow-visible">
            {[...Array(24)].map((_, i) => {
              const spokeAngle = i * (360 / 24);
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
          </div>
        </motion.div>
        
        {/* Previous label - only show if not on first section */}
        {currentSectionIndex > 0 && (
          <div className="absolute bottom-22 left-30 pointer-events-auto">
            <motion.button 
              key={`prev-${prevLabel}`}
              className="text-xs font-medium border backdrop-blur-md rounded-full px-2 py-0.5 shadow-md hover:bg-background/70 transition-colors cursor-pointer"
              style={{
                backgroundColor: `rgba(var(--background), ${0.2 + (prevProgress * 0.5)})`,
                borderColor: `rgba(var(--foreground), ${0.1 + (prevProgress * 0.3)})`,
                color: `rgba(var(--foreground), ${0.3 + (prevProgress * 0.6)})`
              }}
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ 
                opacity: 0.2 + (prevProgress * 0.7), 
                x: 0,
                scale: 0.85 + (prevProgress * 0.2)
              }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => {
                const prevSection = document.querySelector(sections[prevSectionIndex].selector);
                prevSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {prevLabel}
            </motion.button>
          </div>
        )}
        
        {/* Current label - bottom right position */}
        <div className="absolute bottom-10 right-10 pointer-events-none">
          <motion.div 
            key={`current-${currentLabel}`}
            className="text-md font-semibold border backdrop-blur-md rounded-full px-3 py-1 shadow-lg"
            style={{
              backgroundColor: `rgba(var(--foreground), ${0.85 + (remaining * 0.1)})`,
              borderColor: `rgba(var(--foreground), ${0.8 + (remaining * 0.2)})`,
              color: `rgba(var(--background), ${0.9 + (remaining * 0.1)})`
            }}
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ 
              opacity: currentSectionIndex >= 0 ? 0.9 + (remaining * 0.1) : 0,
              scale: currentSectionIndex >= 0 ? 1 + (progress * 0.1) : 0.8,
              y: currentSectionIndex >= 0 ? 0 : 5
            }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.6, ease: "easeInOut", type: "spring", stiffness: 150, damping: 25 }}
          >
            {currentLabel}
          </motion.div>
        </div>
        
        {/* Next label - only show if not on last section */}
        {currentSectionIndex < sections.length - 1 && currentSectionIndex >= 0 && (
          <div className="absolute top-42 right-20 pointer-events-auto">
            <motion.button 
              key={`next-${nextLabel}`}
              className="text-xs font-medium border backdrop-blur-md rounded-full px-2 py-0.5 shadow-md hover:bg-background/70 transition-colors cursor-pointer"
              style={{
                backgroundColor: `rgba(var(--background), ${0.2 + (nextProgress * 0.5)})`,
                borderColor: `rgba(var(--foreground), ${0.1 + (nextProgress * 0.3)})`,
                color: `rgba(var(--foreground), ${0.3 + (nextProgress * 0.6)})`
              }}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ 
                opacity: 0.2 + (nextProgress * 0.7), 
                y: 0,
                scale: 0.8 + (nextProgress * 0.25)
              }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => {
                const nextSection = document.querySelector(sections[nextSectionIndex].selector);
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {nextLabel}
            </motion.button>
          </div>
        )}
        
        <div
          className="absolute z-10"
          style={{ bottom: `-${wheelRadius}px`, right: `-${wheelRadius}px` }}
        >
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
