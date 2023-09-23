import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchData } from "../components/fetchData";

import React, { useEffect, useState } from "react";
export default function explore({ setLoading }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    Promise.all([fetchData("posts")])
      .then(([data]) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);
  const [comment, setComment] = useState("");
  const [showcomment, setShowcomment] = useState(false);
  const [like, setLike] = useState(false);
  const app = useRouter();
  const handlecomment = async (e) => {
    setLoading(true);
    setShowcomment(true);
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.fullName,
        imageurl: user.imageUrl,
        text: comment,
        index: e,
      }),
    });

    setLoading(false);
  };
  const handlelike = async (e) => {
    setLoading(true);
    const response = await fetch("/api/like", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: data[e]._id,
      }),
    });
    console.log("semt")

    setLoading(false);
  };
  const { user } = useUser();
  return (
    <div className="flex   flex-row mb-4 text-white xl:gap-0 gap-6 xl:flex-nowrap flex-wrap justify-center xl:justify-between w-full h-full">
      <div className="flex gap-5 space-y-5 flex-col w-full justify-between  h-full px-12 py-3">
        {data?.map((e, i) => {
          return (
            <div className="flex border-gray-600 p-4 rounded-2xl border flex-wrap gap-3 items-center flex-row space-x-4">
              <div className="flex">
                <Image src={e.imageurl} width={680} height={680} />
              </div>
              <div className="flex  flex-col w-full  xl:w-[40%]  overflow-y-visible space-y-4 ">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row justify-start space-x-2  items-center">
                    <Image
                      src={"/pfp.svg"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <Link
                      href={`/schools/${e.name
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                      className="text-xl z-100 cursor-pointer"
                    >
                      {e.name}
                    </Link>
                    <button className="px-6 py-2 text-md border border-gray-600 font-semibold">
                      Follow
                    </button>
                  </div>
                  <div className="flex">
                    <Image src={"/more.svg"} width={20} height={20} />
                  </div>
                </div>
                <div className="flex flex-col min-h-[422.4px] overflow-y-scroll z-100 space-y-3">
                  <div className="flex space-y-2 flex-col">
                    <h1 className="text-xl font-semibold">{e.heading}</h1>
                    <h1 className="text-xl text-md">{e.description}</h1>
                  </div>

                  {e.comments.map((s) => {
                    return (
                      <div className="flex  flex-row justify-start items-start  space-x-2">
                        <Image
                          src={s.imageurl}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex  flex-col">
                          <h1 className="text-xl">
                            <span className="font-semibold">{s.name}</span>
                            <br />
                            {s.text}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex space-y-2 flex-col ">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row space-x-4">
                      <div className="flex justify-center cursor-pointer z-100 items-center flex-col space-y-1">
                        <Image
                          onClick={() => handlelike(i)}
                          src={"/like.svg"}
                          className={" fadein " }
                          width={40}
                          height={40}
                        />
                        <h1 className="text-md text-[#647C87]">
                          { e.likes}
                        </h1>
                      </div>
                      <div className="flex justify-center cursor-pointer z-100 items-center flex-col space-y-1">
                        <Image
                          src={"/comment.svg"}
                          className=""
                          width={40}
                          height={40}
                        />
                        <h1 className="text-md text-[#647C87]">
                          {e.comments.length}
                        </h1>
                      </div>
                      <div className="flex justify-center cursor-pointer z-100 items-center flex-col space-y-1">
                        <Image
                          src={"/share.svg"}
                          className=""
                          width={40}
                          height={40}
                        />
                        <h1 className="text-md text-[#647C87]">{e.shares}</h1>
                      </div>
                    </div>
                    <div className="flex cursor-pointer">
                      <Image src={"/info.svg"} width={40} height={40} />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center  w-full">
                    <div className="flex flex-row w-full cursor-pointer z-100 space-x-2">
                      <div className="flex">
                        <Image src={"/smile.svg"} width={40} height={40} />
                      </div>
                      <div>
                        <input
                          type={"text"}
                          value={comment}
                          name="comment"
                          aria-multiline={false}
                          id="comment"
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Comment...."
                          className="h-[38.24px] w-[384px] border border-gray-600 rounded-2xl  text-xl text-white  bg-transparent backdrop-blur-3xl font-poppins pageentry   p-2  "
                        ></input>
                      </div>
                    </div>
                    <div className="flex ">
                      <Image
                        src={"/send.svg"}
                        onClick={() => handlecomment(i)}
                        className="z-100 cursor-pointer"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex mt-5 border-l-gray-600 rounded-bl-xl border-l-2 border-b-gray-600 border-b-2 h-full space-y-3 flex-col w-full xl:w-[30%] p-3">
        <h1 className="text-center text-2xl font-bold">
          Latest from your school
        </h1>
        {data?.map((e) => {
          return e.registered === true ? (
            <div className="flex justify-center bg-[#13202A]  items-center flex-col p-4 space-y-2">
              <Image src={e.imageurl} width={300} height={300} />
              <h1 className="text-center text-xl font-semibold">{e.heading}</h1>
              <h1 className="text-center text-md ">{e.description}</h1>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}
