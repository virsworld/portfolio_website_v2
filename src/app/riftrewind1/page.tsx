'use client';

import Header from "../components/Header";
import RiotLookup from "../components/RiotLookup";

import dynamic from 'next/dynamic';
import WebRing from "../components/WebRing";

const Model = dynamic(() => import('../../app/components/Model'), { ssr: false });

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Header is_front_page={true}/>
      <div className="h-full flex flex-col z-10 bg-gradient-to-b from-[-5%] from-info to-150% to-sky-blue">
        <Model />
        <RiotLookup />
      </div>
      <WebRing/>
    </div>
  )
}