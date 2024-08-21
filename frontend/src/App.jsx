import React from 'react'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Home />}/>
        <Route path='/sign-in' element={<Signin />}/>
        <Route path='/sign-up' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App