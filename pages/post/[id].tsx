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

  // set styles for markdown
  useEffect(() => {
    const h1s = document.querySelectorAll("h1")
    const h2s = document.querySelectorAll("h2")
    const lists = document.querySelectorAll("ul")
    const listItems = document.querySelectorAll("li")

    h1s.forEach((h1) => {
      h1.classList.add("font-bold")
      h1.classList.add("text-2xl")
      h1.classList.add("text-black")
      h1.classList.add("my-4")
    })
    h2s.forEach((h2) => {
      h2.classList.add("font-bold")
      h2.classList.add("text-lg")
      h2.classList.add("text-black")
      h2.classList.add("my-4")
    })
    lists.forEach((list) => {
      list.classList.add("list-disc")
    })
    listItems.forEach((item) => {
      item.classList.add("list-item")
    })
  }, [post])

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
        <div className="capitalize text-xl text-gray-600 mt-3">
          {post?.description}
        </div>
        <div
          id="postContent"
          className="mb-5 text-gray-700 leading-7 md:leading-8"
        >
          <ReactMarkdown children={post?.content} />
        </div>
      </div>
    </>
  )
}

export default postDetail
