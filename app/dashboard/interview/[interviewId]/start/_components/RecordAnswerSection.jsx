// "use client";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import useSpeechToText from "react-hook-speech-to-text";
// import { Mic, StopCircle } from "lucide-react";
// import { toast } from "sonner";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { UserAnswer } from "@/utils/schema";
// import moment from "moment";
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/utils/db";


// import { useSearchParams } from 'next/navigation';


// function RecordAnswerSection({
//   mockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) {


//   const searchParams = useSearchParams();
//   const webcamEnabled = searchParams.get('webcam') === 'true'; // Get webcam state


//   const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);

  



  
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results?.map((result) => {
//       setUserAnswer((prevAns) => prevAns + result?.transcript);
//     });
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer?.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     console.log(userAnswer);
//     setLoading(true);
//     // const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+", User Answer:"+userAnswer+" Correct Answer:"+mockInterviewQuestion[activeQuestionIndex]?.answer+
//     //   // ", Evaluate the userAnswer for the given interview question by comparing it with the correct answer. Assess the overall quality, effectiveness, and completeness of the response based on the following criteria:-Accuracy & Relevance: Does the response correctly address the question? Are there any factual errors or misunderstandings? , Depth & Completeness: Does the response provide sufficient details, or is it too vague or incomplete? , Clarity & Structure: Is the answer well-organized and easy to understand? Does it follow a logical flow? , Conciseness & Efficiency: Is the response clear and to the point, or does it include unnecessary information? , Professionalism & Communication Skills: Does the response sound confident, well-articulated, and appropriate for an interview setting? ,Please give: Rating (Out of 10): Score the response based on how well it answers the question,Detailed Feedback:-Strengths: Highlight well-articulated or insightful points.Areas for Improvement:Identify any inaccuracies, missing details, or unclear explanations.If necessary, specific suggestions for refining the response.Note: If the response is already strong, focus on reinforcing its strengths and providing minor refinements for improvement."
//     //   ", Based on the answer given by the user for the given interview question please give rating for user's answer by comparing the user's answer with the correct answer for the question and also give feedback for the user's amswer including the area of improvement if any to improve it in jSON format with rating field and feedback field...the feedback should not be too large..it should be in maximum 10 lines."

//     const feedbackPrompt =
//       "Question: " +
//       mockInterviewQuestion[activeQuestionIndex]?.question +
//       ", User Answer: " +
//       userAnswer +
//       ", Correct Answer: " +
//       mockInterviewQuestion[activeQuestionIndex]?.answer +
//       ". Compare the user's answer with the correct answer and provide a JSON object containing: " +
//       "1. A 'rating' field (a score out of 10 based on correctness and completeness), " +
//       "2. A 'feedback' field (maximum 10 lines) with constructive criticism and areas for improvement. " +
//       "Ensure the response is a JSON object and does not contain any extra text or explanations or special characters.";

//     const result = await chatSession.sendMessage(feedbackPrompt);

    

//     const mockJsonResp = result.response
//       .text()
//       .replace(/```json|```/g, "")
//       .trim();
//     // replace('```json','').replace('```','');
//     console.log(mockJsonResp);
//     const JsonFeedbackResp = JSON.parse(mockJsonResp);

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//       correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//       userAns: userAnswer,
//       feedback: JsonFeedbackResp?.feedback,
//       rating: JsonFeedbackResp?.rating,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       createdAt: moment().format("DD-MM-yyyy"),
//     });

//     if (resp) {
//       toast("User answer recorded successfully");
//       setUserAnswer("");
//       setResults([]);
//     }
//     setResults([]);

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="flex flex-col my-9 w-[440px] h-[330px] justify-center items-center bg-black rounded-lg p-5">
//         {/* <Image
//           src={"/webcam.png"}
//           width={200}
//           height={200}
//           alt="webcam-icon"
//           className="absolute"
//           priority
//         />

//         <Webcam
//           mirrored={true}
//           style={{
//             height: 300,
//             width: "100%",
//             zIndex: 10,
//           }}
//         /> */}

//         {webcamEnabled ? (
//           <Webcam
//             mirrored={true}
//             style={{
//               height: 300,
//               width: "100%",
//               zIndex: 10,
//             }}
//           />
//         ) : (
//           <Image
//             src={"/webcam.png"}
//             width={200}
//             height={200}
//             alt="webcam-icon"         
//             priority
//           />
//         )}   
        
//       </div>


//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-1 border"
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
//             <StopCircle />
//             Stop Recording...
//           </h2>
//         ) : (
//           <h2 className="text-primary flex gap-2 items-center">
//             <Mic />
//             Record Answer
//           </h2>
//         )}
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;

// "use client";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";
// import useSpeechToText from "react-hook-speech-to-text";
// import { Mic, StopCircle } from "lucide-react";
// import { toast } from "sonner";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { UserAnswer } from "@/utils/schema";
// import moment from "moment";
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/utils/db";
// import { useSearchParams } from 'next/navigation';

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const searchParams = useSearchParams();
//   const webcamEnabled = searchParams.get('webcam') === 'true';

//   const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [emotions, setEmotions] = useState(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("/models");
//     };
//     loadModels();
//   }, []);

//   const detectFace = async () => {
//     if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//       const video = webcamRef.current.video;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       const displaySize = { width: video.videoWidth, height: video.videoHeight };
//       faceapi.matchDimensions(canvas, displaySize);
//       canvas.width = displaySize.width;
//       canvas.height = displaySize.height;

//       const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (detections.length > 0) {
//         setEmotions(detections[0].expressions);
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);

//         resizedDetections.forEach((detection) => {
//           const { x, y, width, height } = detection.detection.box;

//           ctx.strokeStyle = "#00008B"; // Keep box red
//           ctx.lineWidth = 3;
//           ctx.strokeRect(x, y, width, height);
//         });

//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       } else {
//         setEmotions(null);
//       }
//     }
//   };

//   useEffect(() => {
//     if (webcamEnabled) {
//       const interval = setInterval(detectFace, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [webcamEnabled]);

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="relative flex my-9 w-[460px] h-[350px] justify-center items-center bg-gray-900 rounded-lg p-5">
//         {webcamEnabled ? (
//           <>
//             <Webcam
//               ref={webcamRef}
//               mirrored={true}
//               style={{
//                 height: 300,
//                 width: "100%",
//                 position: "absolute",
//                 zIndex: 10,
//               }}
//             />
//             <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//             {emotions && (
//               <div className="absolute top-5 right-[-180px] bg-[#4845D2] text-white p-3 rounded-lg shadow-lg">
//                 <h3 className="font-bold text-white">Detected Emotions</h3>
//                 {Object.entries(emotions).map(([emotion, value]) => (
//                   <p key={emotion} className="text-sm">{emotion}: {(value * 100).toFixed(1)}%</p>
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           <Image
//             src={"/webcam.png"}
//             width={200}
//             height={200}
//             alt="webcam-icon"
//             priority
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default RecordAnswerSection;






// "use client";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import React, { useEffect, useState, useRef } from "react";
// import Webcam from "react-webcam";
// import useSpeechToText from "react-hook-speech-to-text";
// import { Mic, StopCircle } from "lucide-react";
// import { toast } from "sonner";
// import { chatSession } from "@/utils/GeminiAIModal";
// import { UserAnswer } from "@/utils/schema";
// import moment from "moment";
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/utils/db";
// import { useSearchParams } from 'next/navigation';
// import * as faceapi from "face-api.js";

// function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const searchParams = useSearchParams();
//   const webcamEnabled = searchParams.get('webcam') === 'true';

//   const [userAnswer, setUserAnswer] = useState("");
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [emotions, setEmotions] = useState(null);

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//     setResults,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect(() => {
//     results?.map((result) => {
//       setUserAnswer((prevAns) => prevAns + result?.transcript);
//     });
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer?.length > 10) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const UpdateUserAnswer = async () => {
//     console.log(userAnswer);
//     setLoading(true);

//     const feedbackPrompt =
//       "Question: " +
//       mockInterviewQuestion[activeQuestionIndex]?.question +
//       ", User Answer: " +
//       userAnswer +
//       ", Correct Answer: " +
//       mockInterviewQuestion[activeQuestionIndex]?.answer +
//       ". Compare the user's answer with the correct answer and provide a JSON object containing: " +
//       "1. A 'rating' field (a score out of 10 based on correctness and completeness), " +
//       "2. A 'feedback' field (maximum 10 lines) with constructive criticism and areas for improvement. " +
//       "Ensure the response is a JSON object and does not contain any extra text or explanations or special characters.";

//     const result = await chatSession.sendMessage(feedbackPrompt);

//     const mockJsonResp = result.response
//       .text()
//       .replace(/```json|```/g, "")
//       .trim();
//     console.log(mockJsonResp);
//     const JsonFeedbackResp = JSON.parse(mockJsonResp);

//     const resp = await db.insert(UserAnswer).values({
//       mockIdRef: interviewData?.mockId,
//       question: mockInterviewQuestion[activeQuestionIndex]?.question,
//       correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//       userAns: userAnswer,
//       feedback: JsonFeedbackResp?.feedback,
//       rating: JsonFeedbackResp?.rating,
//       userEmail: user?.primaryEmailAddress?.emailAddress,
//       createdAt: moment().format("DD-MM-yyyy"),
//     });

//     if (resp) {
//       toast("User answer recorded successfully");
//       setUserAnswer("");
//       setResults([]);
//     }
//     setResults([]);
//     setLoading(false);
//   };

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("/models");
//     };
//     loadModels();
//   }, []);

//   const detectFace = async () => {
//     if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//       const video = webcamRef.current.video;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       const displaySize = { width: video.videoWidth, height: video.videoHeight };
//       faceapi.matchDimensions(canvas, displaySize);
//       canvas.width = displaySize.width;
//       canvas.height = displaySize.height;

//       const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (detections.length > 0) {
//         setEmotions(detections[0].expressions);
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);

