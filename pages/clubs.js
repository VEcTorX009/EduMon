import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {fetchData} from "../components/fetchData"

import React from "react";
export default function clubs({setLoading}) {
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchData("clubs"),
    ]).then(([data]) => {
      setData(data);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
    
    setLoading(false)

  }, [])
  const categories = []

  data.forEach((club) => {
    if (!categories.includes(club.category)) {
      categories.push(club.category)
    }
  })
  return (
    <div className="flex   flex-col w-full space-y-3 h-full justify-center p-7 text-white">
    {categories.map(e=>{
      return(

      <div className="flex flex-col space-y-2">
      <Link href={`/clubs/${e.toLowerCase()}`} className="text-4xl z-100 cursor-pointer"> {e}</Link>
        <div className="flex flex-row  py-2 z-30 overflow-x-auto space-x-3">
          {data?.map((s) => {
            return  (
              s.category===e?
              <div
                style={{
                  backgroundImage: `url("/${s.category==="Science"? "scienceclub":s.category==="Technology"?"roboticsclub": s.category==="Arts"?"artclub" :s.category==="Games"?"chesswebinar":s.category==="Environment"?"environmentclub" :s.category==="Communication"?"communicationclub" : e.name.replace(/\s/g, '').toLowerCase()}.png")`,
                  backgroundSize: "100%",
                }}
                className={`flex min-w-[366px] h-[228px] ${s.category === "Games"||s.category === "Debate"? "text-white" :"text-black"}   py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5`}
              >
                <div className="flex">
                  <h1 className="text-2xl text-white">{s.name}</h1>
                </div>
                <div className="flex flex-col  space-y-1">
                  <h1 className="text-xl">Class - {s.grade}</h1>
                  <h1 className="text-xl">Members - {s.members.length}</h1>
                  <div className="flex justify-center place-items-center flex-row space-x-2">
                  
                  <Image src={"/map.svg"} width={25} height={25}/>
                  <h1 className="text-xl">
                    {s.school}</h1>

                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/clubs/${s.name.replace(/\s/g, "").toLowerCase()}`}
                    >
                      Explore
                    </Link>
                  </button>
                </div>
              </div>: ""
            );
          })}
        </div>
      </div>
      )


    })}
    </div>
  );
}
