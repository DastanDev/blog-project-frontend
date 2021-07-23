import axios from "axios"
import Router from "next/router"
import React, { useContext, useEffect, useState } from "react"
import baseUrl from "../baseUrl"
import { UserContext } from "../contexts/userContext"
import { Post } from "../types"
import Head from "next/head"

const create = () => {
  const [inputs, setInputs] = useState<Post | any>({
    title: "",
    content: "",
    description: "",
  })
  const [user, setUser] = useContext(UserContext)
  const [newPost, setNewPost] = useState({ title: "", content: "", _id: "" })

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/post`,
        data: inputs,
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      setNewPost(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  // if success redirect to new post
  useEffect(() => {
    if (newPost._id) {
      Router.push(`/post/${newPost._id}`)
    }
  }, [newPost])

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <div className="flex flex-col h-screen w-full justify-center place-items-center">
        <h2 className="font-bold text-4xl mb-5">Create Post</h2>
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
            className="bg-gray-200 p-2 rounded-md w-full outline-none"
            placeholder="Description"
          ></textarea>
          <textarea
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, content: e.target.value }))
            }
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

export default create
