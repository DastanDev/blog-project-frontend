import React from "react"
import baseUrl from "../../../baseUrl"
import { Post } from "../../../types"
import useSWR from "swr"
import { fetcher } from "../../../functions/fetcher"
import PostItem from "../../../components/dashboard/PostItem"
import DashBoardTemplate from "../../../components/dashboard/DashboardTemplate"

const index = () => {
  const { data: posts, error, mutate } = useSWR([`${baseUrl}/post`, fetcher])

  return (
    <DashBoardTemplate>
      {/* <!-- body --> */}
      <div className="flex p-5 flex-col">
        {/* <!-- title --> */}
        <h2 className="font-bold text-xl mb-5">Dashboard</h2>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {posts?.map((post: Post) => (
              <PostItem key={post._id} {...post} mutate={mutate} />
            ))}
          </tbody>
        </table>
      </div>
    </DashBoardTemplate>
  )
}

export default index
