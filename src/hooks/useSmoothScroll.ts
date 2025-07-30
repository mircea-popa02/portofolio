import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSmoothScroll = (sections: string[]) => {
  const [currentSection, setCurrentSection] = useState('');
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            setCurrentSection(entry.target.id);
            if (location.pathname !== id) {
              navigate(id, { replace: true });
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
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
  }, [sections, navigate, location.pathname]);

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

  return { currentSection, scrollTo };
};
