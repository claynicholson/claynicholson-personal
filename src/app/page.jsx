import React from 'react'
import Script from 'next/script'
import Tags from '../components/tags'
import Footer from '../components/footer'

const page = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-4xl font-bold gradient-blue mt-9'>Clay Nicholson</h1>
        <h2 class="">
          <a href="https://github.com/claynicholson" className="underline">Github</a>
          <span> ~ </span>
          <a href="https://www.linkedin.com/in/clay-nicholson/" className="underline">Linkedin</a>
          <span> ~ </span>
          <a href="https://www.linkedin.com/in/clay-nicholson/" className="underline">Email</a>
        </h2>
        <p className='mt-5 mx-auto max-w-lg'>Hello, My name is Clay. I am a part of a bunch of robotics teams, and I work at <a href='https://hackclub.com/' className='underline'>Hackclub.</a> Here are all the projects i'm proud of:</p>
      </div>
      <div>

        <h1 className='text-2xl font-bold mt-10 pl-10'>Teams</h1>
        <div className='gallery'>

          <div className='project hover:bg-red-950'>
            <a href="https://www.robohawks5741.com/" className='flex items-center space-x-2'>
              <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Robohawks
              </span>
            </a>
            <p className='mt-2 flex-grow'>I am proud to be captain of my schools' robotics team, the Robohawks. I have led my team to the world championships for 2 years in a row and counting. On the Robohawks, I am head mechanical and Programming. </p>
          </div>

          <div className='project hover:bg-green-950'>
            <a href="https://greenmountainrobotics.org/" className='flex items-center space-x-2'>
              <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Green Mountain Robotics
              </span>
            </a>
            <p className='mt-2 flex-grow'>GMR is a FRC team in Burlington, VT. On Green Mountain Robotics I help with Mechanical, Outreach, Eletrical and Programming. I have been part of this team since 2023.</p>
          </div>


          <div className='project hover:bg-yellow-950'>
            <a href="https://hackclub.com/" className='flex items-center space-x-2'>
              <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Hack Club
              </span>
            </a>
            <p className='mt-2 flex-grow'>I Joined Hack Club in the summer of 2024 and have been a part of it ever since. At Hack Club, I have worked on <a className="underline" href="https://sprig.hackclub.com/">Sprig,</a> <a className="underline" href="https://hackclub.com/bin/">Bin,</a> <a className="underline" href="https://hackclub.com/">Arcade,</a> and more.</p>
          </div>

        </div>

        <h1 className='text-2xl font-bold mt-10 pl-10'>Projects</h1>
        <div className='gallery'>

          <div className='project'>
            <a href="https://www.robohawks5741.com/" className='flex items-center space-x-2'>
              <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Robohawks 2022-2023
              </span>
            </a>
            <p className='mt-2 flex-grow'>This year our team won the state championships in the robot competiton. <a className='underline' href='https://github.com/claynicholson/JV-Worlds-Main-New'>Here is the code</a> we used for the world championships in Houston, TX</p>
            <Tags Java/>
          </div>

          <div className='project'>
            <a href="https://www.robohawks5741.com/" className='flex items-center space-x-2'>
                <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Robohawks 2023-2024
                </span>
            </a>
            <p className='mt-2 flex-grow'>I am proud to be captain of my schools' robotics team, the Robohawks. I have led my team to the world championships for 2 years in a row and counting. On the Robohawks, I am head mechanical and Programming. </p>
            <Tags Java Kotlin/>
          </div>

          <div className='project'>
            <a href="https://hackclub.com/bin/" className='flex items-center space-x-2'>
                <img src="/bin.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  The Bin
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags Javascript CSS HTML/>
          </div>

          <div className='project'>
            <a href="https://hackclub.com/arcade/" className='flex items-center space-x-2'>
                <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Arcade
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags Javascript CSS HTML/>
          </div>

          <div className='project'>
          <a href="https://hackclub.com/arcade/" className='flex items-center space-x-2'>
                <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  GMR - Toast
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags Java CPlus/>
          </div>

          <div className='project'>
          <a href="https://hackclub.com/arcade/" className='flex items-center space-x-2'>
                <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  GMR - Toaster
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags Java CPlus/>
          </div>

          <div className='project'>
          <a href="https://github.com/claynicholson/Lexiscan" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Lexiscan
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags Java/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/Lexiscan" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Robotic Arm
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags CAD/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/Lexiscan" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Open H
                </span>
            </a>
            <p className='mt-2 flex-grow'>This is a project I am proud of. It is a project that I worked on for a long time and I am proud of the end result.</p>
            <Tags CAD/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page