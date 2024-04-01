"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUp(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confrimPass, setConfrimPass] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function createAccount(){
        try {
            const req = await fetch("/api/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            })
            if(!firstName || !lastName || !email || !password){
                throw new Error("Please fill all the fields")
            }
            if(password !== confrimPass){
                throw new Error("Passwords do not match")
            }
            if (!req.ok){
                const responseData = await req.text()
                if (req.status === 409){
                    throw Error(responseData)
                }else{
                    throw Error('Unkown Error occurred')
                }
            }else{
                alert('User created successfully')
                router.push('/otherpages/home')
                return req.json();
            }
            
        } catch (error) {
           setError(error.message)
        }
    }

    return (
        <div className="bg-white flex flex-cols-2 h-screen w-screen ">
            <div className="w-1/2 text-center bg-cover hidden md:block" style={{backgroundImage:"url('../image1.png')"}}>
               <div className="space-y-2 p-5 text-center m-auto">
                    <h1 className="text-center flex flex-col m-auto text-3xl font-bold  ">Welcome</h1>
                    <p
                        className=""
                     >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae atque exercitationem quo pariatur laudantium minima, at recusandae nesciunt quis saepe tenetur possimus eligendi error voluptate iure, doloremque incidunt facere commodi.
                    </p>
               </div>
            </div>
            <div className="space-y-2 md:p-0 p-5 text-center text-black md:w-1/3 md:m-auto">
                <h1 
                    className="font-bold text-blue-500 text-2xl"
                >Sign up 
                </h1>
                <p
                    className="opacity-[.48]"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam aliquam rem tenetur voluptatum fugiat illo unde assumenda, odit
                </p>
                <form className="pt-5 flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:gap-2 space-y-4 md:space-y-0">
                        <input
                            type="text"
                            className="border-2 h-10 px-2 rounded md:w-1/2 hover:border-blue-500 focus:border-blue-600"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => {setFirstName(e.target.value);setError("")}}
                        />
                        <input
                            type="text"
                            className="border-2 h-10 px-2 rounded md:w-1/2 hover:border-blue-500 focus:border-blue-600"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => {setLastName(e.target.value);setError("")}}
                        />
                    </div>
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
                    <div className=" md:flex-row md:gap-2 space-y-4 md:space-y-4">
                        <input
                            type="password"
                            className="border-2 px-2 h-10 rounded w-full hover:border-blue-500 focus:border-blue-600"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value);setError("")}}
                        />
                        <input
                            type="password"
                            className="border-2 px-2 h-10 rounded w-full hover:border-blue-500 focus:border-blue-600"
                            placeholder="Confirm password"
                            value={confrimPass}
                            onChange={(e) => {setConfrimPass(e.target.value);setError("")}}
                        />
                    </div>
                        <p className="text-red-500 opacity-[.87] text-sm">{error}</p>
                    <button
                        className="bg-blue-500 border-2 text-nowrap h-9 rounded text-white hover:bg-blue-600 active:bg-blue-700 w-min-fit w-max-1/4 "
                        type="submit"
                        onClick={async(e) => {
                            e.preventDefault();
                            await createAccount();
                        }}
                     >Sign Up
                    </button>
                </form>
                <p className="opacity-[.87] pt-10"
                    >Already signed up?
                    <a 
                    href="../"
                    className="text-blue-500"
                    > Login</a>
                </p>
            </div>
        </div>
    )
}