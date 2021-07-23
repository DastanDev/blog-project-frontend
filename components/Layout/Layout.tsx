import React, { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/userContext"

const Layout = ({ children }) => {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
    if (userDataFromStorage) setUser(userDataFromStorage)
  }, [])

  return <div>{children}</div>
}

export default Layout
