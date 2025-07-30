import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false;
    let targetScrollY = 0;
    let currentScrollY = 0;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateScroll = () => {
      const distance = Math.abs(targetScrollY - currentScrollY);
      if (distance < 0.1) {
        currentScrollY = targetScrollY;
        window.scrollTo(0, currentScrollY);
        if (!isScrolling) return;
      } else {
        const factor = Math.max(0.12, Math.min(0.5, distance / 120));
        currentScrollY = lerp(currentScrollY, targetScrollY, factor);
        window.scrollTo(0, currentScrollY);
      }

      if (isScrolling || Math.abs(targetScrollY - currentScrollY) >= 0.1) {
        requestAnimationFrame(updateScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY += e.deltaY * 2.5;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

      if (!isScrolling) {
        isScrolling = true;
        updateScroll();
      }

      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        if (Math.abs(targetScrollY - currentScrollY) < 0.1) {
          isScrolling = false;
        }
      }, 120);
    };

    const handleScroll = () => {
      if (!isScrolling) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    scrollTimeout: NodeJS.Timeout;
  }
}
