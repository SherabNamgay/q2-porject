'use client'
import { UserContext } from '@/app/state/user-context'
import { useContext, useState, useEffect } from 'react'

export default function FollowingList({setAppState, setReceiverID, setProfileID}) {
    const {user}= useContext(UserContext)
    const [following, setFollowing] = useState([])
    
    const userID= user.id
    // let userID=1
    const CHAT="CHAT"
    const PROFILE="PROFILE"

    async function getFollowing() {
        const req = await fetch(`/api/users/${userID}/follow`)
        const data = await req.json()
        setFollowing(data)
    }
    // console.log(following)
    useEffect(()=>{
        getFollowing()

    })
    
    return (
        <div 
            className={`w-full fixed md:static top-20 md:w-2/5 h-screen mx-auto md:place-content-center`}
        >
            <div 
                className='relative dark:bg-gray-900 border border-gray-900 md:h-2/3 h-full overflow-y-scroll'
                style={{scrollbarWidth: "none"}}
            >
                <div className='sticky top-0 font-semibold border border-gray-700 p-2 dark:bg-gray-900'>
                    <div className='flex w-full justify-between'>
                        <h1>Following</h1>
                        <button
                            onClick={() => setAppState('POST')}
                            title='Close'
                            className='text-white'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* following list here */}
                <div className='p-2 space-y-4 '>
                    {following.map((follow)=>{
                        return (
                            <div key={follow.id} className='flex justify-between'>
                                <button
                                    
                                    onClick={() => {
                                        setProfileID(follow.friend_id)
                                        setAppState(PROFILE)
                                    }}
                                    className=''
                                >
                                    <h1 >{follow.first_name} {follow.last_name}</h1>
                                </button>
                                <button
                                    title='Message'
                                    onClick={() => {
                                        setAppState(CHAT)
                                        setReceiverID(follow.friend_id) 
                                    }}
                                    className=''
                                > 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>

                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    
}