"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [jobDomain,setJobDomain]=useState();
    const [diffLevel,setDiffLevel]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]); 
    const router=useRouter();
    const {user}=useUser();  
    const interviewType='general';
    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault(); 
        console.log(jobPosition,jobDesc,jobExperience)

        // const InputPrompt="Job Position:"+jobPosition+",Job Description:"+jobDesc+",Years of Experience:"+jobExperience+" depending on Job Position,Job Description and Years of experience give only"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answers in JSON format,give us question and answer field on JSON"
        const InputPrompt = 
  "Job Position: " + jobPosition + 
  ", Job Description: " + jobDesc + 
  ", Years of Experience: " + jobExperience + 
  ". Based on these details, generate exactly " + 
  process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + 
  " interview questions along with their answers. " + 
  "Provide the response as a JSON array where each item is an object with 'question' and 'answer' fields. " + 
  "Do not wrap the array in an object—just return a plain JSON array."


        const result=await chatSession.sendMessage(InputPrompt);
        console.log("Result:"+result);
        const MockJsonResp=(result.response.text()).replace(/```json|```/g, '').trim();
        console.log("MockResp:"+MockJsonResp);
        console.log("hii")
        
// try {
//   const parsedJson = JSON.parse(jsonString);
//   console.log("✅ JSON parsed successfully:", parsedJson);
// } catch (error) {
//   console.error("❌ JSON Parse Error:", error);
// }
        console.log(typeof(MockJsonResp))
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){
        const resp=await db.insert(MockInterview)
        .values({
          mockId:uuidv4(),
          jsonMockResp:MockJsonResp,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobExperience,
          jobDomain:jobDomain,
          diffLevel:diffLevel,
          interviewType: interviewType, // 'general' or 'area-specific'
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')      
        }).returning({mockId:MockInterview.mockId})  
        
        console.log("Inserted ID:",resp)
          if(resp)
          {
            setOpenDailog(false)
            router.push('/dashboard/interview/'+resp[0]?.mockId)
          }
        }
        else{
          console.log("ERROR")
        }
        setLoading(false);
    }
    return (
    <div>
      <div
        className='p-10 border rounded-lg bg-blue-50
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDailog(true)} >
        <h2 className="text-lg text-center">Start General Interview</h2>
      </div>
      <Dialog open={openDailog}>  
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about job you are interviewing</DialogTitle> 
            <DialogDescription className="text-md text-gray-500">
              Add details about the job position/role, your skills, and years of experience              
            </DialogDescription>
          </DialogHeader>
            <form onSubmit={onSubmit}>
              <div>   
                <div className='mt-7 my-3'>
                    <label className="text-md text-gray-500">Job Role/Job Position</label>
                    <Input placeholder="Eg: Full Satck Developer" required
                    onChange={(event)=>setJobPosition(event.target.value)}/>
                </div>
                <div className='mt-7 my-3'>
                    <label className="text-md text-gray-500">Job Description/ Tech Stack (In Short)</label>
                    <Textarea placeholder="Eg: MongoDB,Express js,React,Node js" required
                    onChange={(event)=>setJobDesc(event.target.value)}/>
                </div>
                <div className='mt-7 my-3'>
                    <label className="text-md text-gray-500">Years of experience</label>
                    <Input placeholder="Eg: 5" type="number" max="50" required
                    onChange={(event)=>setJobExperience(event.target.value)}/>
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <Button type="button" variant="ghost"  onClick={()=>setOpenDailog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading} >
                  {loading?
                    <>
                    <LoaderCircle className="animate-spin" />Generating from AI
                    </>:'Start Interview'
                  }
                </Button>
              </div>
            </form>              
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview
