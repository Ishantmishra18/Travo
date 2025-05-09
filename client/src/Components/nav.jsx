import React from 'react'
import { Link } from 'react-router-dom'

const nav = () => {
  return (
    <div className='w-full h-[10vh] bg-gray-500 flex justify-end items-center gap-5 px-6'>
        <Link to='/chat' className="chat px-5 py-3 bg-black text-white relative">Inbox
        <div className=" absolute text-center h-7 rounded-full aspect-square -top-2 -left-5 bg-red-500">4</div>
        </Link>
        <Link to='/login' className='px-5 py-2 rounded-2xl text-white bg-black'>login</Link>
        <Link to='/register' className='px-5 py-2 rounded-2xl border-2 border-black' >register</Link>
    </div>
  )
}

export default nav