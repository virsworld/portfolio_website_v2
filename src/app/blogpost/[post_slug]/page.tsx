import blogData from '@/app/data/blog.json'
import { Blog } from '@/app/types'
import BlogCard from '@/app/components/BlogCard'
import Header from '@/app/components/Header'
import TableOfContents from '@/app/components/TableOfContents'

interface BlogPostPageProps {
    params: Promise<{
        post_slug: string;
    }>
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

    // Dynamically import the MDX component based on content filename
    let MdxComponent
    try {
        const mod = await import(`@/app/data/${curr_post.content}`)
        MdxComponent = mod.default
    } catch (error) {
        return (
            <>
                <Header is_front_page={false} />
                <main className="overflow-hidden mx-auto p-14 pb-0">
                    <p>Content for this blog post could not be loaded</p>
                </main>
            </>
        )
    }

    return (
		<>	
			<Header is_front_page={false} />
			<main className="relative mx-auto flex flex-col gap-4 px-4 py-8 md:gap-8 md:px-8 lg:px-32 md:py-12 lg:py-24 max-w-6xl">
                <h2 className='text-3xl md:p-0 md:text-4xl lg:text-5xl font-bold'>{`${curr_post.title}`}</h2>
                <p className='text-sm md:text-base text-gray-500 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2'>{`${curr_post.description}`}</p>
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-10">
                    <article className="animate-tile-fade-in prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none p-4 md:pt-10 md:p-10 md:pl-0 flex-1 min-w-0">
                        <MdxComponent />
                    </article>
                    <TableOfContents />
                </div>
            </main>
        </>
    )
}