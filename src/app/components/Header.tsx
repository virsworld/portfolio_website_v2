'use client';
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin, FaDiscord } from "react-icons/fa";
import AWSLogo from '../../../public/aws.svg';

interface HeaderProps {
    is_front_page: boolean;
}

const Header: React.FC<HeaderProps> = ({ is_front_page }) => {
    // State to manage the visibility of the menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Make header transparent on front page
    const bg: string = is_front_page ? 'w-full bg-transparent z-70 fixed flex items-center justify-between px-6 py-4 backdrop-blur-xs' : 'left-0 right-0 top-0 w-full bg-transparent z-70 sticky flex items-center justify-between px-6 py-4 backdrop-blur-xs';

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
            {/* Header bar with logo and burger icon */}
            <header className={bg}>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Image
                        className="opacity-90 hover:opacity-100 invert dark:invert-0"
                        src={'/assets/project/logo-removebg.png'}
                        alt="Logo"
                        width={70}
                        height={70}
                    />
                </Link>
                <Link href="/riftrewind1" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row">
                        <AWSLogo
                            className="h-10 w-auto opacity-90 hover:opacity-100 dark:invert-0"
                        />
                        <p className="px-4 pt-3 font-mono text-md">Rift Rewind 1</p>
                    </div>
                </Link>
                {/* Burger Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex flex-col items-center justify-center w-8 h-8 focus:outline-none cursor-pointer"
                    aria-label="Toggle navigation menu"
                >
                    <span
                        className={`invert block h-0.5 w-7 rounded-full transform transition duration-300 ease-in-out bg-background ${
                            isMenuOpen ? 'rotate-45 translate-y-px' : '-translate-y-1'
                        }`}
                    ></span>
                    <span
                        className={`invert block h-0.5 w-7 rounded-full transform transition duration-300 ease-in-out bg-background ${
                            isMenuOpen ? '-rotate-45 -translate-y-px' : 'translate-y-1'
                        }`}
                    ></span>
                </button>
            </header>

            {/* Full-screen Navigation Menu */}
            <div
                className={`fixed bg-transparent inset-0 w-full z-60 transition-opacity duration-300
                    ${isMenuVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
                    bg-background grid grid-cols-1 md:grid-cols-2 md:grid-rows-2`}
            >
                {navLinks.map((link) => {
                    if (link.name !== 'Contact')
                        return <div
                            key={link.name}
                            className={`
                                flex items-center justify-center
                                bg-background
                                text-foreground
                                underline
                                transition-opacity duration-300
                                pt-10
                                ${visibleLinks.includes(link.name) ? 'opacity-100' : 'opacity-0'}
                            `}
                        >
                            <Link
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <p className="text-3xl sm:text-3xl font-bold">{link.name}</p>
                            </Link>
                        </div>
                    else
                        return <div
                            key={link.name}
                            className={`
                                relative
                                flex flex-col items-center justify-center
                                bg-background
                                text-foreground
                                transition-opacity duration-300
                                ${visibleLinks.includes(link.name) ? 'opacity-100' : 'opacity-0'}
                            `}
                        >
                            <p className="text-3xl sm:text-3xl font-bold">{`${link.name}.`}</p>
                            <div className="mt-6 text-center md:text-left md:absolute md:bottom-8 md:right-8 md:mt-0 md:p-4">
                                <ul>
                                    <li className="flex gap-2 items-center justify-center md:justify-start mb-2">
                                        <MdAlternateEmail className="dark:invert-1" size={22}/><span>virpatel71@gmail.com</span>
                                    </li>
                                    <li className="flex gap-2 items-center justify-center md:justify-start mb-2">
                                        <FaLinkedin className="dark:invert-1 " size={21}/><a target="_blank" href="https://www.linkedin.com/in/vir-patel" className="hover:underline"><span>linkedin.com/in/vir-patel</span></a>
                                    </li>
                                    <li className="flex gap-2 items-center justify-center md:justify-start">
                                        <FaDiscord className="dark:invert-1 " size={22}/><span>virwashere</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                })}
            </div>
        </>
    )
}

export default Header;
