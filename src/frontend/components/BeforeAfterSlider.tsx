import { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfterPairs } from '@/data/beforeAfter';

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
}

const ComparisonSlider = ({ beforeSrc, afterSrc, beforeLabel, afterLabel, title }: SliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2));
    else if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2));
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-bold text-foreground">{title}</h3>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-lg overflow-hidden cursor-col-resize select-none bg-muted"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* After image (full background) */}
        <img
          src={afterSrc}
          alt={`${afterLabel} - ${title}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={beforeSrc}
            alt={`${beforeLabel} - ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth ?? 100}px`, maxWidth: 'none' }}
            loading="lazy"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-foreground rounded-full shadow-elevated flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground">
              <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  if (beforeAfterPairs.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Difference</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            See the MapleKey Effect
          </h2>
          <p className="text-lg text-muted-foreground">
            Drag the slider to compare standard listing photos with our professional media. The difference sells homes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {beforeAfterPairs.map((pair) => (
            <ComparisonSlider
              key={pair.id}
              beforeSrc={pair.beforeSrc}
              afterSrc={pair.afterSrc}
              beforeLabel={pair.beforeLabel}
              afterLabel={pair.afterLabel}
              title={pair.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