//         resizedDetections.forEach((detection) => {
//           const { x, y, width, height } = detection.detection.box;

//           ctx.strokeStyle = "red"; 
//           ctx.lineWidth = 3;
//           ctx.strokeRect(x, y, width, height);
//         });

//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       } else {
//         setEmotions(null);
//       }
//     }
//   };

//   useEffect(() => {
//     if (webcamEnabled) {
//       const interval = setInterval(detectFace, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [webcamEnabled]);

//   return (
//     <div className="flex items-center justify-center flex-col">
//       <div className="relative flex my-9 w-[420px] h-[320px] justify-center items-center bg-gray-900 rounded-lg p-5">
//         {webcamEnabled ? (
//           <>
//             <Webcam
//               ref={webcamRef}
//               mirrored={true}
//               style={{
//                 height: 300,
//                 width: "100%",
//                 position: "absolute",
//                 zIndex: 10,
//               }}
//             />
//             <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//             {emotions && (
//               <div className="absolute top-5 right-[-180px] bg-[#4845D2] text-white p-3 rounded-lg shadow-lg">
//                 <h2 className="font-bold text-white">Detected Emotions</h2>
//                 {Object.entries(emotions).map(([emotion, value]) => (
//                   <p key={emotion} className="text-sm">{emotion}: {(value * 100).toFixed(1)}%</p>
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           <Image
//             src={"/webcam.png"}
//             width={200}
//             height={200}
//             alt="webcam-icon"
//             priority
//           />
//         )}
//       </div>

