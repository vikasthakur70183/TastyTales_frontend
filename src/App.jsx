import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { useDispatch } from 'react-redux'
import { login, logout } from "./store/authslice"
import authService from "./routes/Auth"
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  return !loading ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : null

}

export default App
