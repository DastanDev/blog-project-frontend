import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import baseUrl from "../baseUrl"
import { UserContext } from "../contexts/userContext"
import Router from "next/router"
import Head from "next/head"

const login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" })
  const [user, setUser] = useContext(UserContext)

  // login handler
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/user/login`,
        data: inputs,
      })
      if (!data) throw Error("Error loggin in")
      setUser(data)
      // save to local storage
      localStorage.setItem("userData", JSON.stringify(data))
    } catch (error) {
      console.log(error.message)
    }
  }

  // if logged in redirect user
  useEffect(() => {
    if (user?.username) {
      Router.push("/dashboard")
    }
  }, [user])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex mx-auto flex-col max-w-xl w-full p-5">
        <form onSubmit={submitHandler} className=" flex flex-col space-y-5">
          <h2 className="font-bold text-center text-2xl">Login</h2>
          <input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, username: e.target.value }))
            }
            value={inputs.username}
            className="bg-gray-200 rounded-md outline-none p-2"
            placeholder="Enter your username"
            type="text"
          />
          <input
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, password: e.target.value }))
            }
            value={inputs.password}
            className="bg-gray-200 rounded-md outline-none p-2"
            placeholder="Enter your password"
            type="password"
          />
          <button className="text-blue-400 hover:bg-blue-400 hover:text-white transition-colors duration-200 w-max mx-auto px-3 py-2 rounded-md">
            Sign in
          </button>
        </form>
      </div>
    </>
  )
}

export default login
