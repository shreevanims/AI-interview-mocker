import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import AddSpecificInterview from './_components/AddSpecificInterview'

function Dashboard() {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-3xl text-primary'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>
       
      <div className='grid grid-cols-1 md:grid-cols-3 gap-x-7 my-5'>
        {/* <AddNewInterview/>
        <AddSpecificInterview/>                */}
          <div className='flex flex-col justify-center items-center w-full h-full p-4 rounded-lg'>
            <AddNewInterview />
          </div>
          <div className='flex flex-col justify-center items-center w-full h-full p-4 rounded-lg'>
            <AddSpecificInterview />
          </div>
      </div> 

    
      {/* Previous Interview List */}
      <InterviewList />

    </div>
  )
}

export default Dashboard
