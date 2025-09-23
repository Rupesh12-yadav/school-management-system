import React from 'react'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Home from './Components/page/Home'

const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <Login/> */}
      <Home/>
    </div>
  )
}

export default App