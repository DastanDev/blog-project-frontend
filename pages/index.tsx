import React, { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../baseUrl"
import Link from "next/link"
import dayjs from "dayjs"
import { Post } from "../types"
import relativeTime from "dayjs/plugin/relativeTime"
import Head from "next/head"
import Loader from "../components/Loader"
dayjs.extend(relativeTime)

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  // get all posts
  useEffect(() => {
    const getAllPosts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${baseUrl}/post`)
        setPosts(data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }
    }
    getAllPosts()
  }, [])
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 max-w-xl w-full p-5 mx-auto">
        {loading && (
          <>
            <Loader /> <h2 className="text-center">Loading posts...</h2>{" "}
          </>
        )}
        {posts?.map((post, idx) => (
          <React.Fragment key={post._id}>
            <div className="flex flex-col">
              <Link href={`/post/${post._id}`}>
                <img
                  className="max-h-36 mb-1 object-cover"
                  src={post.img}
                  alt={post.title}
                />
                <p className="text-gray-500 text-sm">
                  {dayjs(post.createdAt).fromNow(true)} ago
                </p>
                <h2 className="cursor-pointer capitalize font-bold text-2xl my-1 hover:text-blue-400 hover:no-underline">
                  {post.title}
                </h2>
                <div className="flex place-items-center space-x-2">
                  <img
                    className="h-10 w-10 mt-3"
                    src="https://budgetpainters.ca/wp-content/uploads/2018/10/user.png"
                    alt=""
                  />
                  <p className="text-gray-800 font-bold text-lg">
                    {post.description}
                  </p>
                </div>
              </Link>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
