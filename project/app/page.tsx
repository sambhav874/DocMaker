'use client'
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Image from "next/image";
import {gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {


useEffect(() => {
  const timeline1 = gsap.timeline({ repeat: -1, yoyo: true });
    timeline1.to('.bg-animate-1', { x: 200, duration: 2, ease: 'power1.inOut' });

    const timeline2 = gsap.timeline({ repeat: -1, yoyo: true });
    timeline2.to('.bg-animate-2', { x: -200, duration: 2, ease: 'power1.inOut' });

} , [])

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between bg-slate-900 p-20">
      <div className="h-full fixed overflow-hidden bg-white w-full -skew-x-12 text-black m-12"></div>
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <div className="flex top-6  left-6">

          <h1 className="xl:text-9xl xl:pb-4 lg:text-7xl text-6xl font-extralight italic bg-gradient-to-b from-white via-gray-300 to-black bg-clip-text text-transparent font-sans pr-6">
            DocMaker
          </h1>
          
          
<div className="ml-8">
  <div className="absolute top-4 right-4 flex justify-center items-center gap-4 lg:static">
    <SignedOut>
                <SignInButton >
                <div className="lg:static lg:shadow-md hover:shadow-slate-700 bg-dark-100 hover:bg-white hover:text-dark-100 rounded-md text-white font-bold font-sans tracking-wider p-2 transform hover:scale-105 transition-transform duration-100">
                    Sign In
                  </div>
                  </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn> <Link href={'/documents/'} className=" lg:static lg:shadow-md hover:shadow-slate-700 bg-dark-100 hover:bg-white hover:text-dark-100 rounded-md  text-white font-bold font-sans tracking-wider p-2  transform hover:scale-105 transition-transform duration-100">
          Documents
        </Link></div>

          </div>
          <div className="h-2/3  fixed overflow-hidden w-1/2 -skew-x-12 xl:m-40 lg:m-32 bg-gradient-to-r from-blue-400 via-purple-600 to-blue-700 text-black m-24 bg-animate-1"></div>
          <div className="h-2/3  fixed overflow-hidden w-1/2 skew-x-12 xl:m-40 lg:m-32 bg-gradient-to-b from-indigo-900 via-purple-800 to-black text-black m-24 bg-animate-2"></div>
          </div>
        
        
        
        
      </div>
    </main>
  );
}
