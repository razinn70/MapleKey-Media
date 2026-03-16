import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { galleryItems, galleryCategories, type GalleryItem } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import VideoGallery from '@/components/VideoGallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const ITEMS_PER_PAGE = 12;

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    document.title = 'Portfolio | MapleKey Media';
  }, []);

  const photoItems = useMemo(() => {
    const items = activeCategory === 'All' || activeCategory === 'Photography'
      ? galleryItems.filter((item) => item.category === 'Photography')
      : [];
    return items;
  }, [activeCategory]);

  const shortFormItems = useMemo(() => {
    return activeCategory === 'All' || activeCategory === 'Short-Form'
      ? galleryItems.filter((item) => item.category === 'Short-Form')
      : [];
  }, [activeCategory]);

  const marketingItems = useMemo(() => {
    return activeCategory === 'All' || activeCategory === 'Marketing'
      ? galleryItems.filter((item) => item.category === 'Marketing')
      : [];
  }, [activeCategory]);

  const visiblePhotos = photoItems.slice(0, visibleCount);
  const hasMore = visibleCount < photoItems.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-24">
        <div className="container mx-auto px-6">
          {/* Back + Header */}
          <div className="mb-12">
            <Button asChild variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground -ml-3">
              <Link to="/#portfolio">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Portfolio</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-3">
              Our Work
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Browse our complete collection of real estate photography, videography, drone shots, and short-form content.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                    : 'border-border text-foreground hover:bg-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photography Grid */}
          {visiblePhotos.length > 0 && (
            <>
              <GalleryGrid items={visiblePhotos} columns={4} />
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                    variant="outline"
                    className="gap-2 px-8"
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Video Tours & Drone Section */}
          {(activeCategory === 'All' || activeCategory === 'Video') && (
            <div className={visiblePhotos.length > 0 ? 'mt-20' : ''}>
              <VideoGallery />
            </div>
          )}
          {shortFormItems.length > 0 && (
            <div className={visiblePhotos.length > 0 ? 'mt-20' : ''}>
              <div className="mb-8">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Short-Form</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                  Social Media Reels
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                  Scroll-stopping content crafted for Instagram Reels, TikTok, and YouTube Shorts.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shortFormItems.map((item) => (
                  <div key={item.id} className="relative rounded-lg overflow-hidden aspect-[9/16] bg-muted">
                    {item.instagramUrl ? (
                      <iframe
                        src={`${item.instagramUrl}embed/`}
                        className="w-full h-full border-0"
                        allowFullScreen
                        loading="lazy"
                        title={item.title}
                      />
                    ) : item.videoSrc ? (
                      <video
                        src={item.videoSrc}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marketing Materials Section */}
          {marketingItems.length > 0 && (
            <div className={visiblePhotos.length > 0 || shortFormItems.length > 0 ? 'mt-20' : ''}>
              <div className="mb-8">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Marketing</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                  Marketing Materials
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                  Custom-designed flyers, social graphics, and branding collateral for real estate professionals.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketingItems.map((item) => (
                  <div key={item.id} className="relative rounded-lg overflow-hidden bg-muted shadow-md">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                      <p className="text-muted-foreground text-xs mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
