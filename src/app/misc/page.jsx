"use client";

import React from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const MiscPage = () => {
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
        <section id='misc'>
          <h1 className='text-2xl font-bold mt-10 pl-10'>Misc Projects</h1>
          <div className='gallery'>

            <div className='project'>
              <a href="https://github.com/claynicholson/Lexiscan" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Lexiscan
                </span>
              </a>
              <p className='mt-2 flex-grow'>An app that was created for the Congressional App Challenge in 2024, which I won. Lexiscan is a simple tts app for android, created for people with dyslexia.</p>
              <Tags Java />
            </div>

            <div className='project'>
              <a href="https://github.com/claynicholson/robotic-arm" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Robotic Arm
                </span>
              </a>
              <p className='mt-2 flex-grow'>An open source robotic arm, created out of mostly laser cut parts for mass manufacturing.</p>
              <Tags CAD CPlus />
            </div>

            <div className='project'>
              <a href="https://github.com/claynicholson/H-Chassis" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Open H
                </span>
              </a>
              <p className='mt-2 flex-grow'>An open source H-Chassis for FTC that is created using only GoBuilda parts.</p>
              <Tags CAD />
            </div>

            <div className='project'>
              <a href="https://github.com/claynicholson/FRC-PM" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  FRC Project Management
                </span>
              </a>
              <p className='mt-2 flex-grow'>An open source project management software created for FRC team #9101.</p>
              <Tags Javascript CSS HTML />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default MiscPage
