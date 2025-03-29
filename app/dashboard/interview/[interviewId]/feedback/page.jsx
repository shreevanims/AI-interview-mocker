"use client"
import { db } from '@/utils/db';
import { UserAnswer,MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
  


function Feedback() {
    
    const params = useParams();

    const [feedbackList,setFeedbackList]=useState([]);
    const [overallRating, setOverallRating] = useState(0);
    const [interviewType, setInterviewType] = useState('');
    const [diffLevel, setDiffLevel] = useState('');
    const [jobDomain,setJobDomain]=useState('');
    const router=useRouter();

    useEffect(()=>{
        GetFeedback();
    },[params])

    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id);

        console.log("Result User Answer:"+result);
        setFeedbackList(result);
 


    const interviewResult = await db.select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, params.interviewId))
    .limit(1);

    if (interviewResult.length > 0) {
    setInterviewType(interviewResult[0].interviewType);
    setDiffLevel(interviewResult[0].diffLevel || ''); // Handle difficulty level if exists
    setJobDomain(interviewResult[0].jobDomain);
    }
    

    const divisor = interviewType === "general" ? process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT : process.env.NEXT_PUBLIC_INTERVIEW_AREA_QUESTION_COUNT;

    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + Number(item.rating || 0), 0);
      const avgRating = (totalRating / divisor).toFixed(1);  // Ensure it's rounded to 1 decimal place
      setOverallRating(avgRating);
  } else {
      setOverallRating(0);
  }

    }
       
    

    

  return (
    <div className='p-10'>
        
        {feedbackList.length==0?
            <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>   
           
          :
      <>
          {/* {overallRating > 7.0 ? (
            <>
              <h2 className='text-3xl font-bold text-green-500'>Congratulations! You are selected!</h2>
            </>
          ) : (
            <>
              <h2 className='text-3xl font-bold text-red-500'>You are not selected. Better luck next time!</h2>
              <h2 className='font-bold text-2xl text-blue-500'>Keep practicing and improve!</h2>
            </>
          )} */}

                    {interviewType === "general" ? (
                        overallRating > 7.0 ? (
                            <h2 className='text-3xl font-bold text-green-500'>Congratulations! You are selected!</h2>
                        ) : (
                            <>
                                <h2 className='text-3xl font-bold text-red-500'>You are not selected. Better luck next time!</h2>
                                <h2 className='font-bold text-2xl text-blue-500'>Keep practicing and improve!</h2>
                            </>
                        )
                    ) : (
                        overallRating > 7.0 ? (
                          <h2 className='text-3xl font-bold text-green-500'>
                              Congratulations! You passed in {jobDomain} at {diffLevel} level !
                          </h2>
                        ) : (
                          <>
                            <h2 className='text-3xl font-bold text-red-500'>
                                You did not pass in {jobDomain} at {diffLevel} level.
                            </h2>
                            <h2 className='font-bold text-2xl text-blue-500'>Keep practicing and improve!</h2>
                          </>
                        )
                    )}

        {/* <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2> */}
        <h2 className='font-bold text-2xl my-3'>Here is your interview feedback</h2>
        <h2 className='text-primary text-lg my-2'>Your overall interview rating: <strong>{overallRating}/10</strong></h2>

        <h2 className='text-sm text-gray-500'>Find below Interview questions with Correct answer,Your answer and feedback for improvement.</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg  flex justify-between my-2 text-left gap-7 w-full'>
            {item.question} <ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>

            <CollapsibleContent>
               <div className='flex flex-col gap-2'>
                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback : </strong>{item.feedback}</h2>
               </div>

            </CollapsibleContent>
            </Collapsible>
        
        ))}

      </>}
        
        <Button className='my-5' onClick={()=>router.replace('/dashboard')}>Go Home</Button>

    </div>
  )
}

export default Feedback