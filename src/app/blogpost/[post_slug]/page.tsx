import blogData from '@/app/data/blog.json'
import { Blog } from '@/app/types'
import BlogCard from '@/app/components/BlogCard'
import Header from '@/app/components/Header'

interface BlogPostPageProps {
    params: {
        post_slug: string;
    }
}

export default async function BlogPostContent({ params }: BlogPostPageProps) {
    const { post_slug } = await params;
    const blog_posts: Blog[] = blogData;
    const curr_post: Blog | undefined = blog_posts.find(blog => blog.slug === post_slug);
    if (!curr_post) return (
		<>	
			<Header is_front_page={false} />
			<main className="overflow-hidden mx-auto p-14 pb-0">
                <p>This blog post does not exist</p>
            </main>
        </>
    )

    console.log(curr_post)
    return (
		<>	
			<Header is_front_page={false} />
			<main className="overflow-hidden mx-auto p-14 pb-0">
                <h2 className='text-5xl font-bold'>{`${curr_post.title}`}</h2>
                <p className='border-b pt-2 pb-2'>{`${curr_post.description}`}</p>
                <div className='p-20'>{`${curr_post.content}`}</div>
            </main>
        </>
    )
}