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

function AddSpecificInterview() {
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
    const interviewType='area-specific';
    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault(); 
        console.log(jobPosition,jobDesc,jobExperience,jobDomain,diffLevel)

        // const InputPrompt="Job Position:"+jobPosition+",Job Description:"+jobDesc+",Years of Experience:"+jobExperience+" depending on Job Position,Job Description and Years of experience give only"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answers in JSON format,give us question and answer field on JSON" 
        const InputPrompt = 
        "Domain: " + jobDomain + 
        ", Difficulty Level: " + diffLevel + 
        ". Generate exactly " + 
        process.env.NEXT_PUBLIC_INTERVIEW_AREA_QUESTION_COUNT + 
        " interview questions along with their answers, specifically tailored to this domain and difficulty level. " + 
        "Provide the response as a JSON array where each item is an object with 'question' and 'answer' fields. " + 
        "Do not wrap the array in an object—just return a plain JSON array.";
      


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
        <h2 className="text-lg text-center">Area-Specific Interview Practice</h2>
      </div>
      <Dialog open={openDailog}>  
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about the domain you're practicing.</DialogTitle>
            <DialogDescription className="text-md text-gray-500">
              Add the domain and difficulty level you are preparing for.
            </DialogDescription>
          </DialogHeader>
            <form onSubmit={onSubmit}>
              <div> 

                {/* <h2>Add the domain and difficulty level you are preparing for.</h2> */}
                
                <div className='mt-7 my-3'>
                    <label className="text-md text-gray-500">Domain</label>
                    <Input placeholder="Eg: Software Engineer" required
                    onChange={(event)=>setJobDomain(event.target.value)}/>
                </div>
                <div className='mt-7 my-3'>
                    <label className="text-md text-gray-500">Difficulty Level</label>
                    <Input placeholder="Beginner/Intermediate/Advanced" required
                    onChange={(event)=>setDiffLevel(event.target.value)}/>
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

export default AddSpecificInterview
