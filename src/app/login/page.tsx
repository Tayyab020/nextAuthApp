"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { useEffect } from 'react';

import toast from "react-hot-toast";

export default function loginPage() {
  const router=useRouter()
   const [buttonDisable, setButtonDisable] = React.useState(false);
   const [loading,setLoading]=React.useState(false);
    const[user,setuser]=React.useState({
        email:"",
        password:"",
    })
    useEffect(() => {
      if ( user.email.length > 0 && user.password.length > 0 
      ) {
        setButtonDisable(false);
      } 
      else {setButtonDisable(true);}
    }, [user]);
    const onlogin=async()=>{
      try {
        setLoading(true)
        const response=await axios.post("/api/users/login",user)
        console.log("login success",response.data)
        toast.success("login success")
        router.push("/profile")
      } catch (error:any) {
        console.log("login failed ",error.message)
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    return (
      <div className="flex flex-col justify-center items-center min-h-screen py-2" >
        <h1>{loading? "processing":"login"}</h1>
        <hr/>
        <label htmlFor="email">email</label>
        <input className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e)=>setuser({...user,email:e.target.value})}
        />
        <hr/>
        <label htmlFor="password">password</label>
        <input className=" p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e)=>setuser({...user,password:e.target.value})}
        />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onlogin}>login</button>
        <Link href="/signup">signUp</Link>
      </div>
    )
  }
  
  