"use client"  
import Navbar from "@/app/component/nav";
import { UserContext } from '@/app/state/user-context'
import {useState,useEffect,useContext} from 'react'
import { formatDistance } from 'date-fns'

export default function Home () {
    const user= useContext(UserContext)
    const POST="POST"
    const PROFILE="profile"
    const [userdetails,setUserdetails] = useState([])
    const [appState,setAppState] = useState(POST)
    let userID= user.id
    // console.log(user)
    const [profile,setProfile] = useState([])

    async function getUser() {
        const req = await fetch(`/api/users/1/user`)
        const {data} = await req.json()
        setUserdetails(data)   
    }
    async function getProfile() {
        const req = await fetch(`/api/users/1/profile`) 
        const {data} = await req.json()
        setProfile(data)
    }
    console.log(profile)

    useEffect(() => {
        getProfile() 
        getUser()   
    }, [])

    return (
        <div className="md:flex w-fit ">
            <Navbar/>
            <div className="h-screen overflow-y-scroll">
                <div className="w-screen mx-auto">
                    {userdetails.map((userdetails) => (
                        <div className="w-full border rounded outline-2 border-blue-500 py-8">
                            <h1 className="flex justify-center font-bold  ">{userdetails.first_name} {userdetails.last_name} </h1>
                            <div className="flex cols-2 justify-between">
                                <h2 className=" ">Friends: <></> {userdetails.friend_count}</h2>
                                <h2 className="">Posts: <></> {userdetails.post_count}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="rounded-md">
                    {profile.map((profile) => (
                        <div className="w-full rounded-lg border-2 border-gray-800 flex-col my-2">
                            <button className="p-2 w-full">
                                <div className="flex justify-between">
                                    <h1 className="">{profile.first_name} {profile.last_name}</h1>
                                    <h2 className=" text-xs italic text-gray-400">{formatDistance(new Date(profile.created_at),new Date())}</h2>
                                </div>
                                <h2 className="text-left">{profile.post}</h2>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}