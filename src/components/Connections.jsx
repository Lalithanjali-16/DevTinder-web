import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
  const connections = useSelector((store) => store.connections)
  const dispatch = useDispatch()

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      })
      console.log(res.data.data)
      dispatch(addConnections(res.data.data))
    } catch (err) {
      console.error('Failed to fetch connections:', err)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return null
  if (connections.length === 0) return <h1 className='text-center mt-10'>No connections found</h1>

 return (
  <div className='flex flex-col items-center my-10 w-full'>
    <h1 className='text-2xl font-bold mb-6'>Connections</h1>

    <div className='w-10/12 max-w-4xl space-y-6'>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection
        return (
          <div
            key={_id}
            className='p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
          >
            <div className='flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 shadow-md'>
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className='w-16 h-16 object-cover rounded-full border-2 border-gray-300'
              />
              <div className='flex-1'>
                <p className='font-semibold text-base text-gray-900 dark:text-white'>
                  {firstName} {lastName}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  {gender}, Age: {age} — {about.length > 80 ? about.slice(0, 80) + '...' : about}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

}

export default Connections
