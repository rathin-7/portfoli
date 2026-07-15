import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
};

export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (!options.repeat) observer.unobserve(el);
      } else if (options.repeat) {
        setIsInView(false);
      }
    }, { threshold: options.threshold || 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.repeat]);
  return [ref, isInView];
};

export const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouse = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);
  return pos;
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const isRunningRef = useRef(false);
  const ref = useRef(null);

  const trigger = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isRunningRef.current = false;
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return [count, ref, trigger];
};
