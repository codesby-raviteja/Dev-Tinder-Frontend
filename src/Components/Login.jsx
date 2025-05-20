import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constant"

const Login = () => {
  const [emailId, setEmailId] = useState("virat@gmail.com")
  const [password, setPassword] = useState("Virat@9874")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        // { withCredentials: true }
        { withCredentials: "include" }
      )
      dispatch(addUser(res?.data))
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data)
    }
  }
  return (
    <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
      <div className="card card-side bg-base-300 shadow-sm w-full max-w-3xl">
        <figure className="w-1/2">
          <img
            src="https://images.squarespace-cdn.com/content/v1/53fe1e26e4b0e51709f9758f/1728622485245-7OEG5YQ42AJPNDS3X4L0/Online+dating.jpg?format=1500w"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl underline">
            Login
          </h2>
          <p className="text-blue-500 text-center">
            New user? <Link to={"/signup"} className="underline cursor-pointer ">signup</Link>
          </p>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter your Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset mt-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                // type="password"
                type="text"
                className="input"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-400 text-center text-base">{error}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary w-full mt-6"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
