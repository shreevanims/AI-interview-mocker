"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {

    const params = useParams();
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[params])

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */  
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId,params.interviewId))
          
          console.log("Params:", params);
          console.log("Database Result:", result);

          const jsonMockResp=JSON.parse(result[0].jsonMockResp)
          console.log("Parsed Response type:", typeof jsonMockResp);
          console.log("Parsed Response:", jsonMockResp);
          setMockInterviewQuestion(jsonMockResp || jsonMockResp.interviewQuestions);
          setInterviewData(result[0]);
    }
  return (
    <div> 
        <div className='grid grid-cols-1 md:grid-cols-2 gap-1 mt-1'>
            {/* Question */}
          <QuestionSection 
          mockInterviewQuestion={mockInterviewQuestion} 
          activeQuestionIndex={activeQuestionIndex}
          />

            {/* Video/Audio Recording */}
            <RecordAnswerSection 
            mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end my-1'>
          {/* {activeQuestionIndex>0&& 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>} */}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
          <Button>End Interview</Button>
          </Link>}
        </div>
    </div>
  )
}

export default StartInterview