import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

import { JwtPayload, jwtDecode } from "jwt-decode";

import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

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

export const  Appbar = () => {

    // getting the emial of the sigined user from the jwt token which gets stored in the local storage as someone sign in to website
    const [Email , SetEmail] = useState('');
    useEffect(()=>{
      const fetchEmail = async () => {
        try {
          const userInfo = getUserInfoFromToken();
          const userId = userInfo ? userInfo.id : null;
          if (userId) {
            const response = await fetch(`${BACKEND_URL}/api/v1/user/${userId}`);
            if (response.ok) {
              const data = await response.json();
              SetEmail(data.details.email);
            } else {
              console.error('Failed to fetch email:', response.statusText);
            }
          }
        } catch (error) {
          console.error('Error fetching email:', error);
        }
      };
      fetchEmail();
      

    } , [])

    
    
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
            medium
        </Link>


        <div>
            <Link to={'/publish'}>
                <button type="button" className=" mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">New</button>

            </Link>
            <Avatar size={8} name={Email}></Avatar>
        </div>

    </div>
}