import axios from "axios"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import baseUrl from "../../../baseUrl"
import { UserContext } from "../../../contexts/userContext"
import { Post } from "../../../types"

const updatePost = () => {
  // get post data
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    description: "",
  })
  const [user, setUser] = useContext(UserContext)
  const [updated, setUpdated] = useState<Post>()

  const router = useRouter()

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: "PUT",
        url: `${baseUrl}/post/${router.query.id}`,
        data: inputs,
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      if (data) {
        setUpdated(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  // if success redirect to new post
  useEffect(() => {
    if (updated) {
      Router.push(`/post/${router.query.id}`)
    }
  }, [updated])

  // get post data when page loads
  useEffect(() => {
    const getPostData = async () => {
      if (typeof router.query.id !== "string") return
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/post/${router.query.id}`,
        })
        setInputs(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPostData()
  }, [router])

  return (
    <>
      <Head>
        <title>Update Post</title>
      </Head>
      <div className="flex flex-col h-screen w-full justify-center place-items-center">
        <h2 className="font-bold text-4xl mb-5">Update Post</h2>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col space-y-2 px-5 max-w-5xl"
        >
          <input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, title: e.target.value }))
            }
            value={inputs.title}
            className="bg-gray-200 p-2 rounded-md w-full outline-none"
            placeholder="Title"
            type="text"
          />
          <textarea
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, description: e.target.value }))
            }
            value={inputs.description}
            className="bg-gray-200 p-2 rounded-md w-full outline-none"
            placeholder="description"
          ></textarea>
          <textarea
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, content: e.target.value }))
            }
            value={inputs.content}
            className="bg-gray-200 p-2 rounded-md w-full outline-none"
            placeholder="Content"
            rows={20}
          ></textarea>
          <button
            className="text-2xl w-max mx-auto px-6 py-2 rounded text-blue-400 hover:text-white hover:bg-blue-500 transition-colors duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default updatePost
