import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/userContext"

const Navbar = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false)
  const [user, setUser] = useContext(UserContext)
  const logoutHandler = async () => {
    localStorage.removeItem("userData")
    setUser(null)
    setLogoutSuccess(true)
  }
  useEffect(() => {
    if (logoutSuccess) {
      setLogoutSuccess(false)
      window.location.reload()
    }
  }, [logoutSuccess])
  return (
    <div className=" flex justify-between place-items-center p-5 w-full h-16 shadow-md ring-1 ring-gray-200">
      <Link href="/">
        <h1 className="cursor-pointer font-bold text-gray-600 text-lg">
          Home Page
        </h1>
      </Link>
      {user?.username && (
        <ul className="flex space-x-2 items-baseline">
          <Link href="/dashboard">
            <h2 className="cursor-pointer text-gray-600 no-underline text-lg font-semibold bg-gray-200 hover:bg-blue-400 hover:text-white px-4 py-1 rounded-md transition-colors duration-200">
              Dashboard
            </h2>
          </Link>
          <Link href="/create">
            <h2 className="cursor-pointer text-gray-600 no-underline text-lg font-semibold bg-gray-200 hover:bg-blue-400 hover:text-white px-4 py-1 rounded-md transition-colors duration-200 hidden md:block">
              Create Post
            </h2>
          </Link>
          <button
            onClick={logoutHandler}
            className=" text-gray-600 no-underline text-lg font-semibold hover:bg-red-400 hover:text-white px-4 py-1 rounded-md transition-colors duration-200 hidden md:block"
          >
            Logout
          </button>
        </ul>
      )}
    </div>
  )
}

export default Navbar
