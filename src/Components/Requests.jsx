import axios from "axios"
import React, { useEffect } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestsSlice"

const Requests = () => {
  const dispatch = useDispatch()

  const requestsFeed = useSelector((store) => store.requests)

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      })

      dispatch(addRequests(res?.data?.data))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      )

      dispatch(removeRequest(id))
    } catch (err) {
      console.log(err)
    }
  }

  if (!requestsFeed)
    return (
      <div className="flex min-h-[calc(100vh-200px)] justify-center my-10">
        <h3 className=" text-xl text-center">Loading...</h3>
      </div>
    )
  if (requestsFeed.length === 0)
    return (
      <div className="flex min-h-[calc(100vh-200px)] justify-center my-10">
        <h3 className=" text-xl text-center">No Users Found...</h3>
      </div>
    )

  return (
    <div className="min-h-[calc(100vh-240px)] flex flex-col items-center my-10">
      {requestsFeed.map((request) => {
        const { firstName, lastName, description, imageUrl, _id } =
          request.fromUserId
        return (
          <div
            className="card bg-base-300 w-3/4 max-w-4xl px-4 py-2 shadow-sm flex flex-row items-center my-2"
            key={_id}
          >
            <div className="avatar w-24 h-24 ">
              <div className="w-24 rounded-full">
                <img src={imageUrl} className="object-top " />
              </div>
            </div>
            <div className="card-body w-4/5">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p className="line-clamp-2 ">{description}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", _id)}
              >
                accept
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests
