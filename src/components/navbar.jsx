"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className='mt-6 mb-4'>
      <div className='flex justify-center gap-6 text-lg'>
        <Link 
          href="/" 
          className={`hover:text-blue-400 ${isActive('/') ? 'underline' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/robotics" 
          className={`hover:text-blue-400 ${isActive('/robotics') ? 'underline' : ''}`}
        >
          Robotics
        </Link>
        <Link 
          href="/hackclub" 
          className={`hover:text-blue-400 ${isActive('/hackclub') ? 'underline' : ''}`}
        >
          Hack Club
        </Link>
        <Link 
          href="/misc" 
          className={`hover:text-blue-400 ${isActive('/misc') ? 'underline' : ''}`}
        >
          Misc Projects
        </Link>
        <Link 
          href="/research" 
          className={`hover:text-blue-400 ${isActive('/research') ? 'underline' : ''}`}
        >
          Research
        </Link>
        <Link 
          href="/blog" 
          className={`hover:text-blue-400 ${isActive('/blog') ? 'underline' : ''}`}
        >
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
