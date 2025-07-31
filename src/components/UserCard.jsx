import React from 'react'

const UserCard = ({ user }) => {
  console.log(user)
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
