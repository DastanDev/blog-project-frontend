import "../styles/globals.css"
import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import Navbar from "../components/Navbar"
import UserProvider from "../contexts/userContext"
import Layout from "../components/Layout/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        rel="stylesheet"
      />
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
export default MyApp
