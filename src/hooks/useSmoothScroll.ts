
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SectionScrollData {
  progress: number;
  remaining: number;
  nextProgress: number;
  prevProgress: number;
}

export function useSmoothScroll(sections: string[]) {
  const [currentSection, setCurrentSection] = useState<string>('');
  const [scrollData, setScrollData] = useState<SectionScrollData>({
    progress: 0,
    remaining: 1,
    nextProgress: 0,
    prevProgress: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to a section by selector
  const scrollTo = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      navigate(selector, { replace: true });
    }
  }, [navigate]);

  // Fallback: detect section by scroll position
  const detectSectionFallback = useCallback(() => {
    const viewport = window.innerHeight;
    const scrollY = window.scrollY;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const elTop = scrollY + rect.top;
        const elBottom = elTop + rect.height;
        if (scrollY >= elTop - viewport * 0.5 && scrollY < elBottom - viewport * 0.3) {
          return id;
        }
      }
    }
    return sections[0] || '';
  }, [sections]);

  // IntersectionObserver for section detection
  useEffect(() => {
    if (!sections.length) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new window.IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        let bestScore = 0;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const vh = window.innerHeight;
            const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
            const ratio = visible / Math.min(rect.height, vh);
            const centerDist = Math.abs((rect.top + rect.bottom) / 2 - vh / 2);
            const centerBonus = 1 - (centerDist / (vh / 2)) * 0.3;
            const score = ratio * centerBonus;
            if (score > bestScore) {
              bestScore = score;
              best = entry;
            }
          }
        }
        if (best && bestScore > 0.1) {
          const id = best.target.id;
          if (id && id !== currentSection) {
            setCurrentSection(id);
            if (location.pathname !== `#${id}`) {
              navigate(`#${id}`, { replace: true });
            }
          }
        }
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, currentSection, navigate, location.pathname]);

  // Scroll progress calculation
  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const id = currentSection || detectSectionFallback();
        if (!id) {
          setScrollData({ progress: 0, remaining: 1, nextProgress: 0, prevProgress: 0 });
          return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const { top, bottom, height } = el.getBoundingClientRect();
        const vh = window.innerHeight;
        let progress = 0;
        if (height <= vh) {
          if (top <= 0 && bottom >= 0) {
            const visible = Math.min(vh, bottom);
            const passed = Math.min(height, Math.abs(top) + visible);
            progress = Math.min(1, passed / height);
          } else if (top > 0) {
            progress = 0;
          } else {
            progress = 1;
          }
        } else {
          if (top <= 0) {
            const scrolled = Math.abs(top);
            const maxScroll = height - vh;
            progress = Math.min(1, scrolled / maxScroll);
          } else {
            progress = 0;
          }
        }
        const smooth = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const nextProgress = Math.min(1, Math.pow(smooth, 0.8) * 1.1);
        const prevProgress = Math.max(0, Math.pow(1 - smooth, 0.8));
        setScrollData({
          progress: smooth,
          remaining: 1 - smooth,
          nextProgress,
          prevProgress,
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentSection, detectSectionFallback]);

  // Sync section with location on mount
  useEffect(() => {
    if (!sections.length) return;
    if (location.pathname === '/' && sections[0]) {
      setCurrentSection(sections[0]);
    } else {
      const id = location.pathname.replace(/^#?\/?/, '');
      if (sections.includes(id)) {
        setCurrentSection(id);
        document.getElementById(id)?.scrollIntoView();
      }
    }
  }, [location.pathname, sections]);

  return { currentSection, scrollTo, sectionScrollData: scrollData };
}
