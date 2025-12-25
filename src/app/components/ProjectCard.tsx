import React from 'react';
import { Project } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { SiGoogleslides } from 'react-icons/si';
import { LuLink } from 'react-icons/lu';

// Define props for component
interface ProjectCardProps {
    project: Project;
}

function get_link_icon(link: string) {
	if (link.includes("github")) {
		return <FaGithub className='dark:invert-1' size={28}/>
	} else if (link.includes("youtube")) {
		return <FaYoutube className='dark:invert-1' size={28}/>
	} else if (link.includes("presentation")) {
		return <SiGoogleslides className='dark:invert-1' size={28}/>
	} else {
		return <LuLink className='dark:invert-1' size={28}/>
	}
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-14 pb-0 md:pr-0 animate-tile-fade-in">
		{/* Title */}
		<div className='border-b border-dashed'>
			<p className='text-sm font-courier'>/{project.year}</p>
			<div className='flex justify-between'>
				<h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
				<div className='flex gap-2'>
					{[...project.links].map((link, index) => (
						<Link target='_blank' href={`${link}`} key={index}>{get_link_icon(link)}</Link>
					))}
				</div>
			</div>
		</div>

		{/* Description */}
		<p className="text-foreground mb-4 mt-6">{project.description}</p>
	
		{/* Cover Image */}
		<div className='group overflow-hidden'>
			<Image
				className='rounded-2xl transition-transform duration-300 group-hover:scale-115'
				src={`${project.img}`}
				alt="Project Cover Image"
				width={500}
				height={500}
				priority
			/>
		</div>

		{/* Technology Tags */}
      	<div className="flex flex-wrap gap-2 pt-5 pb-5">
			{project.tags.map((tech, index) => (
			<span
				key={index}
				className="text-xs font-semibold px-2.5 py-1 bg-foreground text-background"
			>
				{tech}
			</span>
			))}
      	</div>
    </div>
  );
}

export default ProjectCard