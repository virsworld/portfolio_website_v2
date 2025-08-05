import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-[-5%] from-info to-150% to-sky-blue h-screen flex flex-col">
        <Header is_front_page={true}/>
        <main className="flex flex-col items-center justify-center flex-grow">
          <div className="font-bold font-poppins text-9xl opacity-90 text-foreground">
            VIR PATEL
          </div>
        </main>
      </div>
    </>
  );
}
