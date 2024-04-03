import Navbar from "@/app/component/nav"
import Post from "@/app/component/post"
export default function Home () {

    return (     
        <div className="flex md:flex-row flex-col">
          <Navbar/>
        <div className="md:block hidden h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
          <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Messages</h2>
          <div className="mt-8 space-y-4">
            hello
          </div>
        </div>
        <Post/>
      </div>
    )};