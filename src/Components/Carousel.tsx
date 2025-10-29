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
  const [index, setIndex] = useState(startIndex);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Determine slides per view responsively
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const maxStartIndex = useMemo(() => {
    return Math.max(0, images.length - slidesPerView);
  }, [images.length, slidesPerView]);

  useEffect(() => {
    // Clamp index when slidesPerView changes
    setIndex((prev) => Math.min(prev, maxStartIndex));
  }, [maxStartIndex]);

  const safeModulo = (value: number, mod: number) => {
    if (mod <= 0) return 0;
    return ((value % mod) + mod) % mod;
  };

  const go = (delta: number) => {
    setIndex((i) => {
      const pages = maxStartIndex + 1; // total starting positions
      if (pages <= 1) return 0;
      if (loop) {
        const target = safeModulo(i + delta, pages);
        return target;
      }
      return Math.max(0, Math.min(i + delta, maxStartIndex));
    });
  };

  const next = () => go(1);
  const prev = () => go(-1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    touchStartTime.current = Date.now();
    if (pauseOnHover) setIsHovered(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const threshold = 50; // px
    const dx = touchDeltaX.current;
    const dt = Math.max(1, Date.now() - touchStartTime.current); // ms
    const velocity = Math.abs(dx) / dt; // px per ms
    // Estimate slide width to decide if we should jump 2 slides
    const width = containerRef.current?.offsetWidth ?? 0;
    const perSlide = slidesPerView > 0 ? width / slidesPerView : width;
    let steps = 0;
    if (Math.abs(dx) > threshold || velocity > 0.6) steps = 1;
    if (Math.abs(dx) > perSlide * 0.6 || velocity > 1.2) steps = 2;

    if (dx > 0 && steps > 0) go(-steps);
    if (dx < 0 && steps > 0) go(steps);
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (pauseOnHover) setTimeout(() => setIsHovered(false), 100);
  };

  const pages = Math.max(1, images.length - slidesPerView + 1);
  const currentPage = Math.min(index, pages - 1);

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

  return (
    <div
      className={`carousel ${className ?? ''}`}
      ref={containerRef}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{ ['--slides-per-view' as any]: String(slidesPerView) }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      onFocus={() => pauseOnHover && setIsHovered(true)}
      onBlur={() => pauseOnHover && setIsHovered(false)}
    >
      <button className="carousel-btn prev" aria-label="Previous" onClick={prev}>
        ‹
      </button>

      <div
        className="carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${(index * 100) / slidesPerView}%)` }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`slide ${img.kind === 'kanvasa' ? 'kanvasa' : ''}`}
              style={{ ['--bg-image' as any]: `url(${img.src})` }}
            >
              <div className="media-box">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
              <span className="chip" aria-hidden="true">{img.alt}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" aria-label="Next" onClick={next}>
        ›
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Slides">
        {Array.from({ length: pages }).map((_, p) => (
          <button
            key={p}
            role="tab"
            aria-selected={p === currentPage}
            className={`dot ${p === currentPage ? 'active' : ''}`}
            onClick={() => setIndex(Math.min(p, maxStartIndex))}
          />
        ))}
      </div>
    </div>
  );
}

// Autoplay effect
// Keep effect at bottom to have access to latest props and state
// Note: React hooks must be top-level; however, we can place another effect below the component body is not valid.
// The autoplay effect should be inside the component; adding here for clarity would break rules.
