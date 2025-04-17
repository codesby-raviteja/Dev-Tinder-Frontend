import axios from "axios"
import React, { useEffect } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionsSlice"

const Connections = () => {
  const connections = useSelector((store) => store.connections)

  const dispatch = useDispatch()
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      })
      dispatch(addConnections(res?.data?.data))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections)
    return (
      <div className="flex min-h-[calc(100vh-200px)] justify-center my-10">
        <h3 className=" text-xl text-center">Loading...</h3>
      </div>
    )
  if (connections.length === 0)
    return (
      <div className="flex min-h-[calc(100vh-200px)] justify-center my-10">
        <h3 className=" text-xl text-center">No Users Found...</h3>
      </div>
    )

  return (
    <div className="min-h-[calc(100vh-240px)] flex flex-col items-center my-10">
      {connections.map((connection) => {
        const { firstName, lastName, description, imageUrl, _id } = connection
        return (
          <div
            className="card bg-base-300 w-2/3 px-4 py-2 shadow-sm flex flex-row items-center my-2 "
            key={_id}
          >
            <div className="avatar w-24 h-24 ">
              <div className="w-24 rounded-full">
                <img src={imageUrl} className="object-top " />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p className="line-clamp-2 ">{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections
