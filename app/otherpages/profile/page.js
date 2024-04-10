"use client"  
import Navbar from "@/app/component/nav";
import { UserContext } from '@/app/state/user-context'
import {useState,useEffect,useContext} from 'react'


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
        <div>
            <div>
                {userdetails.map((userdetails) => (
                    <div>
                    <h1>{userdetails.first_name} {userdetails.last_name}</h1>
                    <h2>{userdetails.email}</h2>
                    <h2></h2>
            </div>
                ))}
            </div>
            <div>
                {profile.map((profile) => (
                    <div>
                    <h1>{profile.first_name} {profile.last_name}</h1>
                    <h2>{profile.post}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}