'use client';
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin, FaDiscord } from "react-icons/fa";

interface HeaderProps {
    is_front_page: boolean;
}

const Header: React.FC<HeaderProps> = ({ is_front_page }) => {
    // State to manage the visibility of the menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Dynamic background class
    const bg: string = is_front_page ? 'bg-none' : 'bg-gradient-to-r from-[-5%] from-info to-[150%] to-sky-blue';

    // Navigation links
    const navLinks = useMemo(() => [
        { name: "Projects", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ], []);

    // Used to stagger loading of navigation tiles
    const [visibleLinks, setVisibleLinks] = useState<string[]>([]);

    // Checking for menu close/open
    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuVisible(true);
            // Animation for fading in
            const timers = navLinks.map((link, index) => {
                return setTimeout(() => {
                    setVisibleLinks(prev => [...prev, link.name]);
                }, index * 250)
            })
            return () => timers.forEach(timer => clearTimeout(timer));
        } else {
            // Animation for fading out
            const reversedLinks = [...navLinks].reverse();
            const timers = reversedLinks.map((link, index) => {
                return setTimeout(() => {
                    setVisibleLinks(prev => prev.filter(name => name !== link.name));
                }, index * 250)
            })

            // Calculate the total duration of the fade-out animation
            const totalDuration = navLinks.length * 250 + 300; // Add a buffer for the transition-opacity
            const menuCloseTimer = setTimeout(() => {
                setIsMenuVisible(false); // Hide the entire menu after the animation is done
            }, totalDuration);

            return () => {
                timers.forEach(timer => clearTimeout(timer));
                clearTimeout(menuCloseTimer);
            };
        }
    }, [isMenuOpen, navLinks]);

    return (
        <>
            {/* Full-screen Navigation Menu */}
            <header className={`w-full z-50 relative flex items-center justify-between px-6 py-4`}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                        className="opacity-90 z-50 hover:opacity-100 invert dark:invert-0"
                        src={'/assets/project/logo-removebg.png'}
                        alt="Logo"
                        width={70}
                        height={70}
                    />
                </Link>

                {/* Burger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex flex-col items-center justify-center w-8 h-8 focus:outline-none z-50 cursor-pointer"
                    aria-label="Toggle navigation menu"
                >
                    <span
                        className={`invert block h-0.5 w-7 rounded-full transform transition duration-300 ease-in-out bg-background ${
                            isMenuOpen ? 'rotate-45 translate-y-0.25' : '-translate-y-1'
                        }`}
                    ></span>
                    <span
                        className={`invert block h-0.5 w-7 rounded-full transform transition duration-300 ease-in-out bg-background ${
                            isMenuOpen ? '-rotate-45 -translate-y-0.25' : 'translate-y-1'
                        }`}
                    ></span>
                </button>
            </header> 

            {/* Full-screen Navigation Menu */}
            <div
                className={`fixed bg-transparent inset-0 w-full z-40 transition-opacity duration-300
                    ${isMenuVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    bg-background grid grid-cols-2 grid-rows-2`}
            >
                {navLinks.map((link, index) => {
                    if (link.name !== 'Contact')
                        return <div
                            key={link.name}
                            className={`
                                flex items-center justify-center
                                bg-background
                                text-foreground
                                underline
                                
                                transition-opacity duration-300
                                ${visibleLinks.includes(link.name) ? 'opacity-100' : 'opacity-0'}
                            `}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <p className="text-xl sm:text-3xl font-bold">{link.name}</p>
                            </Link>
                        </div>
                    else
                        return <div
                            key={link.name}
                            className={`
                                relative
                                bg-background
                                text-foreground
                                pl-20
                                pt-70
                                transition-opacity duration-300
                                ${visibleLinks.includes(link.name) ? 'opacity-100' : 'opacity-0'}
                            `}
                        >
                            <p className="text-xl sm:text-3xl font-bold">{`${link.name}.`}</p>
                            <div className="fixed bottom-0 right-0 p-4">
                                <ul>
                                    <div className="flex gap-2">
                                        <MdAlternateEmail className="dark:invert-1" size={22}/><li>virpatel71@gmail.com</li>
                                    </div>
                                    <div className="flex gap-2">
                                        <FaLinkedin className="dark:invert-1 " size={21}/><a target="_blank" href="https://www.linkedin.com/in/vir-patel"><li>linkedin.com/in/vir-patel</li></a>
                                    </div>
                                    <div className="flex gap-2">
                                        <FaDiscord className="dark:invert-1 " size={22}/><li>virwashere</li>
                                    </div>
                                </ul>
                            </div>

                        </div>
                })}
            </div>
        </>
    )
}

export default Header