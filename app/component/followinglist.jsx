'use client'
import { UserContext } from '@/app/state/user-context'
import { useContext, useState, useEffect } from 'react'

export default function FollowingList(){
    const {user}= useContext(UserContext)
    const [following, setFollowing] = useState([])
    // const userID= user.id
    let userID=1

    async function getFollowing() {
        const req = await fetch(`/api/users/${userID}/follow`)
        const data = await req.json()
        setFollowing(data)
    }
    useEffect(()=>{
        getFollowing()
    })
    return (
        <div className="w-full">
            {following.map((follow)=>{
                return <h1 key={follow.id}>{follow.first_name} {follow.last_name}</h1>
            })}
            <h1>{}</h1>
        </div>
    )
}