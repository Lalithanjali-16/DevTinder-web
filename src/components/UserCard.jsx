import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const UserCard = ({ user }) => {

  const handleSendRequest = async(status , userId) => {
    try{
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,{} ,{
        withCredentials : true
      }
      )
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user.photoUrl} alt="profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.about}</p>
          {user.age && user.gender && (
            <p>{`${user.age} ${user.gender}`}</p>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-success">Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
