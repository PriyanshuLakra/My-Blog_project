import axios from "axios"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { BACKEND_URL } from "../config"


import { Link } from "react-router-dom"



export const FullBlog = ({ blog }: { blog: Blog }) => {
    async function del() {
        const userId = blog.id;
        
        axios.get(`${BACKEND_URL}/api/v1/blog/delete/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                return response
            })
    }

    return <div>
        <Appbar />

        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <Link to={'/blogs'} >
                        <button onClick={del} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">DELETE</button>
                    </Link>

                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size={8} name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}