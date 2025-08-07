import blogData from '@/app/data/blog.json'
import { Blog } from '@/app/types'
import BlogCard from '@/app/components/BlogCard'
import { sanitize_to_slug } from '@/utils/utils'
import Search from '@/app/components/Search'
import Header from '@/app/components/Header'

interface BlogFilterPageProps {
    params: {
        filter_type: string;
        filter_value: string;
    }
}

export default async function BlogsFiltered({ params }: BlogFilterPageProps) {
    const { filter_type, filter_value } = await params; // await to silence an error
    const blog_posts: Blog[] = blogData;

    const filteredBlogs = blog_posts.filter(blog => {
        const sanitized_value = sanitize_to_slug(filter_value.toString());

        if (filter_type == 'tags') {
            return blog.tags.some(tag => sanitize_to_slug(tag) === sanitized_value)
        }

        if (filter_type == 'year') {
            return sanitize_to_slug(blog.year.toString()) === sanitized_value;
        }

        return false
    });

    return (
        <>
            <Header is_front_page={false} />
            <main className="mx-auto p-14 pb-0">
                <h1 className="text-6xl text-right font-bold mt-14">BLOG</h1>
                <div className='grid grid-cols-[1.5fr_3fr] border-t border-border mt-5'>

                    {/* Search */}
                    <div className='border border-l-0 border-r-border border-t-0 border-b-0'>
                        <Search 
                            cards={blog_posts}
                            type='blog'
                            quote={<p>&quot;Every engineer has his 10 years in the sun.&quot; - <span className="italic">Giovanni Battista Caproni</span></p>}
                            />
                    </div>

                    {/* Projects */}
                    <div className="grid grid-cols-1">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <BlogCard key={blog.id} blogPost={blog} />
                            ))
                        ) : (
                            <p>No blogs found for this filter.</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}