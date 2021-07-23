import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/userContext"

const index = () => {
  const [user, setUser] = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if (!user?.username) {
      router.push("/login")
    } else {
      router.push("/dashboard/posts")
    }
  }, [user])
  return <div></div>
}

export default index
