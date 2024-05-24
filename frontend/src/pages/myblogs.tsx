import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useMyBlogs } from "../hooks"


export const MyBlogs = () => {
    
    const { loading, blogs } = useMyBlogs();
    if (loading) {
        return <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                </div>
            </div>
        </div>
    }
    return <div>
        <div>
            <Appbar></Appbar>
        </div>
        <div className="flex justify-center">
            <div className="">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}

                    content={blog.content}
                    publishedDate="12/2/2024"></BlogCard>
                )}

            </div>
        </div>
    </div>
}