import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'

function InterviewItemCard({interview}) {

    const router=useRouter();

    const onStart = async () => {
        try {
            // Delete previous answers from the database
            await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interview?.mockId));
    
            // Navigate to the new interview session
            router.push('/dashboard/interview/' + interview?.mockId);
        } catch (error) {
            console.error("Error deleting previous answers:", error);
        }
    };
    
    // const onStart=()=>{
    //     router.push('/dashboard/interview/'+interview?.mockId)
    // }

    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        {/* <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At : {interview?.createdAt}</h2> */}

        {interview?.interviewType === "general" ? (
            <>
                <h2 className='font-bold text-primary capitalize'>{interview?.jobPosition}</h2>
                <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
            </>
        ) : (
            <>
                <h2 className='font-bold text-primary capitalize'>{interview?.jobDomain}</h2>
                <h2 className='text-sm text-gray-600 capitalize'>{interview?.diffLevel} Level</h2>
            </>
        )}
        <h2 className='text-xs text-gray-400'>Created At : {interview?.createdAt}</h2> 

        <div className='flex justify-between mt-2 gap-5'>         
            <Button size="sm" variant="outline" className='w-full' onClick={onFeedbackPress}>Feedback</Button>
            <Button size="sm" className='w-full'onClick={onStart}>Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard