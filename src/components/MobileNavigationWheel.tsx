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
      
      // Calculate rotation based on scroll position (0 to 90 degrees)
      const scrollProgress = Math.min(1, Math.max(0, currentScrollY / maxScrollY));
      const newRotation = scrollProgress * 90;
      
      setRotation(newRotation);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Get current section info
  const currentSectionIndex = sections.findIndex(section => section.id === currentSection);

  if (!isMobile) return null;

  const wheelDiameter = 320; // px
  const wheelRadius = wheelDiameter / 2;
  
  return (
    <div className="fixed bottom-0 right-0 z-40 pointer-events-none">
      <div className="relative" style={{ width: wheelDiameter, height: wheelDiameter }}>
        <motion.div
          className="absolute w-[320px] h-[320px]"
          style={{ 
            bottom: `-${wheelRadius}px`, 
            right: `-${wheelRadius}px` 
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/30 bg-background/80 backdrop-blur-md shadow-lg relative overflow-visible">
            <div className="absolute inset-0" style={{
              clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }} />
            {[...Array(6)].map((_, i) => {
              const spokeAngle = i * (90 / 5);
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '2px',
                    height: `${wheelRadius}px`,
                    background: 'rgba(59,130,246,0.2)',
                    transform: `rotate(${spokeAngle}deg)`,
                    transformOrigin: 'top',
                    zIndex: 1,
                  }}
                />
              );
            })}
            {sections.map((section, index) => {
              const sectionCount = sections.length;
              const angle = (index * (90 / (sectionCount - 1)));
              const labelRadius = wheelRadius * 0.9; // Position on the rim
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * labelRadius;
              const y = Math.sin(rad) * labelRadius;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollTo(section.selector)}
                  className={`absolute pointer-events-auto px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    currentSection === section.id
                      ? 'bg-primary text-primary-foreground shadow-md scale-110'
                      : 'bg-background/90 text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border'
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
                    scale: currentSection === section.id ? 1.1 : 1,
                    rotate: -rotation
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
