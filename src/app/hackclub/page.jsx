"use client";

import React from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const HackClubPage = () => {
  return (
    <>
      <div className='px-20 max-w-7xl mx-auto'>
        <section id='hackclub'>
          <h1 className='text-2xl font-bold mt-10 mb-3'>Hack Club</h1>
          <p className='text-gray-300 mb-10'>I Joined Hack Club in the summer of 2024 and have been a part of it ever since. At Hack Club, I have worked on <a className="underline" href="https://sprig.hackclub.com/">Sprig,</a> <a className="underline" href="https://hackclub.com/bin/">Bin,</a> <a className="underline" href="https://hackclub.com/">Arcade,</a> and more.
          
          I just want to say, (which is something many people say), Hack Club has changed my life. Growing up in Vermont, I never really had a close technical communtiy to interact with. Ironically, Hack Club happens to be based just 20 minutes from my house.</p><p>This coincidence was so perfect that I even decided to take the entirety of my senior year to gap year there. I have been able to make friends from around thw world and I am forever greatful for the people I have been able to meet and the places I have been able to go.</p><br/><p>...Anyways, at Hack Club, I run you-ship-we-ship programs (fancy grant programs) trying to get teens from all about to make cool projects. Most recently, I have been working on Blueprint and an exiting partnership hackathon at AMD HQ called Prototype.</p>
          <div className='gallery'>

            <div className='project hover:bg-[#EAEBDD]/30'>
              <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/4870d1018b3a1bd7e4b7e033164f43ad49eb0581__7BEB3BE1-71B7-45FA-A61B-3343DA37B009_.png" alt="Hack Club Grounded" className='w-full h-full object-cover' />
              </div>
              <a href="https://hackclub.com/bin/" className='flex items-center space-x-2'>
                <img src="/bin.png" className='h-10 whitespace-nowrap' alt="Bin Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  The Bin
                </span>
              </a>
              <p className='mt-2 flex-grow'>Design electrical circuits, and get shipped the parts to build them.</p>
              <Tags Javascript CSS HTML />
            </div>


            <div className='project hover:bg-[#1EBB58]/30'>
              <div className='w-full h-48 bg-gray-800 mb-4 overflow-hidden'>
                <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/5ca901af765d55a5cbbba4816c90d8deba12412b__F2C8644B-EB26-4A79-A8FC-0A233386F49F_.png" alt="Hack Club Grounded" className='w-full h-full object-cover' />
              </div>
              <a href="https://grounded.hackclub.com/" className='flex items-center space-x-2'>
                <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Hack Club Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Hack Club Grounded
                </span>
              </a>
              <a href="https://github.com/hackclub/grounded" className='text-blue-400 hover:text-blue-300 underline text-sm mt-1 inline-block'>GitHub</a>
              <p className='mt-2 flex-grow'>Design any PCB circuit board, get the funding to make it!!!</p>
              <Tags Javascript CSS HTML />
            </div>

            <div className='project hover:bg-[#0D2D55]/30'>
              <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/015fe12eca1226ac0f5fe49ecdf854bfcd0dca8b__5BA63C49-89C7-46ED-992A-9237AE057651_.png" alt="Hack Club Blueprint" className='w-full h-full object-cover' />
              </div>
              <a href="https://blueprint.hackclub.com/" className='flex items-center space-x-2'>
                <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f7301d3551716bcca57e1fdec638fca90801b832_image_18_1.png" className='h-10 whitespace-nowrap' alt="Hack Club Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Hack Club Blueprint
                </span>
              </a>
              <a href="https://github.com/hackclub/blueprint/" className='text-blue-400 hover:text-blue-300 underline text-sm mt-1 inline-block'>GitHub</a>
              <p className='mt-2 flex-grow'>Get up to $400 to make any hardware project + flagship hackathon @ AMD HQ</p>
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
