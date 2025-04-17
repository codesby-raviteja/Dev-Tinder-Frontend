import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"
import { addFeed } from "../utils/feedSlice"
import FeedCard from "./FeedCard"

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
     
      dispatch(addFeed(res?.data))
 
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className="flex justify-center my-10 min-h-[calc(100vh-240px)]">
      {feed && <FeedCard user={feed[0]} />}
    </div>
  )
}

export default Feed
