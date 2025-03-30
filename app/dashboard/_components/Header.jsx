// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// function Header() {

//     const path=usePathname();
//     useEffect(()=>{
//         console.log(path);
//     },[])

//   return (
//     <div className='flex p-4 items-center justify-between bg-blue-50 shadow-md'>
//         <Image src={'/logo1.png'} width={120} height={107} alt='logo' />  
//         <ul className='hidden md:flex gap-16'>
//           <Link href="/dashboard">
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font-bold'}`}>Dashboard</li>
//           </Link>
//           <Link href="/dashboard/questions">
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&& 'text-primary font-bold'}`}>Questions</li>
//           </Link>
//           <Link href="/dashboard/how">
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&& 'text-primary font-bold'}`}>How it Works?</li>
//           </Link>  
//         </ul>
//         <UserButton/>
//     </div>
//   )
// }

// export default Header



"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react' // Icons for menu toggle

function Header() {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        console.log(path);
    }, []);

    return (
        <div className='flex p-4 items-center justify-between bg-blue-50 shadow-md'>
            {/* Logo */}
            <Image src={'/logo1.png'} width={120} height={107} alt='logo' />

            {/* Desktop Navigation (visible on md and larger) */}
            <ul className='hidden md:flex gap-16'>
                <Link href="/dashboard">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                </Link>
                <Link href="/dashboard/questions">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
                </Link>
                <Link href="/dashboard/how">
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</li>
                </Link>
            </ul>

            {/* User Button for large screens */}
            <div className='hidden md:block'>
                <UserButton />
            </div>

            {/* Hamburger Menu for Small Screens */}
            <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu (Dropdown) */}
            {isMenuOpen && (
                <div className='absolute top-16 right-5 bg-white shadow-lg p-5 rounded-md flex flex-col items-start w-48'>
                    <Link href="/dashboard" className='w-full' onClick={() => setIsMenuOpen(false)}>
                        <p className={`p-2 w-full text-left hover:bg-gray-200 rounded-md ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</p>
                    </Link>
                    <Link href="/dashboard/questions" className='w-full' onClick={() => setIsMenuOpen(false)}>
                        <p className={`p-2 w-full text-left hover:bg-gray-200 rounded-md ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</p>
                    </Link>
                    <Link href="/dashboard/how" className='w-full' onClick={() => setIsMenuOpen(false)}>
                        <p className={`p-2 w-full text-left hover:bg-gray-200 rounded-md ${path === '/dashboard/how' && 'text-primary font-bold'}`}>How it Works?</p>
                    </Link>
                    <div className='border-t my-2 w-full'></div>
                    <div className='w-full flex'>
                        <UserButton />
                        <p className="text-md ml-2 my-5">Profile</p> {/* Optional Text */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;

