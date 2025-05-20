import axios from "axios"
import React from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

function FeedCard({ user }) {
  const { imageUrl, firstName, lastName, description, age, gender, _id } = user

  const dispatch = useDispatch()

  const handleChoice = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      )
      dispatch(removeUserFromFeed(id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="h-96 ">
        <img
          src={imageUrl}
          draggable={false}
          alt={firstName + " " + lastName}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + " " + "," + gender}</p>
        <p>{description}</p>
        <div className="card-actions justify-center mt-2">
          <button
            className="btn btn-primary"
            onClick={() => handleChoice("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleChoice("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
