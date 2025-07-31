
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useSmoothScroll(sections: string[]) {
  const [currentSection, setCurrentSection] = useState<string>(sections[0] || '');
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to a section by selector
  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      navigate(selector, { replace: true });
    }
  }, [navigate]);

  // Simple intersection observer to detect current section
  useEffect(() => {
    if (!sections.length) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null;
        let highestRatio = 0;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        }

        // Update current section if we found a better match
        if (bestEntry && bestEntry.target.id) {
          const newSection = bestEntry.target.id;
          if (newSection !== currentSection) {
            setCurrentSection(newSection);
            navigate(`#${newSection}`, { replace: true });
          }
        }
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, currentSection, navigate]);

  // Initialize current section on mount
  useEffect(() => {
    if (sections.length > 0) {
      setCurrentSection(sections[0]);
    }
  }, [sections]);

  return { currentSection, scrollTo };
}
