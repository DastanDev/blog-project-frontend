import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { UserContext } from "../../contexts/userContext"
import Head from "next/head"

const DashboardTemplate = ({ children }) => {
  const [user] = useContext(UserContext)
  const router = useRouter()

  const checkActiveButton = (route: string) => {
    if (router.pathname.includes(route)) {
      // makes button active if user is on the route
      return "bg-gray-600"
    }
  }
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])
  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
      <div className="flex w-full min-h-screen">
        {/* <!-- left side --> */}
        <div className="flex flex-col bg-gray-900 text-white w-3/12 overflow-hidden">
          <h2 className="font-bold mb-20 text-2xl p-5">Dashboard</h2>
          <ul className="flex font-semibold capitalize text-lg flex-col">
            <li className={`${checkActiveButton("posts")}`}>
              <Link href="/dashboard/posts">
                <button
                  className={`p-3 block hover:bg-gray-600 w-full text-left`}
                >
                  Dashboard
                </button>
              </Link>
            </li>
            <li className={`${checkActiveButton("user")}`}>
              <Link href="/dashboard/user">
                <button className="p-3 block hover:bg-gray-600 w-full text-left">
                  User
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- right side --> */}
        {/* <!-- nav --> */}
        <div className="flex w-full flex-col">
          <div className="flex p-5 w-full justify-between">
            <h2>Search</h2>
            <div className="flex space-x-4">
              <p>ring</p>
              <p>avatar</p>
            </div>
          </div>
          <div className="border-t-2 border-red-300 w-full"></div>
          {/* body of the page */}
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardTemplate
