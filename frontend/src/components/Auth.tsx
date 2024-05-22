import { SignupType } from "@priyanshulakra/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
export const Auth = ({type}:{type:"signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: ""
    })

    async function sendRequest(){
        try{
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup" ? "signup":"signin"}`, postInputs)
            // the jwt stored in local storage is in object format .. so we to acces jwt token we have to do response.data.jwt;
            const jwt = response.data.jwt;
            console.log(jwt)
            
            localStorage.setItem("token" ,jwt)
            navigate("/blogs")
        }
        catch(e){
            alert("Error while signing up")
            /// alert the user here that the request failed

        }

    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold ">
                        {type=="signup"?"Create an Account":"Login in to Account"}
                    </div>
                    <div className="text-slate-400 text-center">
                        {type=="signin" ? "Don't have an Account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type=='signin'? "/signup" : "/signin"}>
                            {type=="signin"?"Sign up":"Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-7">
                    <div className="pt-2">
                    <LabeledInput lable="Email" placeholder="priyanshuLakra@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }}></LabeledInput>
                    </div>
                    <div className="pt-2">
                    <LabeledInput lable="Password" type={"password"} placeholder="*@&$^@*!&#" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></LabeledInput>
                    </div>
                    <div  className="pt-2">
                    {type == "signup"? <LabeledInput lable="Name" placeholder="priyanshu Lakra" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}></LabeledInput>:null}
                    </div>
                </div>
                <button onClick={sendRequest} type="button" className="mt-8  w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign Up" : "Sign in"}</button>
            </div>
        </div>
    </div>
}



// input box
interface LabeledInputTypes {
    lable: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string

}
function LabeledInput({ lable, placeholder, onChange, type }: LabeledInputTypes) {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black">{lable}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}