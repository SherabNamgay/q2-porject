'use client'

import { useEffect, useState, useContext } from 'react'
import {formatDistance} from 'date-fns'
import { UserContext } from '@/app/state/user-context'

export default function Post() { 
    const [post, setPost] = useState('')
    const [feeds, setFeeds] = useState([])
    const {user}= useContext(UserContext)
    const [comment, setComment] = useState({})
try{
    let userID= user.id

    async function tweet() {
        try{
            const req = await fetch(`/api/users/${userID}/post`, {
                method: "POST",
                body: JSON.stringify({
                    post,
                })
                
            })
            if(req.ok){
                await getPosts()
                setPost("")
            } else{
                throw new Error("Something went wrong")
            }
        }catch(error){
            console.error(error)
        }
    }
    async function getPosts() {
        const req = await fetch(`/api/users/${userID}/post`)
        const {data} = await req.json()
       
        // console.log(data)
        setFeeds(data)  
    }
    async function likePost(postID) {
        // console.log(postID)
        const req = await fetch(`/api/users/${userID}/post/likes`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postID : postID
            })
        })
        getPosts()
    }
    async function commentPost(postID) {
        // try{

            const req = await fetch(`/api/users/${userID}/post/comment`,{
                method: "POST",
                body:JSON.stringify({
                    postID : postID,
                    comment: comment[postID],
                })
            })
            handleComment(postID, "")
            getPosts()
            // if(req.ok){
                // const updatedPosts = await getPosts();
                // setFeeds(updatedPosts)
        //     }else{
        //         throw new Error("Something went wrong")
        //     }
        // }catch(error){
        //     console.log(error)
        // }
    }
    const handleComment=(postID, comment)=>{
        setComment(prevState =>({
            ...prevState,
            [postID]: comment
        }))
    }

    useEffect(() => {
        getPosts()
    }, [])
    
    return (
        <div className="w-full md:pr-4 md:w-1/2 md:mx-auto">
        <main role="main">
              <div className ="flex w-min-fit">
                  <section className="w-full border border-y-0 border-gray-800 py-8 ">
                    <div className="flex">
                      <div className="flex-1 mx-2">
                        <h2 className="px-4 pb-5 text-xl font-semibold text-white">Home</h2>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-2 w-10 py-1">
                        <img className="inline-block h-10 w-10 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt=""/>
                      </div>
                      <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea
                            value = {post}
                            onChange={(e) => setPost(e.target.value)}
                            className="resize-none bg-transparent text-gray-400 font-medium text-lg w-full" 
                            rows="2" 
                            cols="50" 
                            placeholder="What's happening?"
                        />
                      </div>
                    </div>
  {/* <!--middle create tweet below icons--> */}
  <div className="flex">
      <div className="w-10"></div>

      <div className="w-64 px-2">

          <div className="flex items-center">
              <div className="flex-1 text-center px-1 py-1 m-2">
                  <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                          </path>
                      </svg>
                  </a>
              </div>

              <div className="flex-1 text-center py-2 m-2">
                  <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">
                          </path>
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                  </a>
              </div>

              <div className="flex-1 text-center py-2 m-2">
                  <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                          </path>
                      </svg>
                  </a>
              </div>

              <div className="flex-1 text-center py-2 m-2">
                  <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                      <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                          </path>
                      </svg>
                  </a>
              </div>
          </div>
      </div>

      <div className="flex-1">
          <button 
            className=" bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
            onClick= {() => tweet()}
            >
              Post
          </button>
      </div>
  </div>

  <hr className="border-gray-800 border-4"></hr>

        </section>
        </div>
        </main>
        <div className=' rounded-md'>
            {/* <button onClick={() => getPosts()}>Feeds</button> */}
            <div className='border-gray-800 bg gap-2 flex flex-col-reverse'>
                 {/* {console.log(feeds)} */}
                {feeds.map((post) => {
                   return (
                    <div key={post.id} className='w-full rounded-lg border-2 border-gray-800 bg-transparent p-4 '>
                            {/* post name and time */}
                        <div className='flex justify-between font-bold '>
                            {post.first_name + " " + post.last_name}
                            <h2 className='text-xs font-normal italic'>{formatDistance(new Date(post.created_at), new Date())} ago</h2>
                        </div>
                        {/* post content */}
                        <p className=' pb-2'>{post.post}</p>
                        <div className='flex flex-rows space-x-5'>
                            {/* like button */}
                            <button
                                className={"flex flex-rows " + (post.user_liked ? " text-blue-500" : "")}
                                onClick={() => likePost(post.id)}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                            </svg>

                                <p className='text-gray-300 pl-1'>{post.likes}</p>
                            </button>
                            {/* comment button */}
                            <button 
                                className=''
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                            </button>
                        </div>
                        <div className='hidden md:block'>  {/* for displaying comment */}
                            commment from another
                        </div>
                        <button className='text-gray-400 pt-1 text-sm'>View all {post.comments} comments</button> {/*TODO*/}
                        <div className="flex text-sm">
                            <textarea
                                value={comment[post.id ||'']}
                                rows="1"
                                className="flex w-full bg-transparent h-8 placeholder-oppacity-50 py-1 outline-none "
                                placeholder="Add a comment"
                                onChange={(e)=>handleComment(post.id, e.target.value)} //TODO: send comment to DB(e.target.value)}
                            />
                            <button 
                                className={`text-blue-500 ${!comment[post.id] && "hidden"}`}
                                onClick={()=>{commentPost(post.id)}}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                   )
                }
                )}
                
            </div>
        </div>
        </div>

    )
}catch(error){
    console.log(error)
}
}