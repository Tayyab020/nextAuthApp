"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { useEffect } from 'react';

import toast from "react-hot-toast";

export default function LoginPage() {
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
      <div  className="flex flex-col items-center justify-center min-h-screen ">
       <div  className="flex bg-cover flex-col items-center  justify-center  py-2 border h-[800px] w-[800px] bg-transparent rounded-2xl"
     >
       <h1 className=" font-bold text-4xl p-6">{loading? "processing":"login"}</h1>
        <hr/>
        <label htmlFor="email" className="py-1 text-3xl" >email</label>
        <input   className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          placeholder="Email"
        type="text"
        id="email"
        value={user.email}
        onChange={(e)=>setuser({...user,email:e.target.value})}
        />
        <hr/>
        <label htmlFor="password" className="py-1 text-3xl">password</label>
        <input 
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          placeholder="Password"
        type="password"
        id="password"
        value={user.password}
        onChange={(e)=>setuser({...user,password:e.target.value})}
        />
        <button 
            className="p-2 border bg-blue-600 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
         onClick={onlogin}>login</button>
        <Link className="hover:text-blue-600" href="/signup">signUp</Link>
        </div> 
      </div>
    )
  }
  
  