"use client"
import { UserContext } from "../state/user-context"
import { useState, useEffect, useContext } from 'react'
import {formatDistance} from 'date-fns'
import { useRouter } from 'next/navigation'

export default function CommentList({params}) {
    const {postID} =params

    const {user}= useContext(UserContext)
    const [comment, setComment] = useState()
    const [comments, setComments] = useState([])
    const [feeds, setFeeds] = useState([])
    const router = useRouter()
    try{
        // let userID= user.id
        let userID=1

        async function getPosts() {
            const req = await fetch(`/api/users/${userID}/post?id=${postID}`)
            const {data} = await req.json()
            setFeeds(data)  
        }

        async function getComments(postID) {
                const req = await fetch(`/api/users/${userID}/post/comment?id=${postID}`)
                const {data} = await req.json()
                setComments(data)
            }
            async function commentPost(postID) {       
                    const req = await fetch(`/api/users/${userID}/post/comment`,{
                        method: "POST",
                        body:JSON.stringify({
                            postID : postID,
                            comment: comment,
                        })
                    })
                    setComment("")
                    getPosts()
                    getComments(postID)
            }
        useEffect(()=>{
            getPosts()
            getComments(postID)
        },[])

        return (
            <div className=" relative md:w-2/3 h-screen mx-auto md:border-l md:border-r md:border-gray-400  overflow-y-scroll">
                <div className="sticky top-0 p-3 bg-gray-800">
                    <div className="flex items-center space-x-2">
                        <button className="rounded-full hover:bg-gray-900" onClick={() => router.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <p className='text-xl'>Posts</p>
                    </div>
                    {feeds.map((feed)=>{
                        return(
                            <div className= 'py-2 border-gray-100 space-y-1' key={feed.id}>
                                <div className='flex justify-between'>
                                    <p className='font-bold'>{`${feed.first_name} ${feed.last_name}`}</p>
                                    <p className='text-gray-400 text-sm'>{formatDistance(new Date(feed.created_at), new Date())} ago</p>
                                </div>
                                <p className='font-medium'>{feed.post}</p>
                            </div>
                        )
                    })}
                    <div className="">
                        <hr className="mt-2 border-gray-600"></hr>
                        <div className="flex py-4 px-2">
                            <textarea
                                value={comment}
                                rows="1"
                                className="flex w-full bg-transparent h-8 placeholder-oppacity-50 py-1 outline-none resize-none"
                                placeholder="Add a comment"
                                onChange={(e)=>setComment(e.target.value)}
                            />
                            <button 
                                className={`text-blue-500`}
                                onClick={()=>{commentPost(postID)}}
                            >
                                Post
                            </button>
                        </div>
                        <hr className="border-gray-600"></hr>
                    </div>
                </div>

                <div className='bg-gray-900 h-full pt-2'>
                    
                    {comments.map((comment)=>{
                        return(
                            <div className= 'p-2 border-gray-100 space-y-1' key={comment.id}>
                                <div className='flex justify-between'>
                                    <p className='font-bold'>{`${comment.first_name} ${comment.last_name}`}</p>
                                    <p className='text-gray-400 text-sm'>{formatDistance(new Date(comment.created_at), new Date())} ago</p>
                                </div>
                                <p className='font-light'>{comment.comment}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        )
    }catch(error){
        console.error(error)

    }
}