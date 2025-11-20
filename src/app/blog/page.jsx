"use client";

import React from 'react'
import Footer from '../../components/footer'
import Link from 'next/link'

const BlogPage = () => {
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

      <div className='px-20 max-w-7xl mx-auto'>
        <section id='blog'>
          <h1 className='text-2xl font-bold mt-10 mb-10'>Blog</h1>
          <div className='gallery'>
            <p className='text-center col-span-full text-gray-400'>Coming soon...</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default BlogPage
