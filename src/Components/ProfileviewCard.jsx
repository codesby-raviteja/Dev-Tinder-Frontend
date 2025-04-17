import React from "react"

function ProfileViewCard({ user }) {
  const { imageUrl, firstName, lastName, description, age, gender } = user

  return (
    <div className="card bg-base-300 w-96 shadow-sm mx-10">
      <figure className="h-96 ">
        <img src={imageUrl} alt={firstName + " " + lastName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age} , {gender}</p>}
        <p>{description}</p>
        <div className="card-actions justify-center mt-2">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary"> Interested</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileViewCard
