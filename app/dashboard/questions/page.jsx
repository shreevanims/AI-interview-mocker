// import React from 'react'

// function commonQuestions() {
//   return (
//     <div>Common Questions</div>
//   )
// }

// export default commonQuestions



import React from 'react'

function CommonQuestions() {
  return (
    <div className="my-5 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Commonly Asked Interview Questions
      </h1>

      {/* Personal Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          🏆 Personal Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>Tell me about yourself.</li>
          <li>What are your strengths and weaknesses?</li>
          <li>Where do you see yourself in five years?</li>
          <li>Why do you want to work for our company?</li>
          <li>What motivates you?</li>
          <li>Why should we hire you?</li>
          <li>What do you know about our company?</li>
          <li>How do you handle criticism?</li>
        </ol>
      </div>

      {/* Behavioral Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          💼 Behavioral Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>Tell me about a time when you faced a challenge at work. How did you handle it?</li>
          <li>Give an example of a time you showed leadership.</li>
          <li>Describe a situation where you had to work under pressure.</li>
          <li>Tell me about a time when you made a mistake. How did you fix it?</li>
          <li>Have you ever had a conflict with a coworker? How did you resolve it?</li>
          <li>Describe a time when you had to meet a tight deadline.</li>
          <li>Tell me about a time when you went above and beyond your job duties.</li>
          <li>How do you handle constructive criticism?</li>
        </ol>
      </div>

      {/* Problem-Solving & Technical Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          🔧 Problem-Solving & Technical Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>Describe a difficult problem you solved. How did you approach it?</li>
          <li>What steps do you take when faced with a complex task?</li>
          <li>How do you handle unexpected changes in a project?</li>
          <li>Can you explain a technical concept to a non-technical person?</li>
          <li>Have you ever identified an issue in a process and improved it?</li>
          <li>Tell me about a time when you had to learn a new technology quickly.</li>
          <li>How do you prioritize multiple tasks when they are all urgent?</li>
          <li>Describe a time when you failed to meet a deadline. What did you learn?</li>
        </ol>
      </div>

      {/* Teamwork & Leadership Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          🤝 Teamwork & Leadership Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>How do you work in a team environment?</li>
          <li>Describe a time when you had to collaborate with a difficult colleague.</li>
          <li>What role do you usually take in a team?</li>
          <li>How do you keep your team motivated?</li>
          <li>Tell me about a time when you had to resolve a conflict within a team.</li>
          <li>Have you ever led a project? How did you ensure its success?</li>
          <li>How do you give and receive feedback in a team setting?</li>
          <li>What would you do if a team member was not contributing?</li>
        </ol>
      </div>

      {/* Work Ethic & Growth Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          🚀 Work Ethic & Growth Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>How do you handle multiple deadlines?</li>
          <li>Tell me about a time you received feedback and how you applied it.</li>
          <li>What do you do when you are not sure how to complete a task?</li>
          <li>How do you stay organized in your work?</li>
          <li>Describe a time when you had to learn a new skill quickly.</li>
          <li>How do you manage stress in the workplace?</li>
          <li>What are your career goals?</li>
          <li>How do you balance quality and efficiency in your work?</li>
        </ol>
      </div>

      {/* Job-Specific Questions */}
      <div className="mb-6 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-3 border-b pb-2">
          🎯 Job-Specific Questions
        </h2>
        <ol className="list-decimal pl-5 text-gray-800 space-y-2">
          <li>What experience do you have that makes you a good fit for this role?</li>
          <li>How do you stay updated with industry trends?</li>
          <li>What tools or software are you proficient in?</li>
          <li>Can you describe a project you worked on and your contributions?</li>
          <li>How do you ensure quality in your work?</li>
          <li>What certifications or training have you completed?</li>
          <li>How do you handle customer or client feedback?</li>
          <li>Describe a time when you had to explain a technical issue to a client.</li>
        </ol>
      </div>
    </div>
  )
}

export default CommonQuestions
