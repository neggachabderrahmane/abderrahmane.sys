import { useEffect, useRef, useCallback } from 'react';

/**
 * Automatically discovers image frame paths in /src/assets/image
 */
const getDefaultFrames = () => {
  try {
    const glob = import.meta.glob(
      [
        '/src/assets/image/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
        '../assets/image/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}'
      ],
      {
        eager: true,
        import: 'default'
      }
    );

    const entries = Object.entries(glob);
    if (entries.length > 0) {
      const map = new Map();
      entries.forEach(([path, url]) => {
        const filename = path.split('/').pop();
        if (filename && !map.has(filename)) {
          map.set(filename, { path, url });
        }
      });

      const uniqueEntries = Array.from(map.values());
      uniqueEntries.sort((a, b) => {
        const matchA = a.path.match(/(\d+)(?=\.[^.]+$)/);
        const matchB = b.path.match(/(\d+)(?=\.[^.]+$)/);
        const numA = matchA ? parseInt(matchA[1], 10) : 0;
        const numB = matchB ? parseInt(matchB[1], 10) : 0;
        return numA - numB;
      });

      return uniqueEntries.map((item) => item.url);
    }
  } catch (e) {
    console.warn('ScrollCanvasBackground: Automatic asset discovery fallback', e);
  }

  // Fallback for 77 sequential frames
  return Array.from({ length: 77 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return new URL(`../assets/image/ezgif-frame-${num}.jpg`, import.meta.url).href;
  });
};

/**
 * ScrollCanvasBackground Component
 * Renders an HTML5 <canvas> fixed in the background (inset: 0, z-index: -1).
 * Features Promise.all() parallel preloading, rAF decoupled render loop, and top-anchored aspect ratio scaling.
 */
export default function ScrollCanvasBackground({
  images: customImages,
  frameCount: customFrameCount,
  getFrameUrl,
  onLoadProgress,
  onAllLoaded,
  yAnchor = 0.0, // Top-anchored so face/head is never cropped on widescreen
  xAnchor = 0.5, // Center-aligned horizontally
  className = '',
  style = {}
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const rafIdRef = useRef(null);

  // Resolve frame URLs
  const frameUrls = (() => {
    if (customImages && customImages.length > 0) {
      return customImages;
    }
    if (getFrameUrl) {
      const count = customFrameCount || 77;
      const urls = [];
      for (let i = 0; i < count; i++) {
        urls.push(getFrameUrl(i));
      }
      return urls;
    }
    return getDefaultFrames();
  })();

  const totalFrames = frameUrls.length || customFrameCount || 77;

  // Draw specific frame onto canvas with top-anchored cover scaling
  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Scale to cover viewport proportionally
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const drawWidth = imgWidth * scale;
      const drawHeight = imgHeight * scale;

      // Position: horizontally centered, vertically top-anchored
      const x = (canvasWidth - drawWidth) * xAnchor;
      const y = (canvasHeight - drawHeight) * yAnchor;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    },
    [xAnchor, yAnchor]
  );

  // Sync canvas width and height to current window dimensions
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      drawFrame(frameIndexRef.current);
    }
  }, [drawFrame]);

  // Calculate image index mapped from scroll percentage (0 to totalFrames - 1)
  const calculateFrameIndex = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;

    const maxScroll = Math.max(1, scrollHeight - clientHeight);
    const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));

    const nextIndex = Math.min(
      totalFrames - 1,
      Math.floor(scrollFraction * totalFrames)
    );

    return nextIndex;
  }, [totalFrames]);

  // Decoupled rAF scroll handler to eliminate frame drops during touch scroll & wheel
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const targetIndex = calculateFrameIndex();
      if (targetIndex !== frameIndexRef.current) {
        frameIndexRef.current = targetIndex;
        drawFrame(targetIndex);
      }
    });
  }, [calculateFrameIndex, drawFrame]);

  // Preload all 77 images in parallel using Promise.all()
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    const preloadedImages = new Array(totalFrames);

    updateCanvasDimensions();

    if (totalFrames === 0) return;

    // Create a promise for each image asset
    const imagePromises = frameUrls.map((url, i) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
          if (!mounted) return resolve();
          loadedCount++;
          if (onLoadProgress) {
            onLoadProgress(loadedCount / totalFrames, loadedCount, totalFrames);
          }
          // Draw frame 0 immediately when available
          if (i === 0) {
            drawFrame(0);
          }
          resolve(img);
        };

        img.onerror = () => {
          if (!mounted) return resolve();
          console.warn(`Asset load warning at frame ${i}: ${url}`);
          loadedCount++;
          if (onLoadProgress) {
            onLoadProgress(loadedCount / totalFrames, loadedCount, totalFrames);
          }
          resolve(img);
        };

        preloadedImages[i] = img;
      });
    });

    imagesRef.current = preloadedImages;

    // Execute Promise.all across all 77 frame instances
    Promise.all(imagePromises).then(() => {
      if (!mounted) return;
      if (onAllLoaded) onAllLoaded();

      const initialIndex = calculateFrameIndex();
      frameIndexRef.current = initialIndex;
      drawFrame(initialIndex);
    });

    return () => {
      mounted = false;
    };
  }, [frameUrls, totalFrames, updateCanvasDimensions, calculateFrameIndex, drawFrame, onLoadProgress, onAllLoaded]);

  // Attach passive scroll, touchmove, wheel, resize, and orientationchange listeners
  useEffect(() => {
    const onResize = () => {
      updateCanvasDimensions();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, updateCanvasDimensions]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        objectFit: 'cover',
        ...style
      }}
    />
  );
}
