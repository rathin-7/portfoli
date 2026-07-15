import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const IS_TOUCH_DEVICE = (() => {
  if (typeof window === 'undefined') return true;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
})();

const TRAIL_COUNT = 5;
const TRAIL_DECAY = 0.55;

const STATES = {
  default:  { dot: 8,  dotColor: 'rgba(139,92,246,0.9)',  ring: 36, ringColor: 'rgba(139,92,246,0.18)', glow: 12, scale: 1 },
  hover:    { dot: 6,  dotColor: 'rgba(6,182,212,0.85)',  ring: 56, ringColor: 'rgba(6,182,212,0.35)',   glow: 28, scale: 1 },
  button:   { dot: 10, dotColor: 'rgba(139,92,246,1)',     ring: 52, ringColor: 'rgba(139,92,246,0.4)',   glow: 22, scale: 1 },
  text:     { dot: 2,  dotColor: 'rgba(139,92,246,0.95)',  ring: 28, ringColor: 'rgba(139,92,246,0.1)',   glow: 0,  scale: 1 },
  card:     { dot: 48, dotColor: 'rgba(139,92,246,0.06)',  ring: 72, ringColor: 'rgba(139,92,246,0.2)',   glow: 40, scale: 1 },
  link:     { dot: 36, dotColor: 'rgba(6,182,212,0.12)',   ring: 52, ringColor: 'rgba(6,182,212,0.4)',    glow: 24, scale: 1 },
  three:    { dot: 28, dotColor: 'rgba(34,211,238,0.08)',  ring: 64, ringColor: 'rgba(34,211,238,0.25)',  glow: 44, scale: 1 },
  hidden:   { dot: 0,  dotColor: 'transparent',             ring: 0,  ringColor: 'transparent',             glow: 0,  scale: 0 },
};

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const trailRefs = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const rafRef = useRef(null);
  const quickDotX = useRef(null);
  const quickDotY = useRef(null);
  const quickRingX = useRef(null);
  const quickRingY = useRef(null);
  const quickGlowX = useRef(null);
  const quickGlowY = useRef(null);
  const trailPositions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const prevVariant = useRef('default');

  const applyVariant = useCallback((variant) => {
    if (variant === prevVariant.current) return;
    prevVariant.current = variant;
    const s = STATES[variant] || STATES.default;

    gsap.to(dotRef.current, {
      width: s.dot, height: s.dot, backgroundColor: s.dotColor,
      boxShadow: s.glow > 0 ? `0 0 ${s.glow * 0.5}px ${s.dotColor}, 0 0 ${s.glow}px ${s.dotColor}` : 'none',
      duration: 0.3, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(ringRef.current, {
      width: s.ring, height: s.ring, borderColor: s.ringColor,
      duration: 0.35, ease: 'power2.out', overwrite: 'auto',
    });
    gsap.to(glowRef.current, {
      width: s.ring + 24, height: s.ring + 24,
      opacity: s.glow > 0 ? 0.12 : 0,
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
  }, []);

  const spawnRipple = useCallback((x, y) => {
    const container = rippleContainerRef.current;
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'cursor-ripple';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    container.appendChild(el);
    setTimeout(() => el.remove(), 650);
  }, []);

  useEffect(() => {
    if (IS_TOUCH_DEVICE) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    quickDotX.current = gsap.quickTo(dot, 'x', { type: 'x', ease: 'power3.out', duration: 0.15 });
    quickDotY.current = gsap.quickTo(dot, 'y', { type: 'y', ease: 'power3.out', duration: 0.15 });
    quickRingX.current = gsap.quickTo(ring, 'x', { type: 'x', ease: 'power3.out', duration: 0.22 });
    quickRingY.current = gsap.quickTo(ring, 'y', { type: 'y', ease: 'power3.out', duration: 0.22 });
    quickGlowX.current = gsap.quickTo(glow, 'x', { type: 'x', ease: 'power3.out', duration: 0.28 });
    quickGlowY.current = gsap.quickTo(glow, 'y', { type: 'y', ease: 'power3.out', duration: 0.28 });

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.to([dot, ring, glow], { autoAlpha: 1, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      gsap.to([dot, ring, glow], { autoAlpha: 0, duration: 0.25 });
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      gsap.to([dot, ring, glow], { autoAlpha: 1, duration: 0.15 });
    };

    const onMouseDown = (e) => {
      gsap.to(dot, { scale: 0.6, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power2.out' });
      spawnRipple(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    };

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      quickDotX.current?.(mx);
      quickDotY.current?.(my);
      quickRingX.current?.(mx);
      quickRingY.current?.(my);
      quickGlowX.current?.(mx);
      quickGlowY.current?.(my);

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = trailPositions.current[i];
        const target = i === 0
          ? { x: mx, y: my }
          : trailPositions.current[i - 1];
        const ease = TRAIL_DECAY - i * 0.06;
        t.x += (target.x - t.x) * ease;
        t.y += (target.y - t.y) * ease;
        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onHoverStart = (e) => {
      const el = e.target.closest('a, button, input, textarea, [data-cursor], .glass');
      if (!el) { applyVariant('default'); return; }

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.dataset.cursor === 'text') {
        applyVariant('text');
      } else if (el.tagName === 'BUTTON' || el.dataset.cursor === 'button') {
        applyVariant('button');
      } else if (el.tagName === 'A' || el.dataset.cursor === 'link') {
        applyVariant('link');
      } else if (el.dataset.cursor === 'three') {
        applyVariant('three');
      } else if (el.classList.contains('glass') || el.dataset.cursor === 'card') {
        applyVariant('card');
      } else {
        applyVariant('hover');
      }
    };

    const onHoverEnd = (e) => {
      const el = e.target.closest('a, button, input, textarea, [data-cursor], .glass');
      if (el) applyVariant('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onHoverStart, { passive: true });
    document.addEventListener('mouseout', onHoverEnd, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyVariant, spawnRipple]);

  if (IS_TOUCH_DEVICE) return null;

  const dotHalf = STATES.default.dot / 2;
  const ringHalf = STATES.default.ring / 2;
  const glowHalf = (STATES.default.ring + 24) / 2;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      <div ref={rippleContainerRef} style={{ position: 'absolute', inset: 0 }} />

      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            left: 0, top: 0,
            width: `${7 - i}px`,
            height: `${7 - i}px`,
            marginLeft: `${-(3.5 - i * 0.5)}px`,
            marginTop: `${-(3.5 - i * 0.5)}px`,
            borderRadius: '50%',
            background: `rgba(139, 92, 246, ${0.25 - i * 0.04})`,
            willChange: 'transform',
            transform: 'translate3d(-100px, -100px, 0)',
            opacity: 0,
          }}
        />
      ))}

      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: glowHalf * 2, height: glowHalf * 2,
          marginLeft: -glowHalf, marginTop: -glowHalf,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          willChange: 'transform, opacity',
          transform: 'translate3d(-100px, -100px, 0)',
          opacity: 0,
        }}
      />

      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: ringHalf * 2, height: ringHalf * 2,
          marginLeft: -ringHalf, marginTop: -ringHalf,
          borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.18)',
          background: 'rgba(139,92,246,0.02)',
          backdropFilter: 'blur(2px)',
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: dotHalf * 2, height: dotHalf * 2,
          marginLeft: -dotHalf, marginTop: -dotHalf,
          borderRadius: '50%',
          background: 'rgba(139,92,246,0.9)',
          mixBlendMode: 'difference',
          boxShadow: '0 0 6px rgba(139,92,246,0.5), 0 0 12px rgba(139,92,246,0.3)',
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
    </div>
  );
}
