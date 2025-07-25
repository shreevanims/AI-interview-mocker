// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h2>Hii Shreevani!</h2>
//       <Button>Submit</Button>
//     </div>

//   );
// }


// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-gray-900">
//       <h1 className="text-6xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 drop-shadow-lg">
//         Welcome to AI Mock Interview
//       </h1>
//       <p className="text-2xl text-gray-800 text-center max-w-3xl font-medium italic">
//         Your personal <span className="text-blue-800 font-bold">AI-powered</span> interview coach.<br />
//         Get <span className="text-blue-900 font-bold">instant feedback</span> and improve your answers!
//       </p>

//       <Button
//         className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-300 rounded-xl shadow-lg transform hover:scale-105"
//         onClick={() => router.push("/dashboard")}
//       >
//         Start Your Journey 🚀
//       </Button>
//     </div>
//   );
// }



// "use client";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleNavigation = () => {
//     setLoading(true); // Show loading state
//     router.push("/dashboard");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 text-gray-900">
//       <h1 className="text-6xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 drop-shadow-lg">
//         Welcome to AI Mock Interview
//       </h1>
//       <p className="text-2xl text-gray-800 text-center max-w-3xl font-medium italic">
//         Your personal <span className="text-blue-800 font-bold">AI-powered</span> interview coach.<br />
//         Get <span className="text-blue-900 font-bold">instant feedback</span> and improve your answers!
//       </p>

//       <Button
//         className="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-300 rounded-xl shadow-lg transform hover:scale-105 disabled:opacity-50"
//         onClick={handleNavigation}
//         disabled={loading} // Disable button when loading
//       >
//         {loading ? "Loading..." : "Start Your Journey 🚀"}
//       </Button>
//     </div>
//   );
  
// }

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setLoading(true); // Show loading state
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-gray-900 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900 drop-shadow-lg">
        Welcome to AI Mock Interview
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-xl md:text-2xl text-gray-800 text-center max-w-2xl md:max-w-3xl font-medium italic leading-relaxed">
        Your personal <span className="text-blue-800 font-bold">AI-powered</span> interview coach.<br />
        Get <span className="text-blue-900 font-bold">instant feedback</span> and improve your answers!
      </p>

      {/* Button */}
      <Button
        className="mt-6 px-5 py-2 sm:px-6 sm:py-3 text-md sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-300 rounded-lg sm:rounded-xl shadow-lg transform hover:scale-105 disabled:opacity-50"
        onClick={handleNavigation}
        disabled={loading} // Disable button when loading
      >
        {loading ? "Loading..." : "Start Your Journey 🚀"}
      </Button>
    </div>
  );
}

