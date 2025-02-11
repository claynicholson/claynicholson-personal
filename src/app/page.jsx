"use client";

import React from 'react'
import Script from 'next/script'
import Tags from '../components/tags'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'

const page = () => {


  useEffect(() => {
    document.documentElement.classList.add("dark"); // Forces dark mode
  }, []);


  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [is020, setIs020] = useState(false);

  useEffect(() => {
    const checkDevToolsOpen = () => {
      const threshold = 160;
      if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
        setIsDevToolsOpen(true)
      }
    };

    window.addEventListener('resize', checkDevToolsOpen);

    checkDevToolsOpen(); 

    return () => {
      window.removeEventListener('resize', checkDevToolsOpen);
    };
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === 200 && innerHeight === 200) {
        console.log("Good job finding this, I am currently in Vermont and would love to meet you. Email me at clayanicholson@gmail.com or message me at @CAN on Hack Club's slack")
        setIs020(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


if (!isDevToolsOpen) {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-4xl font-bold gradient-blue mt-9'>Clay Nicholson</h1>
        <h2>
          <a href="https://github.com/claynicholson" className="underline">Github</a>
          <span> ~ </span>
          <a href="https://www.linkedin.com/in/clay-nicholson/" className="underline">Linkedin</a>
          <span> ~ </span>
          <a href="https://mailhide.io/e/fJpjsonX" className="underline">Email</a>
        </h2>
        <p className='mt-5 mx-auto max-w-lg'>Hello, my name is Clay. I am a part of a bunch of robotics teams, and I work at <a href='https://hackclub.com/' className='underline'>Hackclub.</a> Here are all the projects I'm proud of:</p>
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
            <p className='mt-2 flex-grow'>I am proud to be captain of my schools' robotics team, the Robohawks. I have led my team to the world championships for 2 years in a row and counting. On the Robohawks, I am head of Mechanical and Programming. </p>
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

        <h1 className='text-2xl font-bold mt-10 pl-10'>Projects I'm Proud of</h1>
        <div className='gallery'>

        <div className='project'>
            <a href="https://github.com/robohawks5741/FtcRobotController-IntoTheDeep" className='flex items-center space-x-2'>
              <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Robohawks 2024-2025
              </span>
            </a>
            <p className='mt-2 flex-grow'>The repo for Robohawks 2024-2025. This year our team won the state championships in the robot competiton. I also personally was a finalist for FIRST deans list. <a className='underline' href='https://github.com/claynicholson/JV-Worlds-Main-New'>Here is the code</a> we used for the world championships in Houston, TX</p>
            <Tags Java/>
          </div>

          

          <div className='project'>
            <a href="https://hackclub.com/bin/" className='flex items-center space-x-2'>
                <img src="/bin.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  The Bin
                </span>
            </a>
            <p className='mt-2 flex-grow'>A Hack Club program, where highschoolers design electrical circuits, and get shipped the parts to build them.</p>
            <Tags Javascript CSS HTML/>
          </div>

          <div className='project'>
            <a href="https://hackclub.com/arcade/" className='flex items-center space-x-2'>
                <img src="/hackclub.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Arcade Showcase
                </span>
            </a>
            <p className='mt-2 flex-grow'>A voting system created for the end of Arcade where projects were voted on in multiple rounds.</p>
            <Tags Javascript CSS HTML/>
          </div>

          <div className='project'>
          <a href="https://github.com/greenmountainrobotics/2023-Robot" className='flex items-center space-x-2'>
                <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  GMR - Toast
                </span>
            </a>
            <p className='mt-2 flex-grow'>The repo for our team's rookie year. We were able to make it to the World Championships in Houston, TX.</p>
            <Tags Java CPlus/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/JV-Worlds-Main-New" className='flex items-center space-x-2'>
              <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
              <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                Robohawks 2022-2023
              </span>
            </a>
            <p className='mt-2 flex-grow'>The repo for Robohawks 2022-2023. This year our team won the state championships in the robot competiton. <a className='underline' href='https://github.com/claynicholson/JV-Worlds-Main-New'>Here is the code</a> we used for the world championships in Houston, TX</p>
            <Tags Java/>
          </div>

          <div className='project'>
            <a href="https://github.com/robohawks5741/FtcRobotController-CenterStage" className='flex items-center space-x-2'>
                <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Robohawks 2023-2024
                </span>
            </a>
            <img/>
            <p className='mt-2 flex-grow'>The repo for Robohawks 2023-2024. Not only did we win the robot competition, but also the Inspire award for Vermont. Among other things, I created a custom vision pipeline that was used my the majority of the teams in Vermont.</p>
            <Tags Java Kotlin/>
          </div>

          <div className='project'>
          <a href="https://github.com/greenmountainrobotics/2024-Robot" className='flex items-center space-x-2'>
                <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  GMR - Toaster
                </span>
            </a>
            <p className='mt-2 flex-grow'>The repo for the 2023-2024 GMR season</p>
            <Tags Java CPlus/>
          </div>

          <div className='project'>
          <a href="https://github.com/claynicholson/Lexiscan" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Lexiscan
                </span>
            </a>
            <p className='mt-2 flex-grow'>An app that was created for the Congressional App Challenge in 2024, which I won. Lexiscan is a simple tts app for android, created for people with dyslexia.</p>
            <Tags Java/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/robotic-arm" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Robotic Arm
                </span>
            </a>
            <p className='mt-2 flex-grow'>An open source robotic arm, created out of mostly laser cut parts for mass manufacturing.</p>
            <Tags CAD CPlus/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/H-Chassis" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  Open H
                </span>
            </a>
            <p className='mt-2 flex-grow'>An open source H-Chassis for FTC that is created using only GoBuilda parts.</p>
            <Tags CAD/>
          </div>

          <div className='project'>
            <a href="https://github.com/claynicholson/FRC-PM" className='flex items-center space-x-2'>
                <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                  FRC Project Management
                </span>
            </a>
            <p className='mt-2 flex-grow'>An open source project management software created for FRC team #9101.</p>
            <Tags Javascript CSS HTML/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )

} else if(isDevToolsOpen && !is020) {
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