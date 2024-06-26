import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";




// we already have all the blogs stored BY SIGIN(by bulk request ) .. so we dont need to make the request again ,, we simply take particular blog from bulk by clicking on the blog .... use of AtomFamily
export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    
    if (loading || !blog) {
        
        return <div>
            <Appbar></Appbar>
            <div className="h-screen flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner></Spinner>
                </div>
            </div>

        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>

}