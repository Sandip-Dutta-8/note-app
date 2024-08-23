import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Passwordinput from '../components/Passwordinput'
import { validateEmail } from '../utils/helper'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

  }

  return (
    <>
      <Navbar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-9'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Sign Up</h4>

            <input
              type="text"
              placeholder='name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <button type='submit' className='btn-primary'>Create Account</button>

            <p className='text-sm mt-4 text-center'>
              Have an account?{" "}
              <Link to="/sign-up">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
