import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const [isLoginForm, setLoginForm] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err)
    }
  }

    const handleSignUp = async (e) => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className="card border border-gray-300 shadow-lg bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>

          {!isLoginForm && (
            <>
              <label className="form-control w-full mb-2">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full mb-2">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full mb-2">
            <span className="label-text">Email ID</span>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full mb-2">
            <span className="label-text">Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <p className="text-red-500 text-sm mt-1">{error}</p>

          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary" 
            onClick={isLoginForm? handleLogin : handleSignUp}>Submit</button>
          </div>

          <p
            className="text-sm text-center text-blue-600 cursor-pointer mt-3 hover:underline"
            onClick={() => setLoginForm((prev) => !prev)}
          >
            {isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
