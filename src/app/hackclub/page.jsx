"use client";

import React from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const HackClubPage = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-4xl font-bold gradient-blue mt-9'>Clay Nicholson</h1>
        <nav className='mt-6 mb-4'>
          <div className='flex justify-center gap-6 text-lg'>
            <Link href="/" className='hover:text-blue-400 transition-colors'>Home</Link>
            <Link href="/robotics" className='hover:text-blue-400 transition-colors'>Robotics</Link>
            <Link href="/hackclub" className='hover:text-blue-400 transition-colors'>Hack Club</Link>
            <Link href="/misc" className='hover:text-blue-400 transition-colors'>Misc Projects</Link>
            <Link href="/research" className='hover:text-blue-400 transition-colors'>Research</Link>
            <Link href="/blog" className='hover:text-blue-400 transition-colors'>Blog</Link>
          </div>
        </nav>
      </div>

      <div>
        <section id='hackclub'>
          <h1 className='text-2xl font-bold mt-10 pl-10'>Hack Club</h1>
          <div className='gallery'>
            <div className='project hover:bg-yellow-950'>
              <a href="https://hackclub.com/" className='flex items-center space-x-2'>
                <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Hack Club Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Hack Club
                </span>
              </a>
              <p className='mt-2 flex-grow'>I Joined Hack Club in the summer of 2024 and have been a part of it ever since. At Hack Club, I have worked on <a className="underline" href="https://sprig.hackclub.com/">Sprig,</a> <a className="underline" href="https://hackclub.com/bin/">Bin,</a> <a className="underline" href="https://hackclub.com/">Arcade,</a> and more.</p>
            </div>

            <div className='project'>
              <a href="https://hackclub.com/bin/" className='flex items-center space-x-2'>
                <img src="/bin.png" className='h-10 whitespace-nowrap' alt="Bin Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  The Bin
                </span>
              </a>
              <p className='mt-2 flex-grow'>A Hack Club program, where highschoolers design electrical circuits, and get shipped the parts to build them.</p>
              <Tags Javascript CSS HTML />
            </div>

            <div className='project'>
              <a href="https://hackclub.com/arcade/" className='flex items-center space-x-2'>
                <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Hack Club Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Arcade Showcase
                </span>
              </a>
              <p className='mt-2 flex-grow'>A voting system created for the end of Arcade where projects were voted on in multiple rounds.</p>
              <Tags Javascript CSS HTML />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default HackClubPage
