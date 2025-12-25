import React from 'react';
import { Blog } from '../types';
import Image from 'next/image';
import Link from 'next/link';

// Define props for component
interface BlogCardProps {
    blogPost: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blogPost }) => {
  return (
        <div className='w-full max-w-3xl animate-tile-fade-in'>
            <Link href={`/blogpost/${blogPost.slug}`}>
                <div className='p-14 py-0 md:pr-0 flex flex-col w-full'>
                    {/* Cover Image */}
                    {/* <div className='flex flex-col justify-center mr-4 group overflow-hidden'>
                    <Image
                        className='rounded-2xl transition-transform duration-300 group-hover:scale-115'
                        src={`${blogPost.img}`}
                        alt="Project Cover Image"
                        width={125}
                        height={125}
                        priority
                        />
                    </div> */}
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground">{blogPost.title}</h3>
                    <hr className='w-full border-dashed'></hr>
                    {/* Description */}
                    <p className="text-foreground pt-2">{blogPost.description}</p>
                    <div className='flex flex-wrap gap-2 pt-3'>
                        {/* Date */}
                        <p className='text-sm font-courier pt-0.5'>{blogPost.date} | </p>
                        {/* Technology Tags */}
                        {blogPost.tags.map((tech, index) => (
                            <span
                            key={index}
                            className="text-xs font-semibold px-2.5 py-1 bg-foreground text-background"
                            >
                            {tech}
                        </span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
  );
}

export default BlogCard