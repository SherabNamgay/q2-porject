"use client"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import {UserContext} from "@/app/state/user-context"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const{setUser} = useContext(UserContext)
    const router = useRouter()

    async function logIn(){
        try {
            const req = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if(!email || !password){
                throw new Error("Please fill all the fields")
            }
            if (!req.ok){
                const responseData = await req.text()
                if (req.status === 401){
                    throw Error(responseData)
                }else if(req.status === 404){
                    throw Error(responseData)
                }
            }else{
                // alert('login successfull')
                const { foundUser } =  await req.json();
                setUser(foundUser)
                router.push('/otherpages/home')
                // router.push('/otherpages/message')
            }
            
        } catch (error) {
           setError(error.message)
        }
    }

    return (
        <div className="bg-white flex flex-cols-2 h-screen w-screen ">
            <div className="w-1/2 text-center bg-cover h-full hidden md:block" style={{backgroundImage:"url('./image1.png')"}}>
               <div className="space-y-2 p-5 text-center m-auto h-screen">
                    <h1 className="text-center flex flex-col mt-14 m-auto text-3xl font-bold"
                        >Welcome Back
                    </h1>
                    <p
                        className=""
                     >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae atque exercitationem quo pariatur laudantium minima, at recusandae nesciunt quis saepe tenetur possimus eligendi error voluptate iure, doloremque incidunt facere commodi.
                    </p>
               </div>
            </div>
            <div className="space-y-2 md:p-0 p-5 text-center text-black md:w-1/3 md:m-auto">
                <h1 
                    className="font-bold text-blue-500 text-2xl"
                >Login 
                </h1>
                <p
                    className="opacity-[.48]"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aliquam rem tenetur voluptatum fugiat illo unde assumenda, odit
                </p>
                <form className="pt-5 flex flex-col space-y-4">
                    <div>
                        <input
                            type="email"
                            className="border-2 px-2 h-10 rounded w-full hover:border-blue-500 focus:border-blue-600"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>{ 
                                setEmail(e.target.value)
                                setError("")
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className="border-2 px-2 h-10 rounded w-full hover:border-blue-500 focus:border-blue-600"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value);setError("")}}
                        />
                        
                    </div>
                        <p className="text-red-500 opacity-[.87] text-sm">{error}</p>
                    <button
                        className="bg-blue-500 border-2 text-nowrap h-9 rounded text-white hover:bg-blue-600 active:bg-blue-700 w-min-fit w-max-1/4 "
                        type="submit"
                        onClick={async(e) => {
                            e.preventDefault();
                            await logIn();
                        }}
                     >Login
                    </button>
                </form>
                <p className="opacity-[.87] pt-10"
                    >Don't have an account?
                    <a 
                    href="/otherpages/signup"
                    className="text-blue-500"
                    > Sign Up</a>
                </p>
            </div>
        </div>
    )
}