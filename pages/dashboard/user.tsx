import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import baseUrl from "../../baseUrl"
import DashboardTemplate from "../../components/dashboard/DashboardTemplate"
import { UserContext } from "../../contexts/userContext"

const user = () => {
  const [user, setUser] = useContext(UserContext)
  const [inputs, setInputs] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    if (user?.username) {
      setInputs(user)
    }
  }, [user])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios({
        method: "PUT",
        url: `${baseUrl}/user/${user?._id}`,
        data: inputs,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (data) {
        localStorage.removeItem("userData")
        window.location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <DashboardTemplate>
      <form
        autoComplete="off"
        onSubmit={submitHandler}
        className="flex flex-col place-items-center space-y-2"
      >
        <h2 className="text-red-500 text-xl font-semibold">Change your data</h2>
        <input
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, username: e.target.value }))
          }
          className="bg-gray-200 p-3 rounded-md outline-none"
          value={inputs.username}
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, oldPassword: e.target.value }))
          }
          className="bg-gray-200 p-3 rounded-md outline-none"
          value={inputs.oldPassword}
          type="password"
          placeholder="Old Password"
          autoComplete="off"
          aria-autocomplete="none"
        />
        <input
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, newPassword: e.target.value }))
          }
          className="bg-gray-200 p-3 rounded-md outline-none"
          value={inputs.newPassword}
          type="password"
          placeholder="New Password"
          autoComplete="off"
          aria-autocomplete="none"
        />
        <button className="mt-1 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors duration-200 w-max">
          Change Data
        </button>
      </form>
    </DashboardTemplate>
  )
}

export default user
