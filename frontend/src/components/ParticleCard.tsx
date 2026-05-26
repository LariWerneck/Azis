import { useRef, useEffect, useCallback, type RefObject, type ReactNode, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import './ParticleCard.css';

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 410;

const getGlowRgb = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--pc-glow-rgb').trim() || '132, 0, 255';

const createParticle = (x: number, y: number): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'pc-particle';
  el.style.cssText = `left:${x}px;top:${y}px;`;
  return el;
};

interface ParticleCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  particleCount?: number;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  enableStars?: boolean;
}

export function ParticleCard({
  children,
  className = '',
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  clickEffect = true,
  enableMagnetism = false,
  enableStars = true,
}: ParticleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticle(Math.random() * width, Math.random() * height)
    );
    particlesInitialized.current = true;
  }, [particleCount]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismRef.current?.kill();
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }, [initializeParticles]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onEnter = () => {
      isHoveredRef.current = true;
      el.style.setProperty('--glow-intensity', '0.85');
      if (enableStars) animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      el.style.setProperty('--glow-intensity', '0');
      if (enableStars) clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
      if (!enableTilt && !enableMagnetism) return;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism) magnetismRef.current = gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
    };

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rgb = getGlowRgb();
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${rgb},0.4) 0%,rgba(${rgb},0.2) 30%,transparent 70%);left:${x - r}px;top:${y - r}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('click', onClick);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('click', onClick);
      clearParticles();
    };
  }, [animateParticles, clearParticles, enableTilt, enableMagnetism, clickEffect, enableStars]);

  return (
    <div ref={cardRef} className={`pc-card pc-border-glow ${className}`} style={style}>
      {children}
    </div>
  );
}

interface GlobalSpotlightProps {
  gridRef: RefObject<HTMLElement | null>;
  spotlightRadius?: number;
}

export function GlobalSpotlight({ gridRef, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }: GlobalSpotlightProps) {
  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'pc-spotlight';
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(var(--pc-glow-rgb),0.15) 0%,rgba(var(--pc-glow-rgb),0.08) 15%,rgba(var(--pc-glow-rgb),0.04) 25%,rgba(var(--pc-glow-rgb),0.02) 40%,rgba(var(--pc-glow-rgb),0.01) 65%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);

    const proximity = spotlightRadius * 0.5;
    const fadeDistance = spotlightRadius * 0.75;

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const section = gridRef.current.closest('.pc-section') ?? gridRef.current;
      const rect = section.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.pc-card');

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      let minDist = Infinity;
      cards.forEach(c => {
        const cr = c.getBoundingClientRect();
        const dist = Math.max(0, Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2)) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, dist);
        const intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        c.style.setProperty('--glow-x', `${((e.clientX - cr.left) / cr.width) * 100}%`);
        c.style.setProperty('--glow-y', `${((e.clientY - cr.top) / cr.height) * 100}%`);
        c.style.setProperty('--glow-intensity', intensity.toString());
        c.style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const onLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>('.pc-card').forEach(c => c.style.setProperty('--glow-intensity', '0'));
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [gridRef, spotlightRadius]);

  return null;
}
