import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { removeUserFromFeed } from '../utils/feedSlice'
import { useDispatch } from 'react-redux'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      )
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="profile" className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about || "No bio provided."}</p>
          {(age || gender) && (
            <p>{`${age ?? "N/A"} ${gender ?? ""}`}</p>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-error" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-success" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
