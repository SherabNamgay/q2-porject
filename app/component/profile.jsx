"use client"  
// import Navbar from "@/app/component/nav";
import { UserContext } from '@/app/state/user-context'
import {useState,useEffect,useContext} from 'react'
import { formatDistance } from 'date-fns'

export default function Profile ({profileID}) {
    const  {user} = useContext(UserContext)
    let userID=null
    if(profileID){
         userID= profileID
    }else{
        userID= user.id
    }

    // console.log(userID)
    // let userID= 3

    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
    const [friends, setFriends] = useState([])

    async function getProfile() {
        const req = await fetch(`/api/users/${userID}/profile`) 
        const {data: { user, posts, friends }} = await req.json()
        setProfile(user)
        setPosts(posts)
        setFriends(friends)
    }
    async function follow (friendID) {
        const req = await fetch(`/api/users/${userID}/follow?id=${friendID}`)
    }

    useEffect(() => {
        getProfile() 
        // getUser()   
    }, [userID])

    return (
        <div className="md:flex pt-1 mx-auto md:w-3/4 w-full">
            <div className="h-screen overflow-y-scroll" style={{scrollbarWidth:"none"}}>
                <div className="w-full mx-auto">
                    {profile?.first_name && (
                        <div className="w-full border rounded outline-2 border-blue-500 py-8">
                            <h1 className='flex justify-center pb-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </h1>
                            <h1 className="flex justify-center font-bold text-xl">{profile.first_name} {profile.last_name} </h1>
                            <div className="flex cols-2 justify-around px-3 ">
                                <h2 className=" ">Following:  {friends?.length}</h2>
                                <h2 className="">Posts:  {posts?.length}</h2>
                            </div>
                            <div className="pt-2 space-x-10 flex justify-center">
                                <button
                                    onClick={() => follow(profile.id)} 
                                    className='justify-center font-semibold border rounded-xl flex px-2 w-24 gap-1'
                                > 
                                    Follow
                                </button>
                                <button className='justify-center font-semibold border rounded-xl flex px-2 w-24 gap-1'>
                                    Message
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="rounded-md">
                    {posts.map((post) => (
                        <div className="w-full rounded-lg border-2 border-gray-800 flex-col my-2">
                            <button className="p-2 w-full">
                                <div className="flex justify-between">
                                    <h1 className="pb-2 font-semibold">{post.first_name} {post.last_name}</h1>
                                    <h2 className=" text-xs italic text-gray-400">{formatDistance(new Date(post.created_at),new Date())}</h2>
                                </div>
                                <h2 className="font-normal text-left pb-1">{post.post}</h2>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}