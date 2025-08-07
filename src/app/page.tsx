import Image from "next/image";

import Header from "./components/Header";

import Model from "./components/Model";



export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="h-full flex flex-col z-10 bg-gradient-to-b from-[-5%] from-info to-150% to-sky-blue">
        <Header is_front_page={true}/>
        <Model />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold font-poppins text-9xl opacity-90 text-background z-20">
          VIR PATEL
        </div>
      </div>
    </div>
  )
}