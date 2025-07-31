import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [about, setAbout] = useState(user.about)
  const [skills, setSkills] = useState(user.skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "")
  const [error, setError] = useState("")
  const [toast, setToast] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleSave = async () => {
    setError("")
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        age,
        gender,
        about,
        skills,
        photoUrl,
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data.data))
      setToast(true)
      setTimeout(() => {
        setToast(false);
      },3000);
      navigate("/profile")
    } catch (err) {
      setError("Failed to save profile")
      console.log(err)
    }
  }

  return (
    <>
  <div className="flex flex-col md:flex-row items-start justify-center gap-10 mt-10">
    <div className="card border border-gray-300 shadow-lg bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input type="text" className="input" placeholder="Enter first name"
            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input type="text" className="input" placeholder="Enter last name"
            value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input type="number" className="input" placeholder="Enter age"
            value={age} onChange={(e) => setAge(e.target.value)} />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <textarea className="textarea" placeholder="Tell something about yourself"
            value={about} onChange={(e) => setAbout(e.target.value)} />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Photo URL</legend>
          <input type="text" className="input" placeholder="Paste image URL"
            value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>
          <div className='flex gap-2'>
            <input type="text" className="input" placeholder="Enter skill"
              value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
            <button type="button" className="btn btn-sm" onClick={handleAddSkill}>Add</button>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {skills.map((skill, idx) => (
              <span key={idx} className='badge badge-outline'>{skill}</span>
            ))}
          </div>
        </fieldset>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
        </div>
      </div>
    </div>

   
    <UserCard 
      user={{
        firstName,
        lastName,
        age,
        gender,
        about,
        skills,
        photoUrl
      }}
    />
  </div>
  
  
    {toast && (
        <div className="toast toast-top toast-center">
            <div className="alert alert-success">
            <span>Profile updated successfully.</span>
            </div>
        </div>
        )}

    
  </>
)

}

export default EditProfile
