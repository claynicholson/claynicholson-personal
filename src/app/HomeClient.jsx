"use client";

import { useMemo, useRef, useCallback, useEffect } from "react";
import { galleryMedia, getMediaUrl } from "@/data/media";
import focalPoints from "@/data/focalPoints.json";
import {
  HeroCard,
  AboutCard,
  PastCard,
  PresentCard,
  FutureCard,
  ExperienceCard,
  ProjectsCard,
  ResearchCard,
  AwardsCard,
  RoboticsCard,
  LeadershipCard,
  EducationCard,
  HackathonsCard,
  BlogCard,
  OutroCard,
} from "@/components/ContentCards";

const GLOBAL_FILTER = "grayscale(100%)";

function VideoCell({ src, className }) {
  const videoRef = useRef(null);
  const handleMouseEnter = useCallback(() => {
    const v = videoRef.current;
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  }, []);
  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; }
  }, []);

  return (
    <div className={`${className} gallery-cell`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video ref={videoRef} src={src} muted loop playsInline preload="metadata" className="gallery-media gallery-media-video" />
      <div className="play-indicator">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  );
}

function ImageCell({ src, className, objectPosition }) {
  return (
    <div className={`${className} gallery-cell`}>
      <img src={src} alt="" loading="lazy" decoding="async" className="gallery-media" style={{ objectPosition }} />
    </div>
  );
}

function MediaItem({ item }) {
  const url = getMediaUrl(item.filename);
  const spanClass = `span-${item.span}`;
  if (item.type === "video") {
    return <VideoCell src={url} className={spanClass} />;
  }
  return <ImageCell src={url} className={spanClass} objectPosition={focalPoints[item.filename] || "50% 50%"} />;
}

// size: "sm" = 3 cols (1 lane), "lg" = 6 cols (2 lanes). Row span is fit to the
// card's text at runtime, so it never carries excess empty space.
const CONTENT_INSERTS = [
  { at: 0,   Component: HeroCard,       key: "hero",       size: "sm" },
  { at: 6,   Component: AboutCard,      key: "about",      size: "sm" },
  { at: 12,  Component: PastCard,       key: "past",       size: "sm" },
  { at: 18,  Component: PresentCard,    key: "present",    size: "sm" },
  { at: 24,  Component: FutureCard,     key: "future",     size: "sm" },
  { at: 30,  Component: ExperienceCard, key: "experience", size: "lg" },
  { at: 38,  Component: ProjectsCard,   key: "projects",   size: "lg" },
  { at: 52,  Component: ResearchCard,   key: "research",   size: "lg" },
  { at: 62,  Component: AwardsCard,     key: "awards",     size: "lg" },
  { at: 74,  Component: RoboticsCard,   key: "robotics",   size: "sm" },
  { at: 82,  Component: LeadershipCard, key: "leadership", size: "sm" },
  { at: 88,  Component: EducationCard,  key: "education",  size: "sm" },
  { at: 96,  Component: HackathonsCard, key: "hackathons", size: "sm" },
  { at: 104, Component: BlogCard,       key: "blog",       size: "sm" },
  { at: 150, Component: OutroCard,      key: "outro",      size: "sm" },
];

