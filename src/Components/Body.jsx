import React, { useEffect } from "react"
import NavBar from "./Navbar"
import {  Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"
import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constant"
import { addUser } from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      console.log(err)
    }
  }
 
  useEffect(() => {
    fetchUser()
  }, [])




  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
