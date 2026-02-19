import { useState } from 'react';
import { Eye } from 'lucide-react';
import { GalleryItem } from '@/data/gallery';
import GalleryLightbox from '@/components/GalleryLightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  columns?: 3 | 4;
}

const GalleryGrid = ({ items, columns = 3 }: GalleryGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const colClass = columns === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid ${colClass} gap-4`}>
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2 text-secondary-foreground font-medium text-sm">
                <Eye className="w-5 h-5" />
                View
              </div>
            </div>
          </button>
        ))}
      </div>

      <GalleryLightbox
        items={items}
        currentIndex={currentIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onNavigate={setCurrentIndex}
      />
    </>
  );
};

export default GalleryGrid;
