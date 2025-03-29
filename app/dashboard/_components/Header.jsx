"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-blue-50 shadow-md'>
        <Image src={'/logo1.png'} width={120} height={107} alt='logo' />  
        <ul className='hidden md:flex gap-16'>
          <Link href="/dashboard">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font-bold'}`}>Dashboard</li>
          </Link>
          <Link href="/dashboard/questions">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&& 'text-primary font-bold'}`}>Questions</li>
          </Link>
          <Link href="/dashboard/how">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&& 'text-primary font-bold'}`}>How it Works?</li>
          </Link>  
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header