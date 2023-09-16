"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'
import  {useEffect, useState} from 'react'
import React from 'react'

const Page  = () => {
  const router = useRouter();
  const [data, setdata] = useState ("Nothing")
  const [verify, setVerify] = useState ("")


  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
    }
  }

  const getUserDetails = async ( ) => {
    const res = await axios.get('/api/users/myInfo')
    setdata(res.data.data._id)
   
    
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1 className='p-3 font-bold text-2xl m-4 rounded'>{verify}</h1>
        <h1 className='p-3 font-bold text-2xl m-4 bg-black-500 rounded'>Profile Page</h1>
        <h2 className='p-2 text-2xl bg-red-800 rounded m-4'>{data === "Nothing" ? "Nothing Here !" : <Link href={`profile/${data}`}>{data}</Link>}</h2>
        <button onClick={logout} className=' text-2xl font-bold rounded-2xl p-3 m-4 bg-green-600 hover:bg-blue-600'>Logout</button>
        <button onClick={getUserDetails} className=' text-2xl font-bold m-4 p-3 rounded-2xl  hover:bg-purple-600'>Press to Get User ID</button>

    </div>
  )
}
export default  Page