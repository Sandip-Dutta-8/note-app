import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Passwordinput from '../components/Passwordinput'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axios'

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!")
      return
    }

    if (!password) {
      setError("Please enter a password!")
      return
    }

    setError("");

    //login api call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password
      })

      //handel successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("An unexpected error occur please try again")
      }
    }
  }

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-20 lg:mt-28'>
        <div className='w-96 lg:border rounded bg-white px-7 py-9'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Sign In</h4>

            <input
              type="text"
              placeholder='email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Login</button>

            <p className='text-sm mt-4 text-center'>
              Not register yet?{" "}
              <Link to="/sign-up" className='text-blue-500 underline'>Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signin