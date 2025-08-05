import React from 'react';
import { Project } from '../types';
import Image from 'next/image';

// Define props for component
interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="p-14 pb-0 pr-0">
			{/* Title */}
			<div className='border-b border-dashed'>
				<p className='text-sm font-courier'>/{project.year}</p>
				<h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
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