

import { useState, useEffect, useCallback } from 'react';
export function useSmoothScroll(sections: string[]) {
  const [currentSection, setCurrentSection] = useState<string>(sections[0] || '');

  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!sections.length) return;

    const handleScroll = () => {
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return { currentSection, scrollTo };
}
