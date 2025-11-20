"use client";

import React from 'react'
import Footer from '../../components/footer'
import Link from 'next/link'

const BlogPage = () => {
  return (
    <>
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
