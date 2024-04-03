"use client"
import { UserContext } from '../state/user-context';
import { useState, useEffect, useContext } from 'react';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function Message(){
  const {user}=useContext(UserContext)
  const [contacts,setContacts]=useState([])
  const [receiverID,setReceiverID]=useState()
  const [receiverName,setReceiverName]=useState()
//   const [userID, setUserID]= useState()
  const [message,setMessage]= useState('')
  const [conversation,setConversation]= useState([])
  const router = useRouter()
  
  try {
    let userID = user.id
    // let userID = 1
    // receiverID 
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    
    const rows = message.split('\n').length>5? 5 : message.split('\n').length;
    
    //   to get the contact list
    async function getContacts(){
        const req = await fetch(`/api/users/${userID}/contact`)
        const {data} = await req.json()
        const contacts = data.map((contact)=>{
            if(contact.sender_id===userID){
                return {
                    id: contact.receiver_id,
                    message: contact.message,
                    first_name: contact.receiver_first_name,
                    last_name: contact.receiver_last_name,
                }
            }else{
                return {
                    id: contact.sender_id,
                    message: contact.message,
                    first_name: contact.sender_first_name,
                    last_name: contact.sender_last_name,
                }
            }
        })
        setContacts(contacts)
    }
    
    // to get the messagehistory
    async function getMessages(){
        const req = await fetch(`/api/users/${userID}/messages_history?id=${receiverID}`)
        const {data} = await req.json()
        setConversation(data)
    }
    
    // to send the message
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
        getContacts();
    },[receiverID])
    
    return (
        
        <div className='flex flex-row w-full font-sans'>
        
            {/* // contacts */}
            <div className={"relative h-full w-full  overflow-auto bg-white border-l border-r  md:w-64 dark:bg-gray-900 dark:border-gray-700 " + (!receiverID? "" : "hidden md:block")}>
                <div className='fixed h-screen md:w-[160px] w-full md:min-w-[186px] dark:bg-gray-900 dark:border-gray-700 '>
                    <div className="flex flex-col px-2 mt-8 overflow-y-auto space-y-2 ">
                    <div className="flex space-x-2 px-2 h-12 whitespace-nowrap overflow-hidden overflow-ellipsis text-center ">
                        <button onClick={() => router.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h1 className=" flex items-center text-xl font-medium text-gray-800 dark:text-white gap-2">{user.first_name}<p className='text-gray-400 text-sm'>(you)</p></h1>
                    </div>
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            Messages
                        </h2>
                        {contacts.map((contact)=>(
                            <button 
                            className='w-full border-b border-grey-100 py-2 hover:bg-gray-100 dark:hover:bg-gray-800' 
                            key={contact.id} 
                            onClick={()=>{
                                setReceiverID(contact.id);
                                setReceiverName(`${contact.first_name} ${contact.last_name}`)
                            }}
                            >
                                <p className='text-left'>{contact.first_name} {contact.last_name}</p>
                                <p className='whitespace-nowrap overflow-hidden overflow-ellipsis text-left pl-2 text-gray-400 h-5  text-sm'>{contact.message}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* chatbox */}
            <div className={"" +(!receiverID? "hidden md:block md:w-full" : "w-full")}>
                {/*user details  */}
                <div className=" flex flex-cols px-2 h-12 fixed top right w-screen bg-white dark:bg-gray-900 dark:border-grey-700 ">
                    <div className="flex text-2xl space-x-2 items-center font-mono">
                        <button className="p-1 md:hidden" onClick={() => setReceiverID(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <div className="border overflow-hidden rounded-full full w-8 h-8">
                            <img src="/Design.png"/> {/* todo */}
                        </div>
                        <h1>{receiverName}</h1>
                    </div>
                </div>

                {/* chat history */}
                <div className="h-screen pt-12 w-full">
                    <div className='flex flex-col-reverse '>
                        {conversation.map((chat)=>{
                            const isMe = chat.sender_id === userID
                            return (
                                <div className='p-3'>
                                    <div key={chat.id} className={`flex  ${isMe ? "justify-end" : "justify-start"} items-center`}>
                                        <div>
                                            <pre className={classNames("rounded-2xl text-wrap py-2 px-4", isMe ? "bg-blue-500" : "bg-gray-300 text-black")}>{chat.message}</pre>
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
                            getContacts()
                        }}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div> {/*end of message */}
        </div>
        
        
        )
    }catch(error){
        router.push("../")
    }
    }