'use client';

import Header from "./components/Header";

import dynamic from 'next/dynamic';
import WebRing from "./components/WebRing";

const Model = dynamic(() => import('../app/components/Model'), { ssr: false });

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Header is_front_page={true}/>
      <div className="h-full flex flex-col z-10 bg-gradient-to-b from-[-5%] from-info to-150% to-sky-blue">
        <Model />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold font-poppins text-9xl opacity-90 text-background z-20">
          VIR PATEL
        </div>
      </div>
      <WebRing/>
    </div>
  )
}