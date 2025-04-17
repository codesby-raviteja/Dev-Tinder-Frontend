import React, { useState } from "react"
import ProfileDetails from "./ProfileDetails"
import { useSelector } from "react-redux"

const Profile = () => {
  const user = useSelector((store) => store.user)

  return <div className="min-h-[calc(100vh-240px)] my-10 ">{user && <ProfileDetails user={user} />}</div>
}

export default Profile
