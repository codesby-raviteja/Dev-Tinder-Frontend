import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./Components/Navbar"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Feed from "./Components/Feed"
import Profile from "./Components/Profile"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route index element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
