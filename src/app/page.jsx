"use client";

import React from 'react'
import Link from 'next/link'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'

const page = () => {


  useEffect(() => {
    document.documentElement.classList.add("dark"); // Forces dark mode
  }, []);


  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [is020, setIs020] = useState(false);

  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) return;

    let checkInterval;

    const detectDevTools = () => {
      const threshold = 100;
      const start = performance.now();
      debugger;
      const end = performance.now();
      
      if (end - start > threshold) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      }
    };

    checkInterval = setInterval(detectDevTools, 1000);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  useEffect(() => {
    if (isDevToolsOpen) {
      const handle020 = () => {
        const { innerWidth, innerHeight } = window;
        if (innerWidth === 200 && innerHeight === 200) {
          console.log("Good job finding this, I am currently in Vermont and would love to meet you. Email me at clayanicholson@gmail.com or message me at @CAN on Hack Club's slack")
          setIs020(true);
        }
      };

      window.addEventListener('resize', handle020);
      return () => window.removeEventListener('resize', handle020);
    }
  }, [isDevToolsOpen]);


  if (!isDevToolsOpen) {
    return (
      <>
        <div id='home' className='text-center mb-16'>
          <h2 className='text-xl mb-4'>
            <a href="https://github.com/claynicholson" className="underline">Github</a>
            <span> ~ </span>
            <a href="https://www.linkedin.com/in/clay-nicholson/" className="underline">Linkedin</a>
            <span> ~ </span>
            <a href="https://mailhide.io/e/fJpjsonX" className="underline">Email</a>
          </h2>
          <p className='mt-5 mx-auto max-w-lg'>Hello, my name is Clay. I am a part of a bunch of robotics teams, and I work at <a href='https://hackclub.com/' className='underline'>Hackclub.</a> Here are all the projects I'm proud of:</p>
        </div>
        <Footer />
      </>
    )

  } else if (isDevToolsOpen && !is020) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h2 className='text-center'>Good Job, now make the window size 200px x 200px</h2>
      </div>)
  } else {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h2 className='text-center'>Check the console!</h2>
      </div>)
  }

}

export default page