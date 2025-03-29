"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview() {

    const params = useParams();
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);

    
    
  



    useEffect(()=>{
        setWebCamEnabled(false); 
        console.log(params.interviewId)
        GetInterviewDetails();
      },[params])

    

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */  
    const GetInterviewDetails=async()=>{
      const result=await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId,params.interviewId))
      
      setInterviewData(result[0]);
    }
  return (
    <div className='my-5 '>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
       
      <div className='flex flex-col my-4 gap-2'>
        {/* <div className='flex flex-col p-5 rounded-lg border gap-2'>
        <h2><strong>Job Role/Job Position : </strong>{interviewData ? interviewData.jobPosition : "Loading"}</h2>
        <h2><strong>Job Description/Tech Stack : </strong>{interviewData ? interviewData.jobDesc  : "Loading"}</h2>
        <h2><strong>Years of Experience : </strong>{interviewData ? interviewData.jobExperience : "Loading"}</h2>
        </div> */}
        <div className='flex flex-col p-5 rounded-lg border gap-2'>
          {interviewData?.interviewType === "general" ? (
            <>
              <h2><strong>Job Role/Job Position : </strong>{interviewData ? interviewData.jobPosition : "Loading"}</h2>
              <h2><strong>Job Description/Tech Stack : </strong>{interviewData ? interviewData.jobDesc : "Loading"}</h2>
              <h2><strong>Years of Experience : </strong>{interviewData ? interviewData.jobExperience : "Loading"}</h2>
            </>
          ) : (
            <>
              <h2><strong>Domain : </strong>{interviewData ? interviewData.jobDomain : "Loading"}</h2>
              <h2><strong>Difficulty Level : </strong>{interviewData ? interviewData.diffLevel : "Loading"}</h2>
            </>
          )}
        </div>
        <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
      </div>

      <div>
        {webCamEnabled? <Webcam 
        onUserMedia={()=>setWebCamEnabled(true)}
        onUserMediaError={()=>setWebCamEnabled(false)}
        mirrored={true}
        style={{
          height:300,
          width:370,
        }}
        />
        :
        
         <>
         <WebcamIcon className='h-72 w-full my-3 p-20 bg-secondary rounded-lg border' />


         <Button variant="outline" className='w-full' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam</Button>
         </>
        }
      </div>

    </div>
        <div className='flex justify-end items-end'>
            {/* <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button className="my-5">Start Interview</Button>
            </Link> */}

<Link href={`/dashboard/interview/${params.interviewId}/start?webcam=${webCamEnabled}`}>
  <Button className="my-5">Start Interview</Button>
</Link>

        </div>

    </div>
  )
}

export default Interview








