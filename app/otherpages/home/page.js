"use client"
import Navbar from "@/app/component/nav"
import Profile from "@/app/component/profile"
import Post from "@/app/component/post"
import Message from "@/app/component/messages"
import FollowingList from "@/app/component/followinglist"
import {useState} from 'react'
export default function Home () {
 
  const CHAT="CHAT"
  const POST="POST"
  const LIST="LIST"
  const PROFLE="PROFILE"
  const [appState,setAppState] = useState(POST)
  const [receiverID,setReceiverID] = useState(null)
  const [profileID,setProfileID] = useState(null)

  console.log(appState)
  
  return (     
    <div className="md:relative flex md:flex-row flex-col ">
      <div className="sticky md:h-screen top-0 left-0 flex">
        <Navbar
          setAppState={setAppState}
          appState={appState}
          setProfileID={setProfileID}          
        />
      </div>

      {appState === CHAT ?
        <Message
          setAppState={setAppState}
          receiverID={receiverID}
          setReceiverID={setReceiverID}
        /> 
      :""}
      {appState === POST ?
        <Post
        /> 
      :""}
      {appState === PROFLE ?
        <Profile
          profileID={profileID}
        /> 
      :""}
      {appState === LIST ?
        <FollowingList
          setAppState={setAppState}
          setReceiverID={setReceiverID}
          setProfileID={setProfileID}
        />
      :""}
    </div>
  )
};