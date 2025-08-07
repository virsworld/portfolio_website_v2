'use client';

import blogData from '../data/blog.json'
import { Blog } from '../types';
import BlogCard from '../components/BlogCard';
import Search from '../components/Search';
import Header from '../components/Header';

export default function Blog_() {
    const blogPosts: Blog[] = blogData;

    return (
		<>	
			<Header is_front_page={false} />
			<main className="overflow-hidden mx-auto p-14 pb-0">
				<h1 className="text-6xl text-right font-bold mt-14">BLOG</h1>
				<div className='grid grid-cols-[1.5fr_3fr] border-t border-border mt-5'>

					{/* Search */}
					<div className='border border-l-0 border-r-border border-t-0 border-b-0'>
						<Search 
							cards={blogPosts}
                            type='blog'
							quote={<p>&quot;It&apos;s time for you to look inward, and start asking yourself the big questions. Who are you? And what do you want?&quot; - <span className="italic">Iroh</span></p>}
						/>
					</div>

					{/* Blog Posts */}
					<div className="grid grid-cols-1">
						{[...blogPosts].reverse().map((blogPost) => (
							<BlogCard key={blogPost.id} blogPost={blogPost} />
						))}
                        {!blogPosts.length
                        ? <p>No posts made yet</p>
                        : null}
					</div>

				</div>
			</main>
		</>
    );
}