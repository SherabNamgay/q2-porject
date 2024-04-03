"use client"
import { UserContext } from '../state/user-context';
import { useState, useEffect, useContext } from 'react';
import { formatDistance } from 'date-fns';

export default function Message(){
  const {user}=useContext(UserContext)
  
  const [message,setMessage]= useState('')
  const [conversation,setConversation]= useState([])
  let userID=user.id
  let receiverID=5

  function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
  
  const rows = message.split('\n').length>5? 5 : message.split('\n').length;

  async function getMessages(){
    const req = await fetch(`/api/users/${userID}/messages_history?id=${receiverID}`)
    const {data} = await req.json()
    setConversation(data)
  }
  async function sendMessage(){
    try{
        const req = await fetch(`/api/messages/${userID}?id=${receiverID}`, {
            method: "POST",
            body: JSON.stringify({
                message,
            })
        })
        getMessages()
        setMessage('')
    }catch(error){
        console.log(error)
    }
  }
  useEffect(()=>{
      getMessages();
      setMessage('')
  },[receiverID,])
  
    return (
        <div>

            {/*user details  */}
            <div className=" flex flex-cols px-2 h-12 border sticky top-0 bg-white dark:bg-gray-900 dark:border-grey-700">
                <div className="flex text-2xl space-x-2 items-center font-mono">
                    <div className="border overflow-hidden rounded-full full w-8 h-8">
                         <img src="/Design.png"/> {/* todo */}
                    </div>
                    <h1>Charo</h1>
                </div>
            </div>

            {/* chat history */}
            <div className="h-screen">
                <div className='flex flex-col-reverse'>
                    {conversation.map((chat)=>{
                        const isMe = chat.sender_id === userID
                        return (
                            <div className='p-3'>
                                <div key={chat.id} className={`flex  ${isMe ? "justify-end" : "justify-start"} items-center`}>
                                    <div>
                                        <pre className={classNames("rounded-2xl py-2 px-4", isMe ? "bg-blue-500" : "bg-gray-300 text-black")}>{chat.message}</pre>
                                        <p className="text-xs text-right ">{formatDistance(new Date(chat.created_at), new Date())} ago</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* message input box */}
            <div className="flex border rounded-2xl pl-5 pr-2 min-h-10 h-auto sticky bottom-0 items-center justify-between bg-white dark:bg-black text-black dark:text-white ">
            <textarea 
                className="flex items-center w-full bg-transparent border-none outline-none text-wrap resize-none"
                rows={rows}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
            />
                <button
                onClick={async()=>{
                    sendMessage()
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}