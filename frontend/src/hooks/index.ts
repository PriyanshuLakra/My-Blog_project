import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { JwtPayload, jwtDecode } from "jwt-decode";


export interface Blog{
    
    "content":string,
    "title":string,
    "id":number,
    "author":{
        "name":string
    }

}
export const useBlog=({id}:{id:string})=>{

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                // console.log(response.data.blog);
                setBlog(response.data.blog);
                // console.log(blog)
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}





export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}





interface UserPayload extends JwtPayload {
    id: string;
  }
export const getUserInfoFromToken = (): UserPayload | null =>{

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode<UserPayload>(token)
      return decodedToken; // returns the entire payload object
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};


export const useMyBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const userInfo = getUserInfoFromToken();
    const userId = userInfo ? userInfo.id : null;
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/myBlogs/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                
                setBlogs(response.data.blog);
                setLoading(false);
            })
    }, [])

    return {
        loading,
        blogs
    }
}