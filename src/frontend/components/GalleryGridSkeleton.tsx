import { Skeleton } from '@/components/ui/skeleton';

interface GalleryGridSkeletonProps {
  count?: number;
  columns?: 3 | 4;
}

const GalleryGridSkeleton = ({ count = 6, columns = 3 }: GalleryGridSkeletonProps) => {
  const colClass = columns === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${colClass} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
      ))}
    </div>
  );
};

export default GalleryGridSkeleton;