//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-1 border"
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
//             <StopCircle />
//             Stop Recording...
//           </h2>
//         ) : (
//           <h2 className="text-primary flex gap-2 items-center">
//             <Mic />
//             Record Answer
//           </h2>
//         )}
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;


"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { useSearchParams } from "next/navigation";
import * as faceapi from "face-api.js";

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const searchParams = useSearchParams();
  const webcamEnabled = searchParams.get('webcam') === 'true';

  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotions, setEmotions] = useState(null);
  const [confidenceMsg, setConfidenceMsg] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set()); // Track answered questions


  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results?.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer: " +
      userAnswer +
      ", Correct Answer: " +
      mockInterviewQuestion[activeQuestionIndex]?.answer +
      ". Compare the user's answer with the correct answer and provide a JSON object containing: " +
      "1. A 'rating' field (a score out of 10 based on correctness and completeness), " +
      "2. A 'feedback' field as a single string (not an array or object) (maximum 10 lines) with constructive criticism and areas for improvement. " +
      "Ensure the response is a JSON object and does not contain any extra text or explanations or special characters.";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User answer recorded successfully");


      // Add current question to answered set
      setAnsweredQuestions((prev) => new Set(prev).add(activeQuestionIndex));


      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detections.length > 0) {
        setEmotions(detections[0].expressions);
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        resizedDetections.forEach((detection) => {
          const { x, y, width, height } = detection.detection.box;

          ctx.strokeStyle = "red"; 
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);
        });

        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Determine confidence message based on emotions
        // const maxEmotion = Object.entries(detections[0].expressions).reduce((max, curr) => curr[1] > max[1] ? curr : max);
        // const confidenceThreshold = 0.5;

        // if (maxEmotion[0] === "happy" || maxEmotion[0] === "neutral") {
        //   setConfidenceMsg("You look confident!");
        // } else if (maxEmotion[1] > confidenceThreshold) {
        //   setConfidenceMsg("You seem a bit nervous.");
        // } else {
        //   setConfidenceMsg("");
        // }
         
        // Determine confidence message based on emotions
// const maxEmotion = Object.entries(detections[0].expressions).reduce(
//   (max, curr) => (curr[1] > max[1] ? curr : max)
// );

// const negativeEmotions = ["sad", "fearful", "angry", "disgusted", "surprised"];

// if (maxEmotion[0] === "happy" || maxEmotion[0] === "neutral") {
//   setConfidenceMsg("You look confident!");
// } else if (negativeEmotions.includes(maxEmotion[0])) {
//   setConfidenceMsg("You seem a bit nervous."); // Always show nervous message for negative emotions
// } else {
//   setConfidenceMsg(""); // Default case (shouldn't happen often)
// }
const emotionsObj = detections[0].expressions;

