import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"
import axios from "axios"
import { addUser } from "../utils/userSlice"

const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSingup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      },{withCredentials:true})
      dispatch(addUser(res?.data?.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data)
    }
  }

  return (
    <div
      className="w-full h-[calc(100vh-200px)] flex
     justify-center items-center"
    >
      <div className="card card-side bg-base-300 shadow-sm w-full max-w-xl ">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl underline">
            Sign Up
          </h2>
          <p className="text-blue-500 text-center">
            Existing user?{" "}
            <Link to={"/login"} className="underline cursor-pointer ">
              Login
            </Link>
          </p>

          <div className="card-body ">
            <div className="">
              <fieldset className="fieldset mt-2 ">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter your first Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mt-2 ">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter your last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset ">
                <legend className="fieldset-legend w-full">Email Id</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter your Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset mt-2 ">
                <legend className="fieldset-legend">Password</legend>
                <input
                  // type="password"
                  type="text"
                  className="input w-full"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary w-2/3 mx-auto my-3"
              onClick={handleSingup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
