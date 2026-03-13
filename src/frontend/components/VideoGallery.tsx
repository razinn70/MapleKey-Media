import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  type: 'youtube' | 'instagram';
  embedUrl: string;
  thumbnailUrl?: string;
}

const videoItems: VideoItem[] = [
  {
    id: 'v1',
    title: 'Cinematic Property Tour — Kitchener',
    description: 'A smooth cinematic walkthrough showcasing modern finishes and open-concept living.',
    type: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DUMk5ZhDuTV/embed/',
  },
  {
    id: 'v2',
    title: 'Luxury Home Feature — Waterloo',
    description: 'Dramatic aerial and interior footage highlighting architectural details and landscaping.',
    type: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DVwV5nWDvEy/embed/',
  },
  {
    id: 'v3',
    title: 'Drone Aerial — Cambridge Estate',
    description: 'Sweeping drone footage capturing the property\'s lot, neighborhood, and surrounding amenities.',
    type: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DVeibKdAVf5/embed/',
  },
  {
    id: 'v4',
    title: 'Interior Showcase — Guelph',
    description: 'Beautifully styled interior walkthrough with smooth gimbal movements and natural lighting.',
    type: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DT_qRn2DpXR/embed/',
  },
];

function LazyEmbed({ item }: { item: VideoItem }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative rounded-lg overflow-hidden aspect-[9/16] bg-muted shadow-card">
      {loaded ? (
        <iframe
          src={item.embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          title={item.title}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Play className="w-12 h-12 text-muted-foreground/50" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none">
        <h3 className="font-semibold text-white text-sm">{item.title}</h3>
        <p className="text-white/70 text-xs mt-1 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

const VideoGallery = () => {
  return (
    <div>
      <div className="mb-8">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Video</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
          Video Tours & Drone Footage
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm">
          Cinematic property tours and aerial drone footage that bring listings to life and drive buyer engagement.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {videoItems.map((item) => (
          <LazyEmbed key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