// Define positive emotions
const positiveEmotions = ["happy", "neutral"];

// Check if any non-positive emotion has a significant presence
const hasOtherEmotions = Object.entries(emotionsObj).some(
  ([emotion, value]) => !positiveEmotions.includes(emotion) && value > 0.001 // Ensuring it's detected properly
);

if (hasOtherEmotions) {
  setConfidenceMsg("You seem a bit nervous.");
} else {
  setConfidenceMsg("You look confident!");
}



      } else {
        setEmotions(null);
        setConfidenceMsg("");
      }
    }
  };

  useEffect(() => {
    if (webcamEnabled) {
      const interval = setInterval(detectFace, 1000);
      return () => clearInterval(interval);
    }
  }, [webcamEnabled]);

  return (
    <div className="flex items-center justify-center flex-col">

       {/* Confidence message below the record button */}
      {/* {confidenceMsg && <p className="mt-2 text-lg font-semibold text-gray-700">{confidenceMsg}</p>} */}

            {/* {confidenceMsg && (
  <p className={`mb-1 text-lg font-semibold ${
    confidenceMsg.includes("confident") ? "text-green-600" : "text-orange-500"
  }`}>
    {confidenceMsg}
  </p>
)} */}

{/* Confidence Message with Fixed Height */}
<div className="h-6">
  {confidenceMsg && (
    <p className={`text-lg font-semibold transition-all duration-300 ${
      confidenceMsg.includes("confident") ? "text-green-600" : "text-orange-500"
    }`}>
      {confidenceMsg}
    </p>
  )}
</div>

      {/* <div className="relative flex my-9 w-[420px] h-[320px] justify-center items-center bg-gray-900 rounded-lg p-1">
        {webcamEnabled ? (
          <>
            <Webcam
              ref={webcamRef}
              mirrored={true}
              style={{
                height: 300,
                width: "100%",
                position: "absolute",
                zIndex: 10,
              }}
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            {emotions && (
              
              // <div className="absolute top-5 right-[-180px] bg-[#4845D2] text-white p-3 rounded-lg shadow-lg">
              <div className="absolute top-5 right-0 sm:right-2 md:right-[-180px] bg-[#4845D2] text-white p-3 rounded-lg shadow-lg w-[140px] sm:w-[160px] md:w-auto">

                <h2 className="font-bold text-white">Detected Emotions</h2>
                {Object.entries(emotions).map(([emotion, value]) => (
                  <p key={emotion} className="text-sm">{emotion}: {(value * 100).toFixed(1)}%</p>
                ))}
              </div>
            )}
          </>
        ) : (
          <Image
            src={"/webcam.png"}
            width={200}
            height={200}
            alt="webcam-icon"
            priority
          />
        )}
      </div> */}

<div className="relative flex my-9 w-[420px] h-[320px] justify-center items-center bg-gray-900 rounded-lg p-1 sm:flex-row flex-col">
  {webcamEnabled ? (
    <>
      {/* Webcam - moves left on small screens */}
      <div className="relative w-full sm:w-[100%] h-[220px] sm:h-[300px] flex justify-center items-center">
        <Webcam
          ref={webcamRef}
          mirrored={true}
          className="absolute w-full h-full z-10"
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>

      {/* Emotion detection box - shifts right on small screens, but unchanged on medium & large */}
      {emotions && (
        <div className="absolute top-5 right-0 sm:right-[-180px] bg-[#4845D2] text-white p-3 rounded-lg shadow-lg w-[140px] sm:w-[160px] md:w-auto">
          <h2 className="font-bold text-white">Detected Emotions</h2>
          {Object.entries(emotions).map(([emotion, value]) => (
            <p key={emotion} className="text-sm">{emotion}: {(value * 100).toFixed(1)}%</p>
          ))}
        </div>
      )}
    </>
  ) : (
    <Image
      src={"/webcam.png"}
      width={200}
      height={200}
      alt="webcam-icon"
      priority
    />
  )}
</div>


      {/* <Button
        disabled={loading}
        variant="outline"
        className="my-1 border"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button> */}

       {/* Disable recording if the question has already been answered */}
       <Button
        disabled={loading || answeredQuestions.has(activeQuestionIndex)}
        variant="outline"
        className=" border"
        onClick={StartStopRecording}
      >
        {answeredQuestions.has(activeQuestionIndex) ? (
          <h2 className="text-gray-500 flex gap-2 items-center">
            Answer Recorded ✅
          </h2>
        ) : isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>

    </div>
  );
}

export default RecordAnswerSection;


