"use client";
import Link from "next/link";
import  {useEffect, useState} from 'react'

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = React.useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const responce = await axios.post("/api/users/signup", user);
      console.log("signUp success", responce.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signUp Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div
      
        className="flex bg-cover flex-col items-center  justify-center  py-2 border h-[800px] w-[800px] bg-transparent rounded-2xl"
      >
        <h1 className=" font-bold text-4xl p-6">
          {loading ? "Loading" : "SignUp"}
        </h1>
        <hr />
        <label htmlFor="username" className="py-1 text-3xl">
          Username
        </label>
        <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 rounded-lg border focus:outline-none  text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="email" className="py-1 text-3xl">
          Email
        </label>
        <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="py-1 text-3xl">
          Password
        </label>
        <input
          className="p-2 hover:bg-slate-200 focus:border-red-600 focus:border-red rounded-lg border focus:outline-none  text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          className="p-2 border bg-blue-600 hover:bg-blue-600 border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisable ? "Full-Fill" : "Signup"}
        </button>
        <Link className="hover:text-blue-600" href="/login">
          Have Account! login{" "}
        </Link>
      </div>
    </div>
  );
};

export default Signup;
