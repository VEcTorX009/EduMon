import React, { useState } from "react";
import {
    RedirectToSignIn,
  } from "@clerk/nextjs";
export default function Home() {
    const [login, setLogin] = useState(false)
  return (
    <div onClick={()=> setLogin(true)} style={{backgroundImage: `url("/login.png")`, backgroundSize: "100%"}} className="flex flex-col fixed justify-center items-center h-screen w-full  space-y-2 font-bold text-white">
      
      {login &&  <RedirectToSignIn />}
    </div>
  );
}