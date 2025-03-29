import { Lightbulb, Volume2, VolumeX } from 'lucide-react'
import React, { useState } from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {


  console.log("mockInterviewQuestion type:", typeof mockInterviewQuestion);
  console.log("mockInterviewQuestion value:", mockInterviewQuestion);

  const [isSpeaking, setIsSpeaking] = useState(false);
  let speechInstance = null; 


  // const textToSpeach=(text)=>{
  //   if('speechSynthesis' in window){
  //     const speech=new SpeechSynthesisUtterance(text);
  //     window.speechSynthesis.speak(speech)
  //   }
  //   else{
  //     alert('Sorry,Your browser does not support text to speech')
  //   }
  // }

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        // Stop speech if it's already playing
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        // Start speech
        speechInstance = new SpeechSynthesisUtterance(text);
        speechInstance.onend = () => setIsSpeaking(false); // Reset state when speech ends
        window.speechSynthesis.speak(speechInstance);
        setIsSpeaking(true);
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech');
    }
  };

  return mockInterviewQuestion&&(
    
    <div className='p-5 border rounded-lg my-7'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>



          {mockInterviewQuestion&&mockInterviewQuestion?.map((question,index)=>(
          
          <h2 key={index} className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'text-white bg-primary'}`}>Question #{index+1}</h2>
        ))}  



         



      </div>
      <h2 className='my-3 text-sm md:text-md'>{mockInterviewQuestion?.[activeQuestionIndex]?.question}</h2>
      {/* <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} /> */}
        {/* Toggle between VolumeX (mute) and Volume2 (unmute) */}
        {isSpeaking ? (
          <VolumeX className='cursor-pointer' onClick={() => textToSpeech('')} />
        ) : (
          <Volume2
            className='cursor-pointer'
            onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
          />
        )}


      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div> 
    </div>
  )
}

export default QuestionsSection