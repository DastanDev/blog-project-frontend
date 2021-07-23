import axios from "axios"
import React, { useEffect, useState } from "react"
import baseUrl from "../../baseUrl"
import { useRouter } from "next/router"
import { Post } from "../../types"
import ReactMarkdown from "react-markdown"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import Head from "next/head"
dayjs.extend(relativeTime)

const postDetail = () => {
  const [post, setPost] = useState<Post>()
  const router = useRouter()
  //
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/post/${router.query.id}`,
        })
        setPost(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (router.query.id) getPostDetails()
  }, [router])

  return (
    <>
      <Head>
        <title>Post | {post?.title}</title>
      </Head>
      <div className="flex p-5 flex-col max-w-3xl md:text-xl mx-auto">
        <p className="text-gray-400">
          {dayjs(post?.createdAt).fromNow(true)} ago
        </p>
        <h2 className="capitalize text-gray-800 font-bold text-2xl">
          {post?.title}
        </h2>
        <div className="flex place-items-center space-x-2">
          <img
            className="h-10 w-10 mt-3"
            src="https://budgetpainters.ca/wp-content/uploads/2018/10/user.png"
            alt="your-avatar"
          />
          <p id="author" className="text-gray-800 font-bold text-lg">
            {post?.author}
          </p>
        </div>
        <div className="capitalize text-2xl font-semibold text-black my-3 mt-4">
          {post?.description}
        </div>
        <div className="mark-content mb-5 text-gray-700 leading-6 md:leading-7">
          <ReactMarkdown children={post?.content} />
        </div>
      </div>
    </>
  )
}

export default postDetail
