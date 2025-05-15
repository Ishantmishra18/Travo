import React from 'react'
import { Link } from 'react-router-dom'

const logineed = () => {
  return (
    <div className='card h-[60vh] aspect-square rounded-2xl p-5 flex flex-col'>
        <h2>you need to login first</h2>
        <Link to='/login' className=' px-5 py-2 rounded-2xl bg-black text-white '>log in here</Link>
    </div>
  )
}

export default logineed