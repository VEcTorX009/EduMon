import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function sidebar() {
  const [disturb, setDisturb] = useState(false);
  const app = useRouter();
  return (
    <div className="flex fadein flex-col space-y-16 w-[10vw] items-start   border-r-2 p-4 border-r-slate-800 h-screen ">
      <div className="flex   transition-all space-x-3 cursor-pointer flex-row items-center ">
        <Image src={"/logo.png"} width={50} height={50} />
        <h1 className="text-[#C1E7F2] hidden xl:block text-xl">EduMon</h1>
      </div>
      <Link
        href={"/"}
        className={` flex ${
          app.pathname === "/" ? "brightness-125" : "brightness-75"
        } hover:scale-105 transition-all space-x-3 cursor-pointer flex-row items-center justify-start`}
      >
        <Image src={"/home.svg"} width={50} height={50} />
        <h1 className="text-xl    text-white hidden xl:block">Home</h1>
      </Link>
      <Link
        href={"/explore"}
        className={` flex ${
          app.pathname === "/explore" ? "brightness-125" : "brightness-75"
        } hover:scale-105 transition-all space-x-3 cursor-pointer flex-row items-center justify-start`}
      >
        <Image src={"/explore.svg"} width={50} height={50} />
        <h1 className="text-xl  text-white hidden xl:block">Explore</h1>
      </Link>
      <Link
        href={"/clubs"}
        className={` flex ${
          app.pathname === "/clubs" ? "brightness-125" : "brightness-75"
        } hover:scale-105 transition-all space-x-3 cursor-pointer flex-row items-center justify-start`}
      >
        <Image src={"/clubs.svg"} width={50} height={50} />
        <h1 className="text-xl  text-white hidden xl:block">Clubs</h1>
      </Link>
      <Link
        href={"/events"}
        className={` flex ${
          app.pathname === "/events" ? "brightness-125" : "brightness-75"
        } hover:scale-105 transition-all space-x-3 cursor-pointer flex-row items-center justify-start`}
      >
        <Image src={"/events.svg"} width={50} height={50} />
        <h1 className="text-xl  text-white hidden xl:block">Events</h1>
      </Link>
      <div
        className=""
        onMouseEnter={() => setDisturb(true)}
        onMouseLeave={() => setDisturb(false)}
      >
        {disturb ? (
          <Image
            src={"/disturb.png"}
            className="fadein absolute bottom-0 w-[6vw] md:w-[3vw] left-[3vw]"
            width={85}
            height={85}
          />
        ) : (
          <Image
            src={"/lookdown.png"}
            className="fadein absolute bottom-0 w-[6vw] md:w-[3vw] left-[3vw]"
            width={55}
            height={55}
          />
        )}
      </div>
    </div>
  );
}
