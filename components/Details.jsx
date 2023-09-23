import Link from "next/link";
import React, { Suspense } from "react";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "./fetchData";
import CustomLoader from "./CustomLoader";
export default function Details({ type, temp }) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(
    type === "club" ? "announcements" : type === "school" ? "media" : "about"
  );

  const app = useRouter();
  function formatDate(inputDate) {
    // Split the input date using slashes and convert it to an array [day, month, year]
    const dateParts = inputDate.split("/").map((part) => parseInt(part, 10));

    if (dateParts.length !== 3) {
      return "Invalid date format"; // Handle invalid input format
    }

    // Extract day, month, and year from the array
    const [day, month, year] = dateParts;

    // Define an array of month names for formatting
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create an array of suffixes for days (st, nd, rd, th)
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    // Format the date string
    const formattedDate = `${day}${daySuffix} ${monthNames[month - 1]} ${year}`;

    return formattedDate;
  }
  const join = async () => {
    const finaldata = { clubName: data.name || data.title, type: type }; // Replace with the actual club name
    const response = await fetch("/api/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finaldata),
    });
  };
  const [wdata, setWdata] = useState([{}]);
  const [cdata, setCdata] = useState([{}]);
  const [widata, setWidata] = useState([{}]);
  const [pdata, setPdata] = useState([{}]);
  const [cldata, setclData] = useState({});
  const [sdata, setSdata] = useState([]);
  useEffect(() => {
    console.log(temp);
    Promise.all([
      fetchData("workshops"),
      fetchData("competetions"),
      fetchData("webinars"),
      fetchData("posts"),
      fetchData("clubs"),
      fetchData("schools"),
    ])
      .then(([wdata, cdata, widata, pdata, cldata, sdata]) => {
        setWdata(wdata);
        setCdata(cdata);
        setWidata(widata);
        setPdata(pdata);
        setclData(cldata);
        setSdata(sdata);
        if (type === "club") {
          const clubd = cldata.find(
            (club) =>
              club.name.replace(/\s/g, "").toLowerCase() ===
              temp.name.replace(/\s/g, "").toLowerCase()
          );
          setData(clubd);
        } else if (type === "school") {
          const clubd = sdata.find(
            (club) =>
              club.name.replace(/\s/g, "").toLowerCase() ===
              temp.name.replace(/\s/g, "").toLowerCase()
          );
          setData(clubd);
        } else if (type === "webinar") {
          const clubd = widata.find(
            (club) =>
              club.title.replace(/\s/g, "").toLowerCase() ===
              temp.title.replace(/\s/g, "").toLowerCase()
          );
          setData(clubd);
        } else if (type === "competetion") {
          const clubd = cdata.find(
            (club) =>
              club.title.replace(/\s/g, "").toLowerCase() ===
              temp.title.replace(/\s/g, "").toLowerCase()
          );
          setData(clubd);
        } else {
          const clubd = wdata.find(
            (club) =>
              club.title.replace(/\s/g, "").toLowerCase() ===
              temp.title.replace(/\s/g, "").toLowerCase()
          );
          setData(clubd);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setTimeout(() => {
      setLoad(false);
    }, 4000);
  }, [wdata, cdata, widata, pdata, cldata, sdata]);

  const leave = async () => {
    const finaldata = { clubName: data.name || data.title, type: type };
    const response = await fetch("/api/leave", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finaldata),
    });
  };

  const [load, setLoad] = useState(true);
  return (
    <Suspense fallback={<CustomLoader />}>
      <div className="flex flex-col space-y-3 w-full h-screen text-white">
        {load && <CustomLoader />}
        <div
          style={
            type === "club"
              ? {
                  backgroundImage: `url("/${
                    data?.category === "Science"
                      ? "sciencebanner"
                      : data?.category === "Technology"
                      ? "technologybanner"
                      : data?.category === "Arts"
                      ? "artbanner"
                      : data?.category === "Games"
                      ? "gamesbanner"
                      : data?.category === "Environment"
                      ? "environmentbanner"
                      : data?.category === "Communication"
                      ? "communicationbanner"
                      : data?.name?.replace(/\s/g, "").toLowerCase()
                  }.png")`,
                  backgroundSize: "100%",
                }
              : type === "competetion"
              ? {
                  backgroundImage: `url("/competetionbanner.png")`,
                  backgroundSize: "100%",
                }
              : type === "webinar"
              ? {
                  backgroundImage: `url("/webinarbanner.png")`,
                  backgroundSize: "100%",
                }
              : type === "workshop"
              ? {
                  backgroundImage: `url("/workshopbanner.png")`,
                  backgroundSize: "100%",
                }
              : type === "school"
              ? {
                  backgroundImage: `url("https://i.ibb.co/chH4wQJ/image.png")`,
                  backgroundSize: "100%",
                }
              : ""
          }
          className="flex p-8  bg-cover  flex-row w-full min-h-[384px] "
        >
          <div
            className={`${
              data?.category === "Science" ? "text-black" : "text-white"
            } flex space-y-3 max-w-[607px] flex-col `}
          >
            <h1 className="text-6xl font-bold">{data?.name || data?.title}</h1>
            <p className="text-2xl font-medium">
              {type === "school"
                ? data?.mission
                : data?.description || data?.about}
            </p>

            <div className="space-x-3 flex flex-row flex-wrap gap-3">
              {type === "school" ? (
                ""
              ) : data?.school && data?.club ? (
                <>
                  <button className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/schools/${data?.school
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {data?.school}
                    </Link>
                  </button>
                  <button className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-white text-black justify-center items-center">
                    <Link
                      href={`/clubs/${data?.club
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {data?.club}
                    </Link>
                  </button>
                  {data?.registered && (
                    <button
                      onClick={leave}
                      className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-white text-black justify-center items-center"
                    >
                      Leave
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                    <Link
                      href={`/schools/${data?.school
                        ?.replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {data?.school}
                    </Link>
                  </button>
                  {data?.registered && (
                    <button
                      onClick={leave}
                      className="px-12 z-100 z-50 cursor-pointer text-xl py-2 rounded-xl bg-white text-black justify-center items-center"
                    >
                      Leave
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex text-2xl z-100 space-x-3 p-3 flex-row justify-center items-center">
          {type === "club" ? (
            <h1
              onClick={() => setShow("announcements")}
              className={`${
                show === "announcements" ? "active" : ""
              } cursor-pointer`}
            >
              Announcements
            </h1>
          ) : type === "school" ? (
            <h1
              onClick={() => setShow("media")}
              className={`${show === "media" ? "active" : ""} cursor-pointer`}
            >
              Media
            </h1>
          ) : (
            <h1
              onClick={() => setShow("about")}
              className={`${show === "about" ? "active" : ""} cursor-pointer`}
            >
              About
            </h1>
          )}
          {type === "club" ? (
            <h1
              onClick={() => setShow("events")}
              className={`${show === "events" ? "active" : ""} cursor-pointer`}
            >
              Events
            </h1>
          ) : (
            <h1
              onClick={() => setShow("details")}
              className={`${show === "details" ? "active" : ""} cursor-pointer`}
            >
              Details
            </h1>
          )}
          <h1
            onClick={() => setShow("members")}
            className={`${show === "members" ? "active" : ""} cursor-pointer`}
          >
            Members
          </h1>
        </div>
        <div className="flex flex-col space-y-2 p-5 w-full  justify-center">
          {show === "announcements" ? (
            data?.announcements?.map((e) => {
              return data?.registered ? (
                <div className="w-full space-y-3 flex flex-col bg-[#1B354A] min-h-[10vw] p-3 rounded-xl text-white">
                  <h1 className="text-3xl">{e.heading}</h1>
                  <h1 className="text-2xl text-gray-300">{e.description}</h1>
                </div>
              ) : (
                <form
                  onSubmit={join}
                  className="flex flex-col space-y-2 p-5 w-full items-center  justify-center"
                >
                  <div className="w-[40vw] space-y-3 flex flex-col bg-[#1B354A] min-h-[10vw] text-center items-center justify-center p-3 rounded-xl text-white">
                    <h1 className="text-3xl">
                      Seems like you are not a part of this yet!
                    </h1>
                    <button
                      className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center"
                      type="SUBMIT"
                    >
                      Join Now
                    </button>
                  </div>
                </form>
              );
            })
          ) : show === "about" ? (
            <>
              <div className="w-full space-y-3 flex flex-col  min-h-[10vw] p-3 rounded-xl text-white">
                <h1 className="text-2xl">{data.about}</h1>
                {type === "club" ? (
                  <>
                    <h1 className="text-3xl">Sponsors</h1>
                    <h1 className="text-2xl">{data.sponsors}</h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl">Guests</h1>
                    <h1 className="text-2xl">{data.guests}</h1>
                  </>
                )}
              </div>
              {!data?.registered && (
                <div className="flex flex-col space-y-2 p-5 w-full items-center  justify-center">
                  <div className="w-[40vw] space-y-3 flex flex-col bg-[#1B354A] min-h-[10vw] text-center items-center justify-center p-3 rounded-xl text-white">
                    <h1 className="text-3xl">
                      Seems like you are not a part of this yet!
                    </h1>
                    <button
                      className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#6BBFFF] text-black justify-center items-center"
                      onClick={join}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : show === "events" ? (
            <>
              <div className="flex flex-col space-y-2">
                <h1 className="text-4xl"> Workshops</h1>
                <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto">
                  {wdata?.map((e) => {
                    return (
                      e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.title?.replace(/\s/g, "").toLowerCase() ||
                      (e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.name?.replace(/\s/g, "").toLowerCase() && (
                        <div
                          style={{
                            backgroundImage: `url("/codingcompetetion.png")`,
                            backgroundSize: "100%",
                          }}
                          className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                        >
                          <div className="flex">
                            <h1 className="text-2xl ">{e?.title}</h1>
                          </div>
                          <div className="flex flex-col  space-y-1">
                            <h1 className="text-xl">
                              Date - {formatDate(e.date)}
                            </h1>
                            <h1 className="text-xl">Location - {e?.mode}</h1>
                            <h1 className="text-xl">
                              Participants - {e?.members?.length}
                            </h1>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                              <Link
                                href={`/events/workshops/${e?.title
                                  ?.replace(/\s/g, "")
                                  .toLowerCase()}`}
                              >
                                Explore
                              </Link>
                            </button>
                          </div>
                        </div>
                      ))
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-4xl"> Webinars</h1>
                <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto">
                  {widata?.map((e) => {
                    return (
                      e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.title?.replace(/\s/g, "").toLowerCase() ||
                      (e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.name?.replace(/\s/g, "").toLowerCase() && (
                        <div
                          style={{
                            backgroundImage: `url("/aiwebinar.png")`,
                            backgroundSize: "100%",
                          }}
                          className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                        >
                          <div className="flex">
                            <h1 className="text-2xl ">{e.title}</h1>
                          </div>
                          <div className="flex flex-col  space-y-1">
                            <h1 className="text-xl">
                              Date - {formatDate(e.date)}
                            </h1>
                            <h1 className="text-xl">Location - {e.mode}</h1>
                            <h1 className="text-xl">
                              Members - {e.members.length}
                            </h1>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                              <Link
                                href={`/events/webinars/${e.title
                                  .replace(/\s/g, "")
                                  .toLowerCase()}`}
                              >
                                Explore
                              </Link>
                            </button>
                          </div>
                        </div>
                      ))
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-4xl">Competitions</h1>
                <div className="flex flex-row py-2 space-x-3 z-50 overflow-x-auto">
                  {cdata?.map((e) => {
                    return (
                      e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.title?.replace(/\s/g, "").toLowerCase() ||
                      (e?.club?.replace(/\s/g, "").toLowerCase() ===
                        data?.name?.replace(/\s/g, "").toLowerCase() && (
                        <div
                          style={{
                            backgroundImage: `url("/illustrationcompetetion.png")`,
                            backgroundSize: "100%",
                          }}
                          className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                        >
                          <div className="flex">
                            <h1 className="text-2xl ">{e.title}</h1>
                          </div>
                          <div className="flex flex-col  space-y-1">
                            <h1 className="text-xl">
                              Date - {formatDate(e.date)}
                            </h1>
                            <h1 className="text-xl">Location - {e.mode}</h1>
                            <h1 className="text-xl">
                              Members - {e.members.length}
                            </h1>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                              <Link
                                href={`/events/competetions/${e.title
                                  .replace(/\s/g, "")
                                  .toLowerCase()}`}
                              >
                                Explore
                              </Link>
                            </button>
                          </div>
                        </div>
                      ))
                    );
                  })}
                </div>
              </div>
            </>
          ) : show === "details" ? (
            <div className="w-full space-y-[3vw] flex flex-col  min-h-[10vw] p-3  rounded-xl text-white">
              {type === "school" ? (
                <>
                  <h1 className="text-3xl">Since : {data?.details?.birth}</h1>
                  <h1 className="text-3xl">
                    Famous For : {data?.details?.famousfor}
                  </h1>
                  <h1 className="text-3xl">
                    Position : {data?.details?.category}
                  </h1>
                  <h1 className="text-3xl">
                    World Ranking : {data?.details?.worldranking}
                  </h1>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl">Student Life</h1>
                    <h1 className="text-2xl">{data?.details?.studentlife}</h1>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl">Top Rankers</h1>
                    <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
                      {data?.details?.pasttoprankers?.map((n) => {
                        return (
                          <div
                            style={{
                              backgroundImage: `url("${n.imageurl}")`,
                              backgroundSize: "100%",
                            }}
                            className="flex min-w-[15vw] border-gray-600 border font-bold text-black justify-center rounded-full items-center h-[15vw] py-6 px-6   flex-col space-y-5"
                          >
                            <h1 className="text-4xl ">{n.name}</h1>
                            <h1 className="text-4xl "> {n.rank}</h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl"> Workshops</h1>
                    <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
                      {wdata?.map((e) => {
                        return (
                          e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.title?.replace(/\s/g, "").toLowerCase() ||
                          (e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.name.replace(/\s/g, "").toLowerCase() && (
                            <div
                              style={{
                                backgroundImage: `url("/codingcompetetion.png")`,
                                backgroundSize: "100%",
                              }}
                              className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                            >
                              <div className="flex">
                                <h1 className="text-2xl ">{e.title}</h1>
                              </div>
                              <div className="flex flex-col  space-y-1">
                                <h1 className="text-xl">
                                  Date - {formatDate(e.date)}
                                </h1>
                                <h1 className="text-xl">Location - {e.mode}</h1>
                                <h1 className="text-xl">
                                  Participants - {e.members.length}
                                </h1>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                                  <Link
                                    href={`/events/workshops/${e.title
                                      .replace(/\s/g, "")
                                      .toLowerCase()}`}
                                  >
                                    Explore
                                  </Link>
                                </button>
                              </div>
                            </div>
                          ))
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl"> Webinars</h1>
                    <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
                      {widata?.map((e) => {
                        return (
                          e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.title?.replace(/\s/g, "").toLowerCase() ||
                          (e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.name.replace(/\s/g, "").toLowerCase() && (
                            <div
                              style={{
                                backgroundImage: `url("/aiwebinar.png")`,
                                backgroundSize: "100%",
                              }}
                              className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                            >
                              <div className="flex">
                                <h1 className="text-2xl ">{e.title}</h1>
                              </div>
                              <div className="flex flex-col  space-y-1">
                                <h1 className="text-xl">
                                  Date - {formatDate(e.date)}
                                </h1>
                                <h1 className="text-xl">Location - {e.mode}</h1>
                                <h1 className="text-xl">
                                  Members - {e.members.length}
                                </h1>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                                  <Link
                                    href={`/events/webinars/${e.title
                                      .replace(/\s/g, "")
                                      .toLowerCase()}`}
                                  >
                                    Explore
                                  </Link>
                                </button>
                              </div>
                            </div>
                          ))
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl">Competitions</h1>
                    <div className="flex flex-row flex-wrap py-2 gap-5 z-50 ">
                      {cdata?.map((e) => {
                        return (
                          e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.title?.replace(/\s/g, "").toLowerCase() ||
                          (e?.school?.replace(/\s/g, "").toLowerCase() ===
                            data?.name.replace(/\s/g, "").toLowerCase() && (
                            <div
                              style={{
                                backgroundImage: `url("/illustrationcompetetion.png")`,
                                backgroundSize: "100%",
                              }}
                              className="flex min-w-[366px] h-[228px]  py-6  px-6 rounded-xl justify-between items-start flex-col space-y-5"
                            >
                              <div className="flex">
                                <h1 className="text-2xl ">{e.title}</h1>
                              </div>
                              <div className="flex flex-col  space-y-1">
                                <h1 className="text-xl">
                                  Date - {formatDate(e.date)}
                                </h1>
                                <h1 className="text-xl">Location - {e.mode}</h1>
                                <h1 className="text-xl">
                                  Members - {e.members.length}
                                </h1>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <button className="px-12 z-50 cursor-pointer text-xl py-2 rounded-xl bg-[#294D69] text-white justify-center items-center">
                                  <Link
                                    href={`/events/competetions/${e.title
                                      .replace(/\s/g, "")
                                      .toLowerCase()}`}
                                  >
                                    Explore
                                  </Link>
                                </button>
                              </div>
                            </div>
                          ))
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <h1 className="text-3xl">{data.details}</h1>
              )}
            </div>
          ) : show === "members" ? (
            type === "school" ? (
              <>
                <h1 className="text-3xl">Founder</h1>
                <div className="flex p-5 flex-row flex-wrap gap-5">
                  {data?.founders?.map((e) => {
                    return (
                      <div className="flex-row justify-center items-center rounded-2xl bg-[#1B354A] space-x-3 flex p-4">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={e.imageurl}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl">{e.name}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h1 className="text-3xl">Principal</h1>
                <div className="flex p-5 flex-row flex-wrap gap-5">
                  {data?.principal?.map((e) => {
                    return (
                      <div className="flex-row justify-center items-center rounded-2xl bg-[#1B354A] space-x-3 flex p-4">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={e.imageurl}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl">{e.name}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h1 className="text-3xl">Teachers</h1>
                <div className="flex p-5 flex-row flex-wrap gap-5">
                  {data?.teachers?.map((e) => {
                    return (
                      <div className="flex-row justify-center items-center rounded-2xl bg-[#1B354A] space-x-3 flex p-4">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={e.imageurl}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl">{e.name}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h1 className="text-3xl">Members</h1>
                <div className="flex p-5 flex-row flex-wrap gap-5">
                  {data?.members?.map((e) => {
                    return (
                      <div className="flex-row justify-center items-center rounded-2xl bg-[#1B354A] space-x-3 flex p-4">
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={e.imageurl}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl">{e.name}</h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex p-5 flex-row gap-5">
                {data?.members?.map((e) => {
                  return (
                    <div className="flex-row justify-center items-center rounded-2xl bg-[#1B354A] space-x-3 flex p-4">
                      <div>
                        <Image
                          width={50}
                          height={50}
                          src={e.imageurl}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h1 className="text-2xl">{e.name}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="flex space-y-5  flex-col w-full justify-between  h-full px-12 py-3">
              <h1 className="text-3xl font-bold">Mission</h1>
              <h1 className="text-2xl">{data?.details?.mission}</h1>
              {pdata?.map((e) => {
                return (
                  e?.name?.replace(/\s/g, "").toLowerCase() ===
                    data?.name?.replace(/\s/g, "").toLowerCase() && (
                    <div className="flex border-gray-600 border p-4 rounded-2xl items-center flex-row space-x-4">
                      <div className="flex">
                        <Image src={e.imageurl} width={680} height={680} />
                      </div>
                      <div className="flex  flex-col   max-h-[30vw] overflow-y-visible space-y-4 ">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row justify-start space-x-2  items-center">
                            <Image
                              src={"/pfp.svg"}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <Link
                              href={`/schools/${e?.name
                                ?.replace(/\s/g, "")
                                .toLowerCase()}`}
                              className="text-xl z-100 cursor-pointer"
                            >
                              {e.name}
                            </Link>
                          </div>
                          <div className="flex">
                            <Image src={"/more.svg"} width={20} height={20} />
                          </div>
                        </div>
                        <div className="flex flex-col min-h-[22vw] overflow-y-scroll z-100 space-y-3">
                          <div className="flex space-y-2 flex-col">
                            <h1 className="text-xl font-semibold">
                              {e.heading}
                            </h1>
                            <h1 className="text-xl text-md">{e.description}</h1>
                          </div>

                          {e?.comments?.map((s) => {
                            return (
                              <div className="flex flex-row justify-start items-start  space-x-2">
                                <Image
                                  src={s.imageurl}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <div className="flex  flex-col">
                                  <h1 className="text-xl">
                                    <span className="font-semibold">
                                      {s.name}
                                    </span>
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
                              <div className="flex justify-center  items-center flex-col space-y-1">
                                <Image
                                  src={"/like.svg"}
                                  width={40}
                                  height={40}
                                />
                                <h1 className="text-md text-[#647C87]">
                                  {e.likes}
                                </h1>
                              </div>
                              <div className="flex justify-center  items-center flex-col space-y-1">
                                <Image
                                  src={"/comment.svg"}
                                  className=""
                                  width={40}
                                  height={40}
                                />
                                <h1 className="text-md text-[#647C87]">
                                  {e?.comments?.length}
                                </h1>
                              </div>
                              <div className="flex justify-center  items-center flex-col space-y-1">
                                <Image
                                  src={"/share.svg"}
                                  className=""
                                  width={40}
                                  height={40}
                                />
                                <h1 className="text-md text-[#647C87]">
                                  {e.shares}
                                </h1>
                              </div>
                            </div>
                            <div className="flex ">
                              <Image src={"/info.svg"} width={40} height={40} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
