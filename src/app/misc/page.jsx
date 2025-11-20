"use client";

import React, { useState, useEffect, useRef } from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const LazyImage = ({ src, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform w-full max-w-4xl min-h-[200px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {isVisible && (
        <img 
          src={src} 
          alt={`Portfolio page ${index + 1}`} 
          className="w-full block" 
        />
      )}
    </div>
  );
};

const portfolioImages = [
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4d161d33c3e43ebc95e7c5f871c76870b9eb32bc_2.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/bc533b5dc1e26f22fb341384eb35639b5eb9ebea_3.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/5ab444e035f660d6ca77e1611d7e8439da3c9028_4.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2d5f0fa98bd3e5ee79238fdfa01830d329e37a83_5.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/723ab3bc3ed8c008950285f583b11ad8b8e65695_6.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/789e13493dbd52a16c5e49ad89200dcc98dd5567_7.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/dd07a07c08f2b3017361fb7a879a7a661d7ed867_8.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/77fe62f3909a60b1b75812988746e41e9b10789e_9.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/dc863a8cbb903585b94b904e3e8164c191c0f671_10.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/e482fcb867f086731329204684e0d4f2b10f1fa7_11.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/34e444922ef5e76168f009eb6ada2083402479ea_12.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/ab8d4430211f9a4a214da9063b967cb5b86cde37_13.png",
  "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2bdf2a6035370c7bd131d3b96fc8b91f860a87d7_14.png"
];

const MiscPage = () => {
  return (
    <>
      <div className='px-20 max-w-7xl mx-auto'>
        <section id='misc'>
          <h1 className='text-2xl font-bold mt-10 mb-10'>Misc Projects</h1>
          
          <div className="w-full mb-10 flex flex-col items-center gap-0">
             {portfolioImages.map((src, index) => (
               <LazyImage key={index} src={src} index={index} />
             ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default MiscPage
