// // import React from 'react'

// // function how() {
// //   return (
// //     <div>how it works?</div>
// //   )
// // }

// // export default how


// import React from 'react';

// function HowItWorks() {
//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-7">
//       <h2 className="text-3xl font-bold text-center text-black mb-6">How Our Application Works</h2>

//       <div className="space-y-6">
//         {[
//           { title: "Sign Up & Login", description: "Users create an account and log in to access the platform." },
//           { title: "Enter Job Details", description: "Provide information such as job role/job position, job description/tech stack, and years of experience to tailor the interview process." },
//           { title: "AI-Generated Questions", description: "The system fetches AI-generated interview questions tailored to the selected job details." },
//           { title: "Speech-to-Text Integration", description: "Users respond to questions verbally, and their answers are transcribed in real-time." },
//           { title: "AI Evaluation & Feedback", description: "The AI analyzes responses and provides detailed feedback on content, clarity, and confidence." },
//           { title: "Review & Improve", description: "Users can review past interviews, check AI-generated insights, and refine their responses." },
//         ].map((step, index) => (
//           <div key={index} className="flex items-start space-x-4">
//             <span className="text-white bg-primary font-semibold rounded-full w-8 h-8 min-w-8 aspect-square flex items-center justify-center">
//               {index + 1}
//             </span>
//             <p className="text-lg">
//               <strong>{step.title}:</strong> {step.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       <p className="mt-6 text-gray-600 text-center">
//         Our platform helps users practice real-world interview scenarios and enhance their communication skills with AI-powered insights.
//       </p>
//     </div>
//   );
// }

// export default HowItWorks;


import React from 'react';

function HowItWorks() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-7">
      <h2 className="text-3xl font-bold text-center text-black mb-6">How Our Application Works</h2>

      <div className="space-y-6">
        {[
          { title: "Sign Up & Login", description: "Users create an account and log in to access the platform." },
          { 
            title: "Enter Job & Interview Preferences", 
            description: "The dashboard has two sections: In the first section, users provide job details such as job role, job description, and experience level. In the second section, users select a domain and difficulty level to tailor the interview process." 
          },
          { title: "AI-Generated Questions", description: "The system fetches AI-generated interview questions based on the provided job details, domain, and difficulty level." },
          { title: "Text-to-Speech Enabled Questions", description: "Each question can be read out loud using text-to-speech functionality for a more interactive experience." },
          { title: "Enable Webcam & Emotion Detection", description: "Users can enable the webcam for a more realistic interview setting. Emotion detection helps analyze facial expressions during responses." },
          { title: "Speech-to-Text Integration", description: "Users respond to questions verbally, and their answers are transcribed in real-time." },
          { title: "AI Evaluation & Feedback", description: "The AI analyzes responses and provides detailed feedback on content, clarity, and confidence." },
          { title: "Review & Improve", description: "Users can review past interviews, check AI-generated insights, and refine their responses." },
        ].map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <span className="text-white bg-primary font-semibold rounded-full w-8 h-8 min-w-8 aspect-square flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-lg">
              <strong>{step.title}:</strong> {step.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-600 text-center">
        Our platform helps users practice real-world interview scenarios and enhance their communication skills with AI-powered insights.
      </p>
    </div>
  );
}

export default HowItWorks;

