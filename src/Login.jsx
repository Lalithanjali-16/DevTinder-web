import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [emailId , setEmailId] = useState("")
    const [password , setPassword] = useState("")
    
    const handleLogin = async() => {
        try{
            const res = await axios.post("http://localhost:3000/login" , {
            emailId ,password
        } , {
            withCredentials : true
        })
    }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className='flex items-center justify-center mt-15'>
      <div className="card card-border bg-base-100 w-96 card border border-gray-300 shadow-lg bg-base-100 w-96 ">
        <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input type="text" className="input" placeholder="Enter your Email ID" 
                value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset> 
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="text" className="input" placeholder="Enter your password" 
                value={password}  onChange={(e) => setPassword(e.target.value)} />
            </fieldset> 
            <div className="card-actions justify-center">
            <button className="btn btn-primary " onClick={handleLogin}>Submit</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login
