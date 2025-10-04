'use client';

import Header from "../components/Header";
import Image from "next/image";
import Tilt from 'react-parallax-tilt'


export default function About() {
    return (
        <>
            <Header is_front_page={false}/>
            <div className="relative flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-20">
                <Tilt>

                <Image 
                className="p-4 max-w-full h-auto"
                src={'/assets/about/baymax.jpeg'}
                alt='Me at Anime North'
                width={600}
                height={300}
                priority
                />
                </Tilt>
                <p className="p-4 md:p-10 max-w-lg">
                    I was born in Uganda and immigrated to Canada when I was 7 years old.
                    Currently home to the Waterloo Region.
                    <br></br>
                    <br></br>
                    I am enrolled as an undergraduate student at the
                    University of Toronto under the Computer Engineering program.
                    <br></br>
                    <br></br>
                    I aspire to build interesting and impactful products to enrich
                    the lives of others.
                    <br></br>
                    <br></br>
                    Some of my hobbies include playing basketball, building cool projects,
                    and playing video games. If you think we could be friends don&apos;t hesitate
                    to contact me!
                    
                </p>
            </div>
        </>
    )
}