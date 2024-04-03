"use client"
import Navbar from "@/app/component/nav"
import Post from "@/app/component/post"
// import ContactList from "@/app/component/contact"
import Message from "@/app/component/messages"
import {useState} from 'react'
export default function Home () {
  const CHAT="chat"
  const POST="POST"
  const LIST="list"
  const [appState,SetAppState] = useState(CHAT)
    return (     
        <div className="md:relative flex md:flex-row flex-col ">
          <div className="sticky md:h-screen top-0 left-0 flex">
            <Navbar/>
            {/* <ContactList/> */}
        </div>
          {
            appState === CHAT ?
              <Message
                receiverID={5}
              /> : 
              <Post/>
          }
        </div>
    )};