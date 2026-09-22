import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    observersRef.current.forEach(o => o.disconnect());
    observersRef.current = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observersRef.current.push(observer);
    });

    return () => observersRef.current.forEach(o => o.disconnect());
  }, [sectionIds.join(',')]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return { activeSection, scrollToSection };
}
