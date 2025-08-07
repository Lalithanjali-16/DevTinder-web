import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequests , removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((state) => state.requests)

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      )
      dispatch(removeRequest(request._id))

    } catch (err) {
      console.log(err)
    }
  }


  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true
      })
      dispatch(addRequests(res.data.data))
    } catch (err) {
      console.error("Error fetching requests", err)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requests) return null
  if (requests.length === 0) return <h1 className="text-center mt-10">No requests received</h1>

  return (
    <div className="flex flex-col items-center my-10 w-full">
      <h1 className="text-2xl font-bold mb-6">Requests Received</h1>

      <div className="w-10/12 max-w-4xl space-y-6">
        {requests.map((request) => {
          const { _id, fromUserId } = request
          const { firstName, lastName, photoUrl, age, gender, about } = fromUserId

          return (
            <div
              key={_id}
              className="p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-md">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                />

                <div className="flex-1">
                  <p className="font-semibold text-base text-gray-900 dark:text-white">
                    {firstName} {lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {gender || 'Not specified'}, Age: {age ?? 'N/A'} —{' '}
                    {about?.length > 80 ? about.slice(0, 80) + '...' : about || 'No bio provided'}
                  </p>

                  <div className="flex gap-3">
                    <button className="btn btn-error btn-sm" onClick={()=>reviewRequest("rejected" , request._id)}>Reject</button>
                    <button className="btn btn-success btn-sm" onClick={()=>reviewRequest("accepted" , request._id)}>Accept</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests
