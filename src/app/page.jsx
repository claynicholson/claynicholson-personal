"use client";

import { useMemo, useRef, useCallback, useEffect, useState } from "react";
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
      <video ref={videoRef} src={src} muted loop playsInline preload="metadata" className="gallery-media" />
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

const CONTENT_INSERTS = [
  { at: 0,   Component: HeroCard,       key: "hero",       cols: 4, rows: 3 },
  { at: 6,   Component: AboutCard,      key: "about",      cols: 4, rows: 2 },
  { at: 12,  Component: PastCard,       key: "past",       cols: 4, rows: 2 },
  { at: 18,  Component: PresentCard,    key: "present",    cols: 4, rows: 2 },
  { at: 24,  Component: FutureCard,     key: "future",     cols: 4, rows: 2 },
  { at: 30,  Component: ExperienceCard, key: "experience", cols: 4, rows: 4 },
  { at: 38,  Component: ProjectsCard,   key: "projects",   cols: 6, rows: 7 },
  { at: 52,  Component: ResearchCard,   key: "research",   cols: 4, rows: 4 },
  { at: 62,  Component: AwardsCard,     key: "awards",     cols: 4, rows: 5 },
  { at: 74,  Component: RoboticsCard,   key: "robotics",   cols: 4, rows: 3 },
  { at: 82,  Component: LeadershipCard, key: "leadership", cols: 4, rows: 2 },
  { at: 88,  Component: EducationCard,  key: "education",  cols: 4, rows: 3 },
  { at: 96,  Component: HackathonsCard, key: "hackathons", cols: 4, rows: 3 },
  { at: 104, Component: BlogCard,       key: "blog",       cols: 4, rows: 2 },
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
        const { Component, key, cols, rows } = CONTENT_INSERTS[insertIdx];
        result.push(
          <div
            key={key}
            style={{ gridColumn: `span ${cols}`, gridRow: `span ${rows}` }}
          >
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

    return result;
  }, [media]);

  // Calculate exact row count needed so grid doesn't create extra implicit rows
  const totalItems = media.length + CONTENT_INSERTS.length;
  // Each image is 2 rows. Cards vary. Approximate: items fill ~6 cols per row pair.
  // With 12 cols: each "visual row" = 2 grid rows, fits 6 small items or 3 wide items
  // Conservative estimate — let CSS handle it, we just clip

  const [gridHeight, setGridHeight] = useState("auto");
  const gridRef = useRef(null);

  useEffect(() => {
    function measure() {
      const grid = gridRef.current;
      if (!grid) return;
      const items = grid.children;
      if (!items.length) return;
      const gridTop = grid.getBoundingClientRect().top + window.scrollY;

      // Find the row height (one auto-row unit) from computed style
      const rowHeight = parseFloat(getComputedStyle(grid).gridAutoRows) ||
        (grid.getBoundingClientRect().width * 0.08); // 8vw fallback

      // Find the bottom of the last item that has content
      let maxBottom = 0;
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const bottom = rect.bottom + window.scrollY - gridTop;
        if (bottom > maxBottom) maxBottom = bottom;
      }

      // Snap DOWN to the nearest row boundary for a clean horizontal cut
      const totalRows = Math.floor(maxBottom / rowHeight);
      const snappedHeight = totalRows * rowHeight;

      setGridHeight(snappedHeight > 0 ? snappedHeight : Math.ceil(maxBottom));
    }
    const t1 = setTimeout(measure, 500);
    const t2 = setTimeout(measure, 2000);
    const onResize = () => { setGridHeight("auto"); setTimeout(measure, 200); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <main>
      <nav className="site-header">
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
      </nav>
      <div className="gallery-section" style={{ "--gallery-filter": GLOBAL_FILTER }}>
        <div
          className="gallery-grid"
          ref={gridRef}
          style={gridHeight !== "auto" ? { height: gridHeight, overflow: "hidden" } : undefined}
        >
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
