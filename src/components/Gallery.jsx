"use client";

import { useRef, useCallback, useMemo } from "react";
import { galleryMedia, getMediaUrl } from "@/data/media";
import focalPoints from "@/data/focalPoints.json";

/*
 * GLOBAL FILTER — change this one variable to apply effects to all media.
 * Examples:
 *   "grayscale(100%)"
 *   "grayscale(100%) contrast(1.1)"
 *   "sepia(80%)"
 *   "saturate(1.5)"
 *   "brightness(1.1) contrast(1.05)"
 *   "none"
 */
const GLOBAL_FILTER = "grayscale(100%)";

const SIDE_IMAGES = 20; // images per side column

function VideoCell({ src, className }) {
  const videoRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, []);

  return (
    <div
      className={`${className} gallery-cell`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="gallery-media"
      />
      <div className="play-indicator">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

function ImageCell({ src, className, objectPosition }) {
  return (
    <div className={`${className} gallery-cell`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="gallery-media"
        style={{ objectPosition }}
      />
    </div>
  );
}

function MediaItem({ item, className }) {
  const url = getMediaUrl(item.filename);
  if (item.type === "video") {
    return <VideoCell src={url} className={className || ""} />;
  }
  return (
    <ImageCell
      src={url}
      className={className || ""}
      objectPosition={focalPoints[item.filename] || "50% 50%"}
    />
  );
}

function SideColumn({ items }) {
  return (
    <div className="side-gallery-col">
      {items.map((item) => (
        <MediaItem key={item.filename} item={item} />
      ))}
    </div>
  );
}

export function useGalleryMedia() {
  return useMemo(() => {
    const items = [...galleryMedia];
    items.sort((a, b) => {
      const ha = Array.from(a.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      const hb = Array.from(b.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      return ha - hb;
    });

    // Split: images only for side columns (no videos), rest for main grid
    const images = items.filter((i) => i.type === "image");
    const leftItems = images.slice(0, SIDE_IMAGES);
    const rightItems = images.slice(SIDE_IMAGES, SIDE_IMAGES * 2);
    const usedFilenames = new Set([...leftItems, ...rightItems].map((i) => i.filename));
    const mainItems = items.filter((i) => !usedFilenames.has(i.filename));

    return { leftItems, rightItems, mainItems };
  }, []);
}

export function SideGalleryLeft({ items }) {
  return (
    <div className="side-gallery-col" style={{ "--gallery-filter": GLOBAL_FILTER }}>
      {items.map((item) => (
        <MediaItem key={item.filename} item={item} />
      ))}
    </div>
  );
}

export function SideGalleryRight({ items }) {
  return (
    <div className="side-gallery-col" style={{ "--gallery-filter": GLOBAL_FILTER }}>
      {items.map((item) => (
        <MediaItem key={item.filename} item={item} />
      ))}
    </div>
  );
}

export default function Gallery({ items }) {
  const allMedia = useMemo(() => {
    if (items) return items;
    const all = [...galleryMedia];
    all.sort((a, b) => {
      const ha = Array.from(a.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      const hb = Array.from(b.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      return ha - hb;
    });
    return all;
  }, [items]);

  return (
    <div
      className="gallery-section"
      style={{ "--gallery-filter": GLOBAL_FILTER }}
    >
      <div className="gallery-grid">
        {allMedia.map((item) => {
          const spanClass = `span-${item.span}`;
          return <MediaItem key={item.filename} item={item} className={spanClass} />;
        })}
      </div>
    </div>
  );
}
