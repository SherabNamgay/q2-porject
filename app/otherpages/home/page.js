"use client"
import Navbar from "@/app/component/nav"
import Profile from "@/app/component/profile"
import Post from "@/app/component/post"
import Message from "@/app/component/messages"
// import { UserContext } from '@/app/state/user-context'
import {useState} from 'react'
export default function Home () {
  // const user= useContext(UserContext)
  const CHAT="chat"
  const POST="POST"
  const LIST="list"
  const PROFLE="profile"
  const [appState,setAppState] = useState(POST)
  // let userID= user.id
  // console.log(user)
  
    return (     
        <div className="md:relative flex md:flex-row flex-col ">
          <div className="sticky md:h-screen top-0 left-0 flex">
            <Navbar
              setAppState={setAppState}
              appState={appState}
              
            />
            {/* <ContactList/> */}
        </div>
          {appState === CHAT ?
            <Message
              setAppState={setAppState}
            /> 
          :""}
          {appState === POST ?
            <Post
            /> 
          :""}
          {appState === PROFLE ?
            <Profile
            /> 
          :""}

        </div>

    )};