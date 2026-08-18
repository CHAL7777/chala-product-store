import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const RootLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {/* Only render Navbar outside Hero on non-home pages.
          On home, Hero contains the Navbar (positioned absolute over the hero). */}
      {!isHome && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
