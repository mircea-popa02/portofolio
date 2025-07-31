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

        if (mostVisibleEntry && maxVisibility > 0.15) { // Require minimum visibility
          const id = `#${mostVisibleEntry.target.id}`;
          const newSection = mostVisibleEntry.target.id;
          
          if (newSection !== currentSection) {
            setCurrentSection(newSection);
            if (location.pathname !== id) {
              navigate(id, { replace: true });
            }
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    sections.forEach((id) => {
      const element = document.querySelector(`#${id}`);
      if (element) {
        observer.observe(element);
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
  }, [currentSection, sectionScrollData?.progress]);

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
