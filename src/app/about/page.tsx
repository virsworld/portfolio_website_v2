'use client';

import Header from "../components/Header";
import Image from "next/image";
import Tilt from 'react-parallax-tilt'


export default function About() {
    return (
        <>
            <Header is_front_page={false}/>
            <div className="z-0 absolute top-0 left-0 h-full flex items-center">
                <Tilt>

                <Image 
                className="p-4"
                src={'/assets/about/baymax.jpeg'}
                alt='Me at Anime North'
                width={2000}
                height={500}
                priority
                />
                </Tilt>
                <p className="p-20">
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
                    and playing video games. If you think we could be friends don't hesitate
                    to contact me!
                    
                </p>
            </div>
        </>
    )
}