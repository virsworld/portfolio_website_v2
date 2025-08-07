import React from 'react';
import { Blog } from '../types';
import Image from 'next/image';
import Link from 'next/link';

// Define props for component
interface BlogCardProps {
    blogPost: Blog;
}

const ProjectCard: React.FC<BlogCardProps> = ({ blogPost }) => {
  return (
    <div className="p-14 pb-0 pr-0">
        <Link href={`/blogpost/${blogPost.slug}`}>
            {/* Title */}
            <div className='border-b border-dashed'>
                <p className='text-sm font-courier'>/{blogPost.year}</p>
                <h3 className="text-2xl font-bold text-foreground mb-2">{blogPost.title}</h3>
            </div>

            {/* Description */}
            <p className="text-foreground mb-4 mt-6">{blogPost.description}</p>
      
            {/* Cover Image */}
            <div className='group overflow-hidden'>
                <Image
                    className='rounded-2xl transition-transform duration-300 group-hover:scale-115'
                    src={`${blogPost.img}`}
                    alt="Project Cover Image"
                    width={500}
                    height={500}
                    priority
                    />
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 pt-5 pb-5">
                {blogPost.tags.map((tech, index) => (
                    <span
                    key={index}
                    className="text-xs font-semibold px-2.5 py-1 bg-foreground text-background"
                    >
                    {tech}
                </span>
                ))}
            </div>
        </Link>
    </div>
  );
}

export default ProjectCard