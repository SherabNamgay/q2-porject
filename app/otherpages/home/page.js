"use client"
import Navbar from "@/app/component/nav"
import Post from "@/app/component/post"
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
            <div className=" md:block hidden h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
              <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Messages</h2>
              <div className="mt-8 space-y-4">
                hello
              </div>
            </div>
          </div>
          {
            appState === CHAT ?
              <Message/> : 
              <Post/>
          }
        </div>
    )};