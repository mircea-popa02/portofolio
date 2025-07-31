import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSmoothScroll = (sections: string[]) => {
  const [currentSection, setCurrentSection] = useState('');
  const [sectionScrollData, setSectionScrollData] = useState({ 
    progress: 0, 
    remaining: 1,
    nextProgress: 0,
    prevProgress: 0 
  });
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback((selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
      navigate(selector, { replace: true });
    }
  }, [navigate]);

  const detectCurrentSectionFallback = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = scrollTop + rect.top;
        const elementBottom = elementTop + rect.height;
        
        // Check if section is currently in view
        if (scrollTop >= elementTop - viewportHeight * 0.5 && 
            scrollTop < elementBottom - viewportHeight * 0.3) {
          return sectionId;
        }
      }
    }
    
    return sections[0]; // Default to first section
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry: IntersectionObserverEntry | null = null;
        let maxVisibility = 0;

        // Find the entry with the highest visibility ratio
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Calculate a weighted visibility score
            const rect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // How much of the element is visible in the viewport
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            // Normalize by the smaller of viewport height or element height
            const visibilityRatio = visibleHeight / Math.min(rect.height, viewportHeight);
            
            // Prefer elements that are centered in the viewport (give them a bonus)
            const distanceFromCenter = Math.abs((rect.top + rect.bottom) / 2 - viewportHeight / 2);
            const centeringFactor = 1 - (distanceFromCenter / (viewportHeight / 2)) * 0.3; // Up to 30% bonus for centering
            
            const totalVisibility = visibilityRatio * centeringFactor;
            
            if (totalVisibility > maxVisibility) {
              maxVisibility = totalVisibility;
              mostVisibleEntry = entry;
            }
          }
        }

        if (mostVisibleEntry && maxVisibility > 0.1) { // Lower threshold for more reliable detection
          const id = `#${mostVisibleEntry.target.id}`;
          const newSection = mostVisibleEntry.target.id;
          
          if (newSection !== currentSection) {
            console.log(`Section changed: ${currentSection} -> ${newSection}, visibility: ${maxVisibility.toFixed(3)}`);
            setCurrentSection(newSection);
            if (location.pathname !== id) {
              navigate(id, { replace: true });
            }
          }
        }
      },
      {
        rootMargin: '-10% 0px -10% 0px', // Slightly smaller detection area for more precise detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    sections.forEach((id) => {
      const element = document.querySelector(`#${id}`);
      if (element) {
        observer.observe(element);
        console.log(`Observing section: ${id}`);
      } else {
        console.warn(`Section element not found: ${id}`);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections, navigate, location.pathname, currentSection]);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        // Fallback section detection if IntersectionObserver fails
        if (!currentSection) {
          const fallbackSection = detectCurrentSectionFallback();
          if (fallbackSection && fallbackSection !== currentSection) {
            console.log(`Fallback detection: ${fallbackSection}`);
            setCurrentSection(fallbackSection);
            navigate(`#${fallbackSection}`, { replace: true });
          }
        }
        
        if (!currentSection) {
          setSectionScrollData({ 
            progress: 0, 
            remaining: 1,
            nextProgress: 0,
            prevProgress: 0
          });
          return;
        }
        
        const element = document.getElementById(currentSection);
        if (!element) return;

        const { top, bottom, height } = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        let progress = 0;
        
        // More reliable progress calculation
        if (height <= viewportHeight) {
          // For sections smaller than or equal to viewport height
          if (top <= 0 && bottom >= 0) {
            // Section is crossing the viewport
            const visibleFromTop = Math.min(viewportHeight, bottom);
            const totalPassedHeight = Math.min(height, Math.abs(top) + visibleFromTop);
            progress = Math.min(1, totalPassedHeight / height);
          } else if (top > 0) {
            // Section hasn't started scrolling yet
            progress = 0;
          } else {
            // Section has completely passed
            progress = 1;
          }
        } else {
          // For sections larger than viewport height
          if (top <= 0) {
            // Calculate how much of the section has been scrolled through
            const scrolledDistance = Math.abs(top);
            const maxScrollDistance = height - viewportHeight;
            progress = Math.min(1, scrolledDistance / maxScrollDistance);
          } else {
            // Section hasn't started yet
            progress = 0;
          }
        }
        
        // Apply a more subtle easing function for smoother transitions
        const smoothProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Calculate opposing progress values for next and previous navigation
        // Use a more responsive curve for better visual feedback
        // nextProgress starts at 0 and increases as we scroll down through the section
        const nextProgress = Math.min(1, Math.pow(smoothProgress, 0.8) * 1.1);
        // prevProgress starts at 1 and decreases as we scroll down through the section  
        const prevProgress = Math.max(0, Math.pow(1 - smoothProgress, 0.8));

        setSectionScrollData({ 
          progress: smoothProgress, 
          remaining: 1 - smoothProgress,
          nextProgress: nextProgress,
          prevProgress: prevProgress
        });
        
        // Track significant changes in progress for debugging
        if (Math.abs(smoothProgress - (sectionScrollData?.progress || 0)) > 0.01) {
          console.log(`Section: ${currentSection}, Raw: ${progress.toFixed(3)}, Smooth: ${smoothProgress.toFixed(3)}, Next: ${nextProgress.toFixed(3)}, Prev: ${prevProgress.toFixed(3)}, Top: ${element.getBoundingClientRect().top.toFixed(0)}px`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [currentSection, sectionScrollData?.progress, detectCurrentSectionFallback, navigate]);

  useEffect(() => {
    if (location.pathname === '/' && sections.length > 0) {
      setCurrentSection(sections[0]);
    } else {
      const sectionId = location.pathname.slice(1);
      if (sections.includes(sectionId)) {
        setCurrentSection(sectionId);
        document.querySelector(`#${sectionId}`)?.scrollIntoView();
      }
    }
  }, [location.pathname, sections]);

  return { currentSection, scrollTo, sectionScrollData };
};
