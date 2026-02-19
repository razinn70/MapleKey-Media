import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { GalleryItem } from '@/data/gallery';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox = ({ items, currentIndex, open, onOpenChange, onNavigate }: GalleryLightboxProps) => {
  const current = items[currentIndex];

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, goNext, goPrev]);

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-secondary border-secondary-foreground/10 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{current.title}</DialogTitle>
        </VisuallyHidden>

        <div className="relative">
          {/* Image */}
          <div className="relative aspect-[4/3] bg-secondary">
            <img
              src={current.src}
              alt={current.alt}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Prev */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-secondary-foreground hover:bg-secondary transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-secondary-foreground hover:bg-secondary transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Close */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-secondary-foreground hover:bg-secondary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-6 pb-5 pt-3">
          <h3 className="font-display text-lg font-bold text-secondary-foreground">{current.title}</h3>
          <span className="text-primary text-sm font-medium">{current.category}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryLightbox;
