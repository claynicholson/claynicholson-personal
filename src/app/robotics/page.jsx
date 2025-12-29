"use client";

import React from 'react'
import Tags from '../../components/tags'
import Footer from '../../components/footer'
import Link from 'next/link'

const RoboticsPage = () => {
  return (
    <>
      <div className='px-20 max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold mt-10 mb-10'>Robotics</h1>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <div>
            <div className='mb-6'>
              <a href="https://www.robohawks5741.com/" className='flex items-center space-x-2 mb-3'>
                <img src="/robohawks.png" className='h-12 whitespace-nowrap' alt="Robohawks Logo" />
                <h2 className='text-2xl font-bold'>Robohawks</h2>
              </a>
              <p className='text-gray-300 mb-6'>I am proud to be captain of my schools' robotics team, the Robohawks. I have led my team to the world championships for 3 years and counting. On the Robohawks, I am head of Mechanical and Programming.</p>
            </div>

            <div className='space-y-6'>
              <div className='project'>
                <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                  <span className='text-gray-500'>Image Placeholder</span>
                </div>
                <a href="https://github.com/robohawks5741/FtcRobotController-IntoTheDeep" className='flex items-center space-x-2'>
                  <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                  <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                    Robohawks 2024-2025
                  </span>
                </a>
                <p className='mt-2 flex-grow'>The repo for Robohawks 2024-2025. This year our team won the state championships in the robot competiton. I also personally was a finalist for FIRST deans list. <a className='underline' href='https://github.com/robohawks5741/FtcRobotController-IntoTheDeep'>Here is the code</a> we used for the world championships in Houston, TX</p>
                <Tags Java />
              </div>

              <div className='project'>
                <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                  <span className='text-gray-500'>Image Placeholder</span>
                </div>
                <a href="https://github.com/claynicholson/JV-Worlds-Main-New" className='flex items-center space-x-2'>
                  <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                  <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                    Robohawks 2022-2023
                  </span>
                </a>
                <p className='mt-2 flex-grow'>The repo for Robohawks 2022-2023. This year our team won the state championships in the robot competiton. <a className='underline' href='https://github.com/claynicholson/JV-Worlds-Main-New'>Here is the code</a> we used for the world championships in Houston, TX</p>
                <Tags Java />
              </div>

              <div className='project'>
                <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                  <span className='text-gray-500'>Image Placeholder</span>
                </div>
                <a href="https://github.com/robohawks5741/FtcRobotController-CenterStage" className='flex items-center space-x-2'>
                  <img src="/robohawks.png" className='h-10 whitespace-nowrap' alt="Robohawks Logo" />
                  <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                    Robohawks 2023-2024
                  </span>
                </a>
                <p className='mt-2 flex-grow'>The repo for Robohawks 2023-2024. Not only did we win the robot competition, but also the Inspire award for Vermont. Among other things, I created a custom vision pipeline that was used my the majority of the teams in Vermont.</p>
                <Tags Java Kotlin />
              </div>
            </div>
          </div>

          <div>
            <div className='mb-6'>
              <a href="https://greenmountainrobotics.org/" className='flex items-center space-x-2 mb-3'>
                <img src="/GMR.png" className='h-12 whitespace-nowrap' alt="Green Mountain Robotics Logo" />
                <h2 className='text-2xl font-bold'>Green Mountain Robotics</h2>
              </a>
              <p className='text-gray-300 mb-6'>GMR is a FRC team in Burlington, VT. On Green Mountain Robotics I'm head of programming but I also help with Mechanical, Outreach and Eletrical. I have been part of this team since 2023.</p>
            </div>

            <div className='space-y-6'>
              <div className='project'>
                <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                  <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/cfc810b392dd0c9e_HaZ7TNo.jpeg" className='h-full whitespace-nowrap' alt="GMR Logo" />
                </div>
                <a href="https://github.com/greenmountainrobotics/2023-Robot" className='flex items-center space-x-2'>
                  <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="GMR Logo" />
                  <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                    GMR - Toast
                  </span>
                </a>
                <p className='mt-2 flex-grow'>The repo for our team's rookie year. We were able to make it to the World Championships in Houston, TX.</p>
                <Tags Java CPlus />
              </div>

              <div className='project'>
                <div className='w-full h-48 bg-gray-800 mb-4 flex items-center justify-center'>
                  <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c7544c293a1d0f61_0Eb8uhs.jpeg" className='h-full whitespace-nowrap' alt="GMR Logo" />
                </div>
                <a href="https://github.com/greenmountainrobotics/2024-Robot" className='flex items-center space-x-2'>
                  <img src="/GMR.png" className='h-10 whitespace-nowrap' alt="GMR Logo" />
                  <span className='text-xl font-bold underline whitespace-nowrap overflow-x-auto'>
                    GMR - Toaster
                  </span>
                </a>
                <p className='mt-2 flex-grow'>The repo for the 2023-2024 GMR season</p>
                <Tags Java CPlus />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RoboticsPage
