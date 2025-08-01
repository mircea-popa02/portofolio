import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const previousPosition = useRef({ x: 0, y: 0 });
  const speedHistory = useRef<number[]>([]);

  // Optional: Add this for debugging mouse speed
  // console.log('Mouse speed:', mouseSpeed);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Don't add mouse listeners on mobile
    if (isMobile) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate mouse speed
      const deltaX = newX - previousPosition.current.x;
      const deltaY = newY - previousPosition.current.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Add to speed history and keep only last 5 values
      speedHistory.current.push(speed);
      if (speedHistory.current.length > 5) {
        speedHistory.current.shift();
      }
      
      // Calculate average speed
      const avgSpeed = speedHistory.current.reduce((sum, s) => sum + s, 0) / speedHistory.current.length;
      setMouseSpeed(avgSpeed);
      
      // Update glow intensity based on speed (0.2 to 0.8 range)
      const normalizedSpeed = Math.min(avgSpeed / 20, 1); // Normalize to 0-1
      setGlowIntensity(0.2 + (normalizedSpeed * 0.6));
      
      setMousePosition({ x: newX, y: newY });
      previousPosition.current = { x: newX, y: newY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners only for interactive elements (no border effects)
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Dynamic glow effect that responds to mouse speed */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
        }}
      >
        <div 
          className="w-[160px] h-[160px] rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(120, 119, 198, ${glowIntensity * 0.4}) 0%, 
              rgba(120, 119, 198, ${glowIntensity * 0.2}) 30%, 
              rgba(120, 119, 198, ${glowIntensity * 0.1}) 60%, 
              transparent 80%
            )`,
            filter: 'blur(12px)',
            opacity: isHovering ? 0.8 : 0.6,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </motion.div>
      
      {/* Inner focused glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
        }}
      >
        <div 
          className="w-[80px] h-[80px] rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(var(--primary), ${glowIntensity * 0.6}) 0%, 
              rgba(var(--primary), ${glowIntensity * 0.3}) 40%, 
              rgba(var(--primary), ${glowIntensity * 0.1}) 70%, 
              transparent 90%
            )`,
            filter: 'blur(6px)',
            opacity: isHovering ? 1 : 0.7,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </motion.div>
      
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 4000,
          damping: 100,
        }}
        style={{
          boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(var(--primary), ${glowIntensity})`,
        }}
      />
      
      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border-2 border-primary rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        style={{
          boxShadow: `0 0 ${15 + glowIntensity * 20}px rgba(var(--primary), ${glowIntensity * 0.5})`,
        }}
      />
    </>
  );
}
