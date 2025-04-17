import React, { useState } from "react"
import ProfileViewCard from "./ProfileviewCard"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const ProfileDetails = ({ user }) => {
  const [userDetails, setUserDetails] = useState(user)
  const [isSaved, setIsSaved] = useState(false)
  const dispatch = useDispatch()

  const updateDetails = (e) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const updateUserDetails = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          age: userDetails.age,
          gender: userDetails.gender,
          description: userDetails.description,
          imageUrl: userDetails.imageUrl,
        },
        {
          withCredentials: true,
        }
      )
      dispatch(addUser(res?.data?.data))
      setIsSaved(true)
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center ">
          <div className="card bg-base-200 w-96 pt-4 shadow-sm">
            <h3 className="text-2xl font-medium text-center underline">
              Profile Details
            </h3>
            <div className="card-body">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  name="firstName"
                  value={userDetails?.firstName}
                  onChange={updateDetails}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  placeholder="Last Name"
                  value={userDetails?.lastName}
                  onChange={updateDetails}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  name="age"
                  placeholder="age"
                  value={userDetails?.age}
                  onChange={updateDetails}
                />
              </fieldset>
              <fieldset>
                <legend className="fieldset-legend">Gender</legend>
                <select
                  className="select"
                  name="gender"
                  value={userDetails?.gender}
                  onChange={updateDetails}
                >
                  <option disabled={true} value={"pick a gender"}>
                    Pick a gender
                  </option>

                  <option value={"male"}>male</option>
                  <option value={"female"}>female</option>
                  <option value={"others"}>others</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo url</legend>
                <input
                  type="text"
                  className="input"
                  name="imageUrl"
                  placeholder="image url"
                  value={userDetails?.imageUrl}
                  onChange={updateDetails}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea"
                  placeholder="About"
                  name="description"
                  value={userDetails?.description}
                  onChange={updateDetails}
                ></textarea>
              </fieldset>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={updateUserDetails}>
                  {" "}
                  Save{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProfileViewCard user={userDetails} />
      </div>
      {isSaved && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileDetails
