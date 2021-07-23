import axios from "axios"
import dayjs from "dayjs"
import Link from "next/link"
import React, { useContext } from "react"
import ReactMarkdown from "react-markdown"
import baseUrl from "../../baseUrl"
import { UserContext } from "../../contexts/userContext"
import { Post } from "../../types"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

interface PostItem extends Post {
  mutate: () => Promise<any>
}

const PostItem: React.FC<PostItem> = ({
  author,
  createdAt,
  title,
  content,
  mutate,
  _id,
}) => {
  const [user] = useContext(UserContext)
  // deletes product by given id
  const deleteHandler = async (id: string) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `${baseUrl}/post/${id}`,
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      if (data) {
        // updates the list when a post is deleted
        mutate()
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <Link href={`/post/${_id}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full cursor-pointer"
                src="https://budgetpainters.ca/wp-content/uploads/2018/10/user.png"
                alt=""
              />
            </div>

            <div className="ml-4">
              <div className="text-sm leading-5 font-medium text-gray-900 cursor-pointer">
                {title}
              </div>
            </div>
          </div>
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <div className="text-sm leading-5 text-gray-900">
          <ReactMarkdown children={content.substring(0, 100)} />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {dayjs(createdAt).fromNow(true)}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
        <button
          onClick={() => deleteHandler(_id)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
        <Link href={`/update/post/${_id}`}>
          <button className="text-indigo-600 hover:text-indigo-900">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  )
}

export default PostItem
