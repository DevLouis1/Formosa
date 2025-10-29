import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Carousel.css';

export type CarouselImage = {
  src: string;
  alt: string;
  kind?: 'default' | 'kanvasa';
};

type CarouselProps = {
  images: CarouselImage[];
  startIndex?: number;
  className?: string;
  autoplay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
};

export default function Carousel({
  images,
  startIndex = 0,
  className,
  autoplay = false,
  intervalMs = 3500,
  pauseOnHover = true,
  loop = true,
}: CarouselProps) {
  const CLONES = 2; // number of clones on each side for seamless loop
  const [position, setPosition] = useState(startIndex + (loop ? CLONES : 0));
  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragDX, setDragDX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [noTransition, setNoTransition] = useState(false);

  // Determine slides per view responsively
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 1400) setSlidesPerView(1);
      else setSlidesPerView(2); // very wide screens can show two cleanly
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const maxStartIndex = useMemo(() => {
    return Math.max(0, images.length - slidesPerView);
  }, [images.length, slidesPerView]);

  const extendedImages = useMemo(() => {
    if (!loop) return images;
    const head = images.slice(0, CLONES);
    const tail = images.slice(-CLONES);
    return [...tail, ...images, ...head];
  }, [images, loop]);

  useEffect(() => {
    // Clamp index when slidesPerView changes (non-looping only)
    if (!loop) setPosition((prev) => Math.min(prev, maxStartIndex));
  }, [maxStartIndex, loop]);

  // helper removed (not needed with clone-based looping)

  const go = (delta: number) => {
    if (loop) {
      setPosition((i) => i + delta);
    } else {
      setPosition((i) => Math.max(0, Math.min(i + delta, maxStartIndex)));
    }
  };

  // next/prev controls removed along with arrow buttons

  // keyboard navigation removed (no arrows/dots UI)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    touchStartTime.current = Date.now();
    if (pauseOnHover) setIsHovered(true);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    setDragDX(touchDeltaX.current);
  };

  const onTouchEnd = () => {
    const threshold = 80; // require a bit more distance
    const dx = touchDeltaX.current;
    const dt = Math.max(1, Date.now() - touchStartTime.current); // ms
    const velocity = Math.abs(dx) / dt; // px per ms
    // Estimate slide width to decide if we should jump 2 slides
    const width = containerRef.current?.offsetWidth ?? 0;
    const perSlide = slidesPerView > 0 ? width / slidesPerView : width;
    let steps = 0;
    if (Math.abs(dx) > threshold || velocity > 0.9) steps = 1;
    if (Math.abs(dx) > perSlide * 0.8 || velocity > 1.5) steps = 2;

    if (dx > 0 && steps > 0) go(-steps);
    if (dx < 0 && steps > 0) go(steps);
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setDragDX(0);
    setIsDragging(false);
    if (pauseOnHover) setTimeout(() => setIsHovered(false), 100);
  };

  // Pointer (mouse/touch) dragging for desktop
  const pointerStartX = useRef<number | null>(null);
  const pointerStartTime = useRef<number>(0);
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    pointerStartTime.current = Date.now();
    setIsDragging(true);
    setNoTransition(false);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    if (pauseOnHover) setIsHovered(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerStartX.current == null) return;
    const dx = e.clientX - pointerStartX.current;
    setDragDX(dx);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current == null) return;
    const dx = e.clientX - pointerStartX.current;
    const dt = Math.max(1, Date.now() - pointerStartTime.current);
    const velocity = Math.abs(dx) / dt;
    const width = containerRef.current?.offsetWidth ?? 0;
    const perSlide = slidesPerView > 0 ? width / slidesPerView : width;
    let steps = 0;
    if (Math.abs(dx) > 80 || velocity > 0.9) steps = 1;
    if (Math.abs(dx) > perSlide * 0.8 || velocity > 1.5) steps = 2;
    if (dx > 0 && steps > 0) go(-steps);
    if (dx < 0 && steps > 0) go(steps);
    pointerStartX.current = null;
    setDragDX(0);
    setIsDragging(false);
    if (pauseOnHover) setTimeout(() => setIsHovered(false), 100);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // pagination UI removed; pages computed implicitly when needed elsewhere

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;
    if (pauseOnHover && isHovered) return;
    const id = window.setInterval(() => {
      go(1);
    }, Math.max(1000, intervalMs));
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, pauseOnHover, isHovered, intervalMs, loop, maxStartIndex, slidesPerView]);

  // After each transition, if looping with clones, snap back to the real index range without animation
  const onTransitionEnd = () => {
    if (!loop) return;
    const total = images.length;
    if (position >= total + CLONES) {
      // jumped to clones at the end -> snap back
      setNoTransition(true);
      setPosition((p) => p - total);
      requestAnimationFrame(() => setNoTransition(false));
    } else if (position < CLONES) {
      setNoTransition(true);
      setPosition((p) => p + total);
      requestAnimationFrame(() => setNoTransition(false));
    }
  };

  return (
    <div
      className={`carousel ${className ?? ''}`}
      ref={containerRef}
      style={{ ['--slides-per-view' as any]: String(slidesPerView) }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      // focus handlers not needed without keyboard controls
    >
      <div
        className="carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className={`carousel-track ${isDragging ? 'dragging' : ''} ${noTransition ? 'no-transition' : ''}`}
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(calc(-${(position * 100) / slidesPerView}% + ${(dragDX / (containerRef.current?.offsetWidth || 1)) * 100}%))`,
          }}
        >
          {extendedImages.map((img, i) => (
            <div
              key={i}
              className={`slide ${img.kind === 'kanvasa' ? 'kanvasa' : ''}`}
              style={{ ['--bg-image' as any]: `url(${img.src})` }}
            >
              <div className="media-box">
                <div className="media-inner">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              </div>
              <span className="chip" aria-hidden="true">{img.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Autoplay effect
// Keep effect at bottom to have access to latest props and state
// Note: React hooks must be top-level; however, we can place another effect below the component body is not valid.
// The autoplay effect should be inside the component; adding here for clarity would break rules.