export default function Home() {

  const media = useMemo(() => {
    const items = [...galleryMedia];
    items.sort((a, b) => {
      const ha = Array.from(a.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      const hb = Array.from(b.filename).reduce((s, c) => s + c.charCodeAt(0), 0);
      return ha - hb;
    });
    return items;
  }, []);

  const gridItems = useMemo(() => {
    const result = [];
    let mediaIdx = 0;
    let insertIdx = 0;

    while (mediaIdx < media.length || insertIdx < CONTENT_INSERTS.length) {
      if (insertIdx < CONTENT_INSERTS.length && mediaIdx === CONTENT_INSERTS[insertIdx].at) {
        const { Component, key, size } = CONTENT_INSERTS[insertIdx];
        result.push(
          <div key={key} className={`content-cell content-cell-${size}`}>
            <Component />
          </div>
        );
        insertIdx++;
        continue;
      }

      if (mediaIdx < media.length) {
        result.push(<MediaItem key={media[mediaIdx].filename} item={media[mediaIdx]} />);
        mediaIdx++;
      } else {
        break;
      }
    }

    // Append any remaining inserts (e.g. outro at the very end)
    while (insertIdx < CONTENT_INSERTS.length) {
      const { Component, key, size } = CONTENT_INSERTS[insertIdx];
      result.push(
        <div key={key} className={`content-cell content-cell-${size}`}>
          <Component />
        </div>
      );
      insertIdx++;
    }

    return result;
  }, [media]);

  const gridRef = useRef(null);

  useEffect(() => {
    let raf = 0;

    function layout() {
      const grid = gridRef.current;
      if (!grid || !grid.children.length) return;

      // Measure from the natural (unclamped) layout.
      grid.style.height = "";
      grid.style.overflow = "";

      const cs = getComputedStyle(grid);
      const cell = parseFloat(cs.gridTemplateColumns.split(" ")[0]); // 1 column width
      const gap = parseFloat(cs.rowGap) || 0;
      if (!cell) return;

      // 1. Square cells: row height = column width.
      grid.style.gridAutoRows = `${cell}px`;

      // 2. Fit each content card's row span to its text height (no excess space).
      const cards = grid.querySelectorAll(".content-cell");
      for (const c of cards) { if (c.firstElementChild) c.firstElementChild.style.height = "auto"; }
      void grid.offsetHeight; // one reflow, then read
      const BAND = 16; // photo-tile height in rows; snap cards to it so the
      for (const c of cards) {         // photos beside them always fill flush
        const card = c.firstElementChild;
        const h = card ? card.offsetHeight : c.offsetHeight;
        if (card) card.style.height = "";
        const raw = Math.ceil((h + gap) / (cell + gap));
        const span = Math.max(BAND, Math.ceil(raw / BAND) * BAND);
        c.style.gridRow = `span ${span}`;
      }

      // 3. Snap the grid's bottom down to a clean row line and clip the remainder.
      const top = grid.getBoundingClientRect().top;
      let maxBottom = 0;
      for (const item of grid.children) {
        const b = item.getBoundingClientRect().bottom - top;
        if (b > maxBottom) maxBottom = b;
      }
      const pitch = cell + gap;
      const rows = Math.floor((maxBottom + gap) / pitch);
      const snapped = rows > 0 ? rows * pitch - gap : Math.ceil(maxBottom);
      grid.style.height = `${snapped}px`;
      grid.style.overflow = "hidden";
    }

    const t1 = setTimeout(layout, 150);
    const t2 = setTimeout(layout, 1200);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => layout());
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(layout);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main>
      <div className="gallery-section" style={{ "--gallery-filter": GLOBAL_FILTER }}>
        <div className="gallery-grid" ref={gridRef}>
          {gridItems}
        </div>
      </div>
      <footer className="site-footer">
        <span>Clay Nicholson</span>
        <span className="footer-sep">·</span>
        <a href="mailto:clayn@mit.edu">clayn@mit.edu</a>
        <span className="footer-sep">·</span>
        <a href="https://github.com/claynicholson" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer-sep">·</span>
        <a href="https://www.linkedin.com/in/claynicholson/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="footer-sep">·</span>
        <a href="https://x.com/claynicholsonvt" target="_blank" rel="noopener noreferrer">Twitter</a>
        <span className="footer-sep">·</span>
        <a href="https://www.instagram.com/clayanicholson/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <span className="footer-sep">·</span>
        <a href="https://www.youtube.com/@Clay_Nicholson" target="_blank" rel="noopener noreferrer">YouTube</a>
      </footer>
    </main>
  );
}
