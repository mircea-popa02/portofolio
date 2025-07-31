import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// IMPORTANT: DO NOT ADD COMMENTS TO THIS FILE

interface MobileNavigationWheelProps {
  currentSection: string;
  sectionScrollData: {
    progress: number;
    remaining: number;
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

  const sectionsToDisplay = [];
  if (currentSectionIndex >= 0) {
    sectionsToDisplay.push(sections[currentSectionIndex]);
    if (currentSectionIndex + 1 < sections.length) {
      sectionsToDisplay.push(sections[currentSectionIndex + 1]);
    }
  }

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
            <svg width={wheelDiameter} height={wheelDiameter} viewBox={`0 0 ${wheelDiameter} ${wheelDiameter}`} className="absolute">
              <circle
                cx={wheelRadius}
                cy={wheelRadius}
                r={wheelRadius - 5}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * (wheelRadius - 5)}`}
                strokeDashoffset={`${(2 * Math.PI * (wheelRadius - 5)) * (1 - sectionScrollData.progress)}`}
                transform={`rotate(-90 ${wheelRadius} ${wheelRadius})`}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
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
            {sectionsToDisplay.map((section) => {
              const index = sections.findIndex(s => s.id === section.id);
              const angle = index * (360 / sections.length);
              const textRadius = wheelRadius * 1; // Adjust this to position text inside the wheel
              return (
                <div
                  key={section.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${angle}deg) translate(0, -${textRadius}px)`,
                    transformOrigin: 'center center',
                  }}
                >
                  <motion.div
                    style={{
                      textAlign: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: 'hsl(var(--foreground))',
                      textShadow: '0px 0px 4px hsl(var(--background))',
                      zIndex: 2,
                    }}
                    animate={{ rotate: -angle - (rotation + 270) }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    {t(section.key).toUpperCase()}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
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
